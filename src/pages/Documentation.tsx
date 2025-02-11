
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
        { task: "Implementar autenticação com Supabase", completed: false },
      ]
    },
    {
      title: "Fase 2 - Landing Page e Agendamentos",
      tasks: [
        { task: "Criar layout responsivo para Landing Page", completed: false },
        { task: "Implementar CTA com agendamento", completed: false },
        { task: "Integração com Google Agenda", completed: false },
      ]
    },
    {
      title: "Fase 3 - Área do Cliente",
      tasks: [
        { task: "Criar dashboard do cliente", completed: false },
        { task: "Listagem de sessões", completed: false },
        { task: "Controle de pagamentos", completed: false },
      ]
    },
    {
      title: "Fase 4 - Dashboard Administrativo",
      tasks: [
        { task: "Criar painel de controle de sessões", completed: false },
        { task: "Implementar gestão de clientes", completed: false },
        { task: "Criar sistema de edição da landing page", completed: false },
      ]
    },
    {
      title: "Fase 5 - Pagamentos e Testes",
      tasks: [
        { task: "Integração com sistema de pagamentos", completed: false },
        { task: "Implementar automação de faturas", completed: false },
        { task: "Testes completos de usabilidade", completed: false },
      ]
    },
    {
      title: "Fase 6 - Deploy e Manutenção",
      tasks: [
        { task: "Configurar deploy", completed: false },
        { task: "Monitoramento e otimização", completed: false },
        { task: "Melhorias baseadas no feedback inicial", completed: false },
      ]
    },
  ];

  const dbTables = [
    {
      name: "profiles",
      description: "Armazena informações dos usuários",
      status: "Implementada"
    },
    {
      name: "sessoes",
      description: "Gerencia as sessões de terapia",
      status: "Implementada"
    },
    {
      name: "pagamentos",
      description: "Controle de pagamentos das sessões",
      status: "Implementada"
    },
    {
      name: "configuracoes_site",
      description: "Configurações editáveis do site",
      status: "Implementada"
    },
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
            <p className="text-muted-foreground">
              Plataforma para oferta de serviços terapêuticos incluindo Psicanálise, 
              Constelação Familiar e PNL. O sistema oferece agendamento integrado,
              área do cliente e dashboard administrativo.
            </p>
          </CardContent>
        </Card>

        {/* Tecnologias */}
        <Card>
          <CardHeader>
            <CardTitle>Tecnologias Utilizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Frontend: React + Vite + TailwindCSS</li>
              <li>Backend: Supabase (Postgres + Autenticação)</li>
              <li>UI Components: shadcn/ui</li>
              <li>Integração: Google Calendar API</li>
            </ul>
          </CardContent>
        </Card>

        {/* Estrutura do Banco */}
        <Card>
          <CardHeader>
            <CardTitle>Estrutura do Banco de Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {dbTables.map((table) => (
                <div key={table.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{table.name}</h4>
                    <p className="text-sm text-muted-foreground">{table.description}</p>
                  </div>
                  <span className="text-sm text-green-600 font-medium">{table.status}</span>
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
