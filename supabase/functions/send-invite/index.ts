
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'npm:resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { session_id } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: session, error: sessionError } = await supabase
      .from('sessoes')
      .select('*')
      .eq('id', session_id)
      .single()

    if (sessionError || !session) {
      throw new Error('Sessão não encontrada')
    }

    const { error: emailError } = await resend.emails.send({
      from: 'Sessões <onboarding@resend.dev>',
      to: [session.guest_email],
      subject: 'Convite para Sessão',
      html: `
        <h1>Você foi convidado para uma sessão!</h1>
        <p>Detalhes da sessão:</p>
        <ul>
          <li>Data: ${new Date(session.data_hora).toLocaleString('pt-BR')}</li>
          <li>Tipo: ${session.tipo_sessao}</li>
        </ul>
        <p>Por favor, confirme sua presença respondendo este email.</p>
      `,
    })

    if (emailError) {
      throw emailError
    }

    const { error: updateError } = await supabase
      .from('sessoes')
      .update({
        invitation_sent_at: new Date().toISOString(),
        invitation_status: 'sent'
      })
      .eq('id', session_id)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ message: 'Convite enviado com sucesso' }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }
})
