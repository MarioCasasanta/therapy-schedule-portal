
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import PDFDocument from 'https://esm.sh/pdfkit@0.13.0'
import { Buffer } from "https://deno.land/std@0.168.0/node/buffer.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { payment_id } = await req.json()

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Buscar informações do pagamento
    const { data: payment, error: paymentError } = await supabase
      .from('pagamentos')
      .select(`
        *,
        profiles:cliente_id (*),
        sessoes:sessao_id (*)
      `)
      .eq('id', payment_id)
      .single()

    if (paymentError || !payment) {
      throw new Error('Pagamento não encontrado')
    }

    // Criar PDF
    const doc = new PDFDocument()
    const chunks: Uint8Array[] = []

    // Capturar chunks do PDF
    doc.on('data', (chunk) => chunks.push(chunk))

    // Adicionar conteúdo ao PDF
    doc.fontSize(20).text('Recibo de Pagamento', { align: 'center' })
    doc.moveDown()
    doc.fontSize(12)

    // Informações do recibo
    doc.text(`Recibo Nº: ${payment.id}`)
    doc.text(`Data: ${new Date(payment.data_pagamento).toLocaleDateString('pt-BR')}`)
    doc.moveDown()
    doc.text(`Cliente: ${payment.profiles.full_name}`)
    doc.text(`Valor: R$ ${payment.valor.toFixed(2)}`)
    doc.text(`Método de Pagamento: ${payment.metodo_pagamento}`)
    doc.moveDown()
    doc.text(`Referente à sessão do dia ${new Date(payment.sessoes.data_hora).toLocaleDateString('pt-BR')}`)
    doc.moveDown(2)
    doc.text('Este recibo é uma representação digital do pagamento efetuado.')

    // Finalizar PDF
    doc.end()

    // Concatenar chunks em um único buffer
    const pdfBuffer = Buffer.concat(chunks)

    return new Response(pdfBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="recibo-${payment.id}.pdf"`,
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    )
  }
})
