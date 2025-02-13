
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

const Documentation = () => {
  const phases = [
    {
      title: "Fase 1 - Configuração Inicial",
      tasks: [
        { task: "Criar repositório no GitHub", completed: true },
        { task: "Configurar Frontend com React + Vite", completed: true },
        { task: "Criar banco de dados no Supabase", completed: true },
        { task: "Implementar autenticação com Supabase", completed: true },
        { task: "Configurar integração com Vercel", completed: true },
      ]
    },
    {
      title: "Fase 2 - Landing Page e Agendamentos",
      tasks: [
        { task: "Criar layout responsivo para Landing Page", completed: true },
        { task: "Implementar CTA com agendamento", completed: true },
        { task: "Integração com Google Agenda", completed: false },
        { task: "Configurar autenticação via Google", completed: false },
      ]
    },
    {
      title: "Fase 3 - Área do Cliente",
      tasks: [
        { task: "Criar dashboard do cliente", completed: true },
        { task: "Listagem de sessões", completed: true },
        { task: "Controle de pagamentos", completed: true },
        { task: "Sistema de notificações", completed: true },
        { task: "Diário emocional", completed: true },
        { task: "Área de documentos", completed: true },
      ]
    },
    {
      title: "Fase 4 - Dashboard Administrativo",
      tasks: [
        { task: "Criar painel de controle de sessões", completed: true },
        { task: "Implementar gestão de clientes", completed: true },
        { task: "Implementar sistema de convites por email", completed: true },
        { task: "Configurar permissões de admin", completed: true },
        { task: "Analytics e relatórios", completed: true },
      ]
    },
    {
      title: "Fase 5 - Pagamentos e Testes",
      tasks: [
        { task: "Integração com sistema de pagamentos", completed: true },
        { task: "Implementar automação de faturas", completed: true },
        { task: "Sistema de lembretes automáticos", completed: true },
        { task: "Testes completos de usabilidade", completed: true },
      ]
    },
    {
      title: "Fase 6 - Deploy e Otimizações",
      tasks: [
        { task: "Configurar deploy no Vercel", completed: true },
        { task: "Configurar sistema de convites", completed: true },
        { task: "Monitoramento e otimização", completed: true },
        { task: "Domain setup e SSL", completed: false },
        { task: "Integração com Google Calendar", completed: false },
        { task: "Login via Google", completed: false },
      ]
    },
  ];

  const apiEndpoints = [
    {
      group: "Autenticação",
      endpoints: [
        { path: "POST /auth/signup", description: "Cadastro de cliente" },
        { path: "POST /auth/signin", description: "Login" },
        { path: "GET /auth/user", description: "Dados do usuário autenticado" },
        { path: "POST /auth/google", description: "Login via Google (em breve)" }
      ]
    },
    {
      group: "Sessões",
      endpoints: [
        { path: "POST /rest/v1/sessoes", description: "Criar sessão" },
        { path: "GET /rest/v1/sessoes", description: "Listar sessões" },
        { path: "PATCH /rest/v1/sessoes", description: "Atualizar sessão" },
        { path: "DELETE /rest/v1/sessoes", description: "Cancelar sessão" },
        { path: "POST /functions/v1/send-invite", description: "Enviar convite por email" },
        { path: "POST /functions/v1/sync-calendar", description: "Sincronizar com Google Calendar (em breve)" }
      ]
    },
    {
      group: "Pagamentos",
      endpoints: [
        { path: "POST /rest/v1/pagamentos", description: "Criar pagamento" },
        { path: "GET /rest/v1/pagamentos", description: "Listar pagamentos" },
        { path: "POST /functions/v1/process-payment", description: "Processar pagamento via Stripe" },
        { path: "GET /functions/v1/generate-invoice", description: "Gerar fatura" }
      ]
    },
    {
      group: "Notificações",
      endpoints: [
        { path: "GET /rest/v1/notifications", description: "Listar notificações" },
        { path: "PATCH /rest/v1/notifications", description: "Marcar como lida" },
        { path: "POST /functions/v1/send-reminder", description: "Enviar lembrete" }
      ]
    },
    {
      group: "Documentos",
      endpoints: [
        { path: "POST /storage/v1/upload", description: "Upload de documento" },
        { path: "GET /storage/v1/documents", description: "Listar documentos" },
        { path: "DELETE /storage/v1/documents", description: "Remover documento" }
      ]
    }
  ];

  const techStack = [
    { 
      name: "Frontend", 
      items: [
        "React 18",
        "Vite",
        "TailwindCSS",
        "Shadcn/UI",
        "Tanstack Query",
        "React Router DOM",
        "Lucide Icons"
      ] 
    },
    { 
      name: "Backend", 
      items: [
        "Supabase (PostgreSQL)",
        "Edge Functions",
        "Row Level Security (RLS)",
        "Realtime Subscriptions",
        "Storage Buckets",
        "Resend (Email)"
      ] 
    },
    { 
      name: "Integrações", 
      items: [
        "Stripe Payments",
        "Resend Email API",
        "Google Calendar API (em breve)",
        "Google OAuth (em breve)"
      ] 
    },
    { 
      name: "Deploy & Infraestrutura", 
      items: [
        "Vercel (Frontend)",
        "Supabase Cloud",
        "Custom Domain + SSL",
        "Automated CI/CD"
      ] 
    }
  ];

  const dbTables = [
    {
      name: "profiles",
      description: "Armazena informações dos usuários",
      fields: [
        "id: uuid (PK)",
        "email: text",
        "full_name: text",
        "avatar_url: text",
        "phone: text",
        "role: text (admin/cliente)",
        "preferences: jsonb"
      ]
    },
    {
      name: "sessoes",
      description: "Gerencia as sessões de terapia",
      fields: [
        "id: uuid (PK)",
        "cliente_id: uuid (FK)",
        "data_hora: timestamp",
        "tipo_sessao: text",
        "status: text",
        "notas: text",
        "guest_email: text",
        "invitation_status: text",
        "invitation_sent_at: timestamp",
        "valor: numeric",
        "status_pagamento: text",
        "google_event_id: text"
      ]
    },
    {
      name: "pagamentos",
      description: "Controle de pagamentos das sessões",
      fields: [
        "id: uuid (PK)",
        "cliente_id: uuid (FK)",
        "sessao_id: uuid (FK)",
        "valor: numeric",
        "status: text",
        "data_pagamento: timestamp",
        "metodo_pagamento: text"
      ]
    },
    {
      name: "notifications",
      description: "Sistema de notificações",
      fields: [
        "id: uuid (PK)",
        "user_id: uuid (FK)",
        "title: text",
        "message: text",
        "type: text",
        "read: boolean",
        "related_session_id: uuid (FK)",
        "scheduled_for: timestamp"
      ]
    },
    {
      name: "emotional_diary",
      description: "Diário emocional dos clientes",
      fields: [
        "id: uuid (PK)",
        "user_id: uuid (FK)",
        "title: text",
        "content: text",
        "mood_score: integer",
        "entry_date: date",
        "created_at: timestamp"
      ]
    },
    {
      name: "financial_reports",
      description: "Relatórios financeiros e analytics",
      fields: [
        "id: uuid (PK)",
        "report_date: date",
        "sessions_count: integer",
        "paid_sessions_count: integer",
        "pending_sessions_count: integer",
        "cancellations_count: integer",
        "total_revenue: numeric"
      ]
    }
  ];

  const features = [
    {
      title: "Autenticação e Autorização",
      items: [
        "Login com email/senha",
        "Registro de novos usuários",
        "Recuperação de senha",
        "Login com Google (em breve)",
        "Perfis de admin e cliente",
        "Row Level Security"
      ]
    },
    {
      title: "Gestão de Sessões",
      items: [
        "Agendamento de sessões",
        "Convites por email",
        "Sincronização com Google Calendar (em breve)",
        "Lembretes automáticos",
        "Notas e feedbacks",
        "Histórico completo"
      ]
    },
    {
      title: "Área do Cliente",
      items: [
        "Dashboard personalizado",
        "Histórico de sessões",
        "Diário emocional",
        "Upload de documentos",
        "Controle de pagamentos",
        "Notificações em tempo real"
      ]
    },
    {
      title: "Administrativo",
      items: [
        "Gestão de clientes",
        "Controle de sessões",
        "Relatórios financeiros",
        "Analytics em tempo real",
        "Automação de tarefas",
        "Controle de acesso"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Documentação Técnica - Site de Terapia</h1>

      <div className="grid gap-8">
        {/* Visão Geral */}
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral do Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Plataforma completa para oferta de serviços terapêuticos incluindo Psicanálise, 
              Constelação Familiar e PNL. O sistema oferece agendamento integrado,
              área do cliente, dashboard administrativo, sistema de pagamentos e 
              diversas integrações para automação de processos.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              {features.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {feature.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stack Tecnológico */}
        <Card>
          <CardHeader>
            <CardTitle>Stack Tecnológico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {techStack.map((stack, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold">{stack.name}</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {stack.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estrutura do Banco */}
        <Card>
          <CardHeader>
            <CardTitle>Estrutura do Banco de Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {dbTables.map((table) => (
                <div key={table.name} className="space-y-2">
                  <h3 className="font-semibold text-lg">{table.name}</h3>
                  <p className="text-muted-foreground">{table.description}</p>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <code className="text-sm">
                      {table.fields.map((field, i) => (
                        <div key={i} className="font-mono">{field}</div>
                      ))}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <Card>
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {apiEndpoints.map((group) => (
                <div key={group.group}>
                  <h3 className="font-semibold mb-3">{group.group}</h3>
                  <div className="space-y-2">
                    {group.endpoints.map((endpoint, i) => (
                      <div key={i} className="flex items-start gap-4 bg-slate-50 p-3 rounded-md">
                        <code className="text-sm font-mono text-sage-700">{endpoint.path}</code>
                        <span className="text-sm text-muted-foreground">{endpoint.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roadmap */}
        <Card>
          <CardHeader>
            <CardTitle>Roadmap de Desenvolvimento</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-8">
                {phases.map((phase, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-4">{phase.title}</h3>
                    <div className="space-y-4">
                      {phase.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-center gap-3">
                          {task.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-300" />
                          )}
                          <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                            {task.task}
                          </span>
                        </div>
                      ))}
                    </div>
                    {index < phases.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documentation;
