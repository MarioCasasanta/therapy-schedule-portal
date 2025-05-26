
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users, CreditCard, TrendingUp, Edit, Trash2 } from "lucide-react";

export default function Plans() {
  const location = useLocation();
  const [clientPlans] = useState([
    {
      id: 1,
      name: "Plano Básico",
      price: 89.90,
      interval: "mensal",
      subscribers: 156,
      revenue: 14024.40,
      features: ["1 sessão/mês", "Chat básico", "Recursos educativos"],
      status: "Ativo"
    },
    {
      id: 2,
      name: "Plano Premium",
      price: 149.90,
      interval: "mensal",
      subscribers: 89,
      revenue: 13341.10,
      features: ["4 sessões/mês", "Chat prioritário", "Recursos avançados", "Grupo de apoio"],
      status: "Ativo"
    },
    {
      id: 3,
      name: "Plano Família",
      price: 199.90,
      interval: "mensal",
      subscribers: 45,
      revenue: 8995.50,
      features: ["Ilimitado", "Terapia familiar", "Suporte 24/7", "Recursos exclusivos"],
      status: "Ativo"
    }
  ]);

  const [therapistPlans] = useState([
    {
      id: 1,
      name: "Profissional Solo",
      price: 97.90,
      interval: "mensal",
      subscribers: 23,
      revenue: 2251.70,
      features: ["Até 30 clientes", "Agenda básica", "Relatórios simples"],
      status: "Ativo"
    },
    {
      id: 2,
      name: "Clínica Pequena",
      price: 197.90,
      interval: "mensal",
      subscribers: 12,
      revenue: 2374.80,
      features: ["Até 100 clientes", "Agenda avançada", "Relatórios completos", "Multi-usuário"],
      status: "Ativo"
    }
  ]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath={location.pathname} />
        <SidebarInset className="overflow-auto">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Gestão de Planos</h1>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Plano
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total de Planos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{clientPlans.length + therapistPlans.length}</div>
                  <p className="text-sm text-muted-foreground">Ativos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Assinantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {clientPlans.reduce((acc, plan) => acc + plan.subscribers, 0) + 
                     therapistPlans.reduce((acc, plan) => acc + plan.subscribers, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">+12% este mês</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Receita Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    R$ {(clientPlans.reduce((acc, plan) => acc + plan.revenue, 0) + 
                          therapistPlans.reduce((acc, plan) => acc + plan.revenue, 0)).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                  </div>
                  <p className="text-sm text-muted-foreground">+8% este mês</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Taxa de Conversão</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">24%</div>
                  <p className="text-sm text-muted-foreground">+3% este mês</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="client-plans">
              <TabsList>
                <TabsTrigger value="client-plans">Planos para Clientes</TabsTrigger>
                <TabsTrigger value="therapist-plans">Planos para Terapeutas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="client-plans">
                <Card>
                  <CardHeader>
                    <CardTitle>Planos para Clientes</CardTitle>
                    <CardDescription>
                      Gerencie os planos de assinatura oferecidos aos clientes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome do Plano</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Assinantes</TableHead>
                          <TableHead>Receita</TableHead>
                          <TableHead>Recursos</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clientPlans.map((plan) => (
                          <TableRow key={plan.id}>
                            <TableCell className="font-medium">{plan.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <CreditCard className="mr-2 h-4 w-4" />
                                R$ {plan.price.toFixed(2)}/{plan.interval}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                {plan.subscribers}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <TrendingUp className="mr-2 h-4 w-4" />
                                R$ {plan.revenue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {plan.features.slice(0, 2).map((feature, index) => (
                                  <div key={index} className="text-sm text-muted-foreground">
                                    • {feature}
                                  </div>
                                ))}
                                {plan.features.length > 2 && (
                                  <div className="text-sm text-muted-foreground">
                                    +{plan.features.length - 2} mais
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">{plan.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="therapist-plans">
                <Card>
                  <CardHeader>
                    <CardTitle>Planos para Terapeutas</CardTitle>
                    <CardDescription>
                      Gerencie os planos de assinatura oferecidos aos profissionais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome do Plano</TableHead>
                          <TableHead>Preço</TableHead>
                          <TableHead>Assinantes</TableHead>
                          <TableHead>Receita</TableHead>
                          <TableHead>Recursos</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {therapistPlans.map((plan) => (
                          <TableRow key={plan.id}>
                            <TableCell className="font-medium">{plan.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <CreditCard className="mr-2 h-4 w-4" />
                                R$ {plan.price.toFixed(2)}/{plan.interval}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                {plan.subscribers}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <TrendingUp className="mr-2 h-4 w-4" />
                                R$ {plan.revenue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {plan.features.slice(0, 2).map((feature, index) => (
                                  <div key={index} className="text-sm text-muted-foreground">
                                    • {feature}
                                  </div>
                                ))}
                                {plan.features.length > 2 && (
                                  <div className="text-sm text-muted-foreground">
                                    +{plan.features.length - 2} mais
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">{plan.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
