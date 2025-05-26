
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, Clock, TrendingUp, CalendarDays, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SpecialistDashboard() {
  const location = useLocation();
  const [stats, setStats] = useState({
    todaySessions: 3,
    totalClients: 28,
    monthlyRevenue: 4250.00,
    completionRate: 95,
    upcomingSessions: 7,
    pendingMessages: 5
  });

  const [upcomingSessions] = useState([
    {
      id: 1,
      clientName: "Maria Santos",
      time: "09:00",
      type: "Online",
      status: "Confirmada"
    },
    {
      id: 2,
      clientName: "João Silva",
      time: "14:00",
      type: "Presencial",
      status: "Pendente"
    },
    {
      id: 3,
      clientName: "Ana Costa",
      time: "16:30",
      type: "Online",
      status: "Confirmada"
    }
  ]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath="/dashboard" userRole="especialista" />
        <SidebarInset className="overflow-auto">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Dashboard do Especialista</h1>
                <p className="text-muted-foreground">Bem-vindo de volta! Aqui está o resumo do seu dia.</p>
              </div>
              <Button>
                <CalendarDays className="mr-2 h-4 w-4" />
                Nova Sessão
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                    Hoje
                  </CardTitle>
                  <CardDescription>Sessões agendadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.todaySessions}</div>
                  <p className="text-sm text-muted-foreground">2 confirmadas, 1 pendente</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5 text-green-500" />
                    Clientes
                  </CardTitle>
                  <CardDescription>Total ativo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalClients}</div>
                  <p className="text-sm text-muted-foreground">+3 este mês</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-yellow-500" />
                    Receita
                  </CardTitle>
                  <CardDescription>Este mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">R$ {stats.monthlyRevenue.toLocaleString('pt-BR')}</div>
                  <p className="text-sm text-muted-foreground">+12% vs mês anterior</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
                    Taxa de Conclusão
                  </CardTitle>
                  <CardDescription>Últimos 30 dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.completionRate}%</div>
                  <p className="text-sm text-muted-foreground">Excelente desempenho</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Próximas Sessões</CardTitle>
                  <CardDescription>
                    Suas sessões para hoje
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{session.clientName}</p>
                            <p className="text-sm text-muted-foreground">{session.time} - {session.type}</p>
                          </div>
                        </div>
                        <Badge variant={session.status === "Confirmada" ? "default" : "secondary"}>
                          {session.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Ver Todas as Sessões
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumo Semanal</CardTitle>
                  <CardDescription>
                    Suas estatísticas desta semana
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sessões Realizadas</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Horas Trabalhadas</span>
                      <span className="font-medium">18h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Novos Clientes</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avaliação Média</span>
                      <span className="font-medium">4.9/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mensagens Pendentes</span>
                      <div className="flex items-center">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        <span className="font-medium">{stats.pendingMessages}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
