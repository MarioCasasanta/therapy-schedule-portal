
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationTemplate {
  title: string;
  message: string;
  metadata?: Record<string, any>;
}

const notificationTemplates: Record<string, (data: any) => NotificationTemplate> = {
  welcome_message: (data) => ({
    title: "Bem-vindo(a)!",
    message: `Olá ${data.name}! Seja bem-vindo(a) ao Além do Apego.`,
    metadata: { firstLogin: true }
  }),
  session_reminder: (data) => ({
    title: "Lembrete de Sessão",
    message: `Sua sessão está agendada para ${new Date(data.sessionDate).toLocaleString()}`,
    metadata: { sessionId: data.sessionId }
  }),
  payment_due: (data) => ({
    title: "Pagamento Pendente",
    message: `Você tem um pagamento pendente de R$ ${data.amount}`,
    metadata: { amount: data.amount, dueDate: data.dueDate }
  }),
  feedback_request: (data) => ({
    title: "Feedback da Sessão",
    message: "Como foi sua experiência? Seu feedback é muito importante.",
    metadata: { sessionId: data.sessionId }
  }),
  appointment_confirmation: (data) => ({
    title: "Agendamento Confirmado",
    message: `Sua sessão foi confirmada para ${new Date(data.sessionDate).toLocaleString()}`,
    metadata: { sessionId: data.sessionId }
  }),
  appointment_cancellation: (data) => ({
    title: "Sessão Cancelada",
    message: `A sessão do dia ${new Date(data.sessionDate).toLocaleString()} foi cancelada.`,
    metadata: { sessionId: data.sessionId, reason: data.reason }
  }),
  birthday_greeting: (data) => ({
    title: "Feliz Aniversário!",
    message: "Desejamos um feliz aniversário e um dia especial!",
    metadata: { yearly: true }
  })
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

    // Processar notificações automáticas
    const tasks = [
      // Lembretes de sessão
      async () => {
        const { data: sessions } = await supabase
          .from('sessoes')
          .select('*, profiles:cliente_id (*)')
          .gte('data_hora', new Date().toISOString())
          .lte('data_hora', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString())
          .is('reminded', null);

        if (sessions?.length) {
          const notifications = sessions.map(session => ({
            user_id: session.cliente_id,
            type: 'session_reminder',
            ...notificationTemplates.session_reminder({
              sessionDate: session.data_hora,
              sessionId: session.id
            }),
            scheduled_for: new Date(Date.now() + 30 * 60 * 1000)
          }));

          await supabase.from('notifications').insert(notifications);
          await supabase
            .from('sessoes')
            .update({ reminded: true })
            .in('id', sessions.map(s => s.id));
        }
      },

      // Lembretes de pagamento
      async () => {
        const { data: payments } = await supabase
          .from('pagamentos')
          .select('*')
          .eq('status', 'pendente')
          .is('reminder_sent', null);

        if (payments?.length) {
          const notifications = payments.map(payment => ({
            user_id: payment.cliente_id,
            type: 'payment_due',
            ...notificationTemplates.payment_due({
              amount: payment.valor,
              dueDate: payment.data_pagamento
            })
          }));

          await supabase.from('notifications').insert(notifications);
          await supabase
            .from('pagamentos')
            .update({ reminder_sent: true })
            .in('id', payments.map(p => p.id));
        }
      },

      // Solicitar feedback após sessões
      async () => {
        const { data: completedSessions } = await supabase
          .from('sessoes')
          .select('*')
          .eq('status', 'finalizado')
          .is('feedback_requested', null);

        if (completedSessions?.length) {
          const notifications = completedSessions.map(session => ({
            user_id: session.cliente_id,
            type: 'feedback_request',
            ...notificationTemplates.feedback_request({ sessionId: session.id })
          }));

          await supabase.from('notifications').insert(notifications);
          await supabase
            .from('sessoes')
            .update({ feedback_requested: true })
            .in('id', completedSessions.map(s => s.id));
        }
      },

      // Mensagens de aniversário
      async () => {
        const today = new Date();
        const { data: birthdayUsers } = await supabase
          .from('profiles')
          .select('*')
          .eq('birthday_greeted', false);

        if (birthdayUsers?.length) {
          const notifications = birthdayUsers.map(user => ({
            user_id: user.id,
            type: 'birthday_greeting',
            ...notificationTemplates.birthday_greeting({ userId: user.id })
          }));

          await supabase.from('notifications').insert(notifications);
          await supabase
            .from('profiles')
            .update({ birthday_greeted: true })
            .in('id', birthdayUsers.map(u => u.id));
        }
      }
    ];

    // Executar todas as tarefas em paralelo
    await Promise.all(tasks.map(task => task().catch(console.error)));

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
