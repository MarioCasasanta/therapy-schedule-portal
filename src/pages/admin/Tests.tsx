
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, TestTube, Users, BarChart3, Eye } from "lucide-react";

export default function Tests() {
  const location = useLocation();
  const [activeTests] = useState([
    {
      id: 1,
      name: "Teste de Ansiedade",
      type: "Psicológico",
      participants: 1250,
      completionRate: 89,
      averageScore: 72,
      status: "Ativo"
    },
    {
      id: 2,
      name: "Avaliação de Relacionamento",
      type: "Relacionamento",
      participants: 890,
      completionRate: 94,
      averageScore: 68,
      status: "Ativo"
    },
    {
      id: 3,
      name: "Teste de Personalidade",
      type: "Personalidade",
      participants: 2100,
      completionRate: 76,
      averageScore: 85,
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
              <h1 className="text-3xl font-bold">Gestão de Testes</h1>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Teste
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total de Testes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                  <p className="text-sm text-muted-foreground">+2 este mês</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Participantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4,240</div>
                  <p className="text-sm text-muted-foreground">+15% este mês</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Taxa de Conclusão</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">86%</div>
                  <p className="text-sm text-muted-foreground">+3% este mês</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Avaliação Média</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.7/5</div>
                  <p className="text-sm text-muted-foreground">Muito positiva</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="active">Testes Ativos</TabsTrigger>
                <TabsTrigger value="draft">Rascunhos</TabsTrigger>
                <TabsTrigger value="archived">Arquivados</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <Card>
                  <CardHeader>
                    <CardTitle>Testes Ativos</CardTitle>
                    <CardDescription>
                      Testes disponíveis para os usuários
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome do Teste</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Participantes</TableHead>
                          <TableHead>Taxa de Conclusão</TableHead>
                          <TableHead>Pontuação Média</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeTests.map((test) => (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.name}</TableCell>
                            <TableCell>{test.type}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                {test.participants.toLocaleString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <BarChart3 className="mr-2 h-4 w-4" />
                                {test.completionRate}%
                              </div>
                            </TableCell>
                            <TableCell>{test.averageScore}</TableCell>
                            <TableCell>
                              <Badge variant="default">{test.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="draft">
                <Card>
                  <CardHeader>
                    <CardTitle>Rascunhos</CardTitle>
                    <CardDescription>
                      Testes em desenvolvimento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <TestTube className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600">Nenhum rascunho encontrado</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="archived">
                <Card>
                  <CardHeader>
                    <CardTitle>Arquivados</CardTitle>
                    <CardDescription>
                      Testes desativados ou antigos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <TestTube className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600">Nenhum teste arquivado</p>
                    </div>
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
