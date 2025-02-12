
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as pdf from 'https://deno.land/x/pdfkit@v0.3.0/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { startDate, endDate, reportType } = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Buscar dados das sessões
    const { data: sessions, error: sessionsError } = await supabase
      .from('sessoes')
      .select('*')
      .gte('data_hora', startDate)
      .lte('data_hora', endDate)
      .order('data_hora');

    if (sessionsError) throw sessionsError;

    // Criar PDF
    const doc = new pdf();
    
    // Adicionar conteúdo ao PDF
    doc.text('Relatório de Sessões', { align: 'center' });
    doc.moveDown();

    // Adicionar dados ao PDF baseado no tipo de relatório
    if (sessions) {
      sessions.forEach((session) => {
        doc.text(`Data: ${new Date(session.data_hora).toLocaleDateString()}`);
        doc.text(`Tipo: ${session.tipo_sessao}`);
        doc.text(`Valor: R$ ${session.valor}`);
        doc.text(`Status: ${session.status_pagamento}`);
        doc.moveDown();
      });
    }

    // Finalizar PDF
    const pdfBytes = await doc.save();

    return new Response(
      pdfBytes,
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=relatorio.pdf'
        } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
