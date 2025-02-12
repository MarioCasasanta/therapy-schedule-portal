
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { session_id, payment_method } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Buscar detalhes da sessão
    const { data: session, error: sessionError } = await supabase
      .from('sessoes')
      .select('*, profiles!inner(*)')
      .eq('id', session_id)
      .single()

    if (sessionError || !session) {
      throw new Error('Sessão não encontrada')
    }

    // Criar um Customer no Stripe se ainda não existir
    let customerId = session.profiles.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.profiles.email,
        name: session.profiles.full_name,
      })
      customerId = customer.id

      // Atualizar o perfil com o ID do customer
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', session.profiles.id)
    }

    // Criar o pagamento
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(session.valor * 100), // Stripe trabalha com centavos
      currency: 'brl',
      customer: customerId,
      payment_method: payment_method,
      confirm: true,
      description: `Sessão ${session.tipo_sessao} - ${new Date(session.data_hora).toLocaleString('pt-BR')}`,
      metadata: {
        session_id: session_id,
      },
    })

    // Atualizar o status do pagamento na sessão
    const { error: updateError } = await supabase
      .from('sessoes')
      .update({
        status_pagamento: 'pago',
        data_pagamento: new Date().toISOString(),
      })
      .eq('id', session_id)

    if (updateError) {
      throw updateError
    }

    // Criar registro do pagamento
    const { error: pagamentoError } = await supabase
      .from('pagamentos')
      .insert({
        sessao_id: session_id,
        cliente_id: session.cliente_id,
        valor: session.valor,
        status: 'pago',
        metodo_pagamento: 'stripe',
        data_pagamento: new Date().toISOString(),
      })

    if (pagamentoError) {
      throw pagamentoError
    }

    // Criar notificação
    await supabase
      .from('notifications')
      .insert({
        user_id: session.cliente_id,
        title: 'Pagamento Confirmado',
        message: `Seu pagamento de R$ ${session.valor.toFixed(2)} foi confirmado com sucesso!`,
        type: 'payment_confirmation',
        related_session_id: session_id,
      })

    return new Response(
      JSON.stringify({ 
        success: true, 
        payment_intent: paymentIntent 
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }),
      { 
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      }
    )
  }
})
