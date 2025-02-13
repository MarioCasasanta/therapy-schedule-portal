
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Criar backup de cada tabela
    const tables = [
      'profiles',
      'sessoes',
      'pagamentos',
      'documents',
      'invoices',
      'notifications',
      'system_logs'
    ];

    const backupData: Record<string, any> = {};

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*');

      if (error) throw error;
      backupData[table] = data;
    }

    // Gerar nome do arquivo com timestamp
    const timestamp = new Date().toISOString();
    const fileName = `backup_${timestamp}.json`;

    // Salvar backup no storage
    const { error: storageError } = await supabase
      .storage
      .from('backups')
      .upload(fileName, JSON.stringify(backupData));

    if (storageError) throw storageError;

    // Registrar backup no log
    await supabase
      .from('system_logs')
      .insert({
        action_type: 'backup',
        entity_type: 'system',
        new_state: { backup_file: fileName }
      });

    return new Response(
      JSON.stringify({ success: true, fileName }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Backup error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
