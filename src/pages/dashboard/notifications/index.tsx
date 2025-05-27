
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Send, 
  Bell, 
  Users, 
  Mail, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  Trash2
} from "lucide-react";

export default function Notifications() {
  const location = useLocation();
  const [notifications] = useState([
    {
      id: 1,
      title: "Bem-vindo à plataforma",
      message: "Sua conta foi criada com sucesso. Explore todas as funcionalidades disponíveis.",
      type: "sistema",
      status: "enviada",
      recipients: 156,
      createdAt: "2024-01-15",
      sentAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Nova sessão agendada",
      message: "Você tem uma nova sessão agendada para amanhã às 14h.",
      type: "agendamento",
      status: "enviada",
      recipients: 23,
      createdAt: "2024-01-14",
      sentAt: "2024-01-14"
    },
    {
      id: 3,
      title: "Promoção especial",
      message: "Aproveite nossa promoção especial de janeiro com 20% de desconto.",
      type: "promocional",
      status: "rascunho",
      recipients: 0,
      createdAt: "2024-01-13",
      sentAt: null
    }
  ]);

  const [templates] = useState([
    {
      id: 1,
      name: "Bem-vindo",
      type: "sistema",
      subject: "Bem-vindo à nossa plataforma!",
      content: "Olá {{nome}}, seja bem-vindo! Estamos felizes em tê-lo conosco."
    },
    {
      id: 2,
      name: "Lembrete de Sessão",
      type: "agendamento",
      subject: "Lembrete: Sessão em {{tempo}}",
      content: "Sua sessão com {{especialista}} está agendada para {{data}} às {{hora}}."
    },
    {
      id: 3,
      name: "Promoção",
      type: "promocional",
      subject: "Oferta especial para você!",
      content: "Aproveite nossa promoção especial com {{desconto}}% de desconto!"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "enviada":
        return <Badge variant="default" className="bg-green-100 text-green-800">Enviada</Badge>;
      case "rascunho":
        return <Badge variant="secondary">Rascunho</Badge>;
      case "agendada":
        return <Badge variant="outline">Agendada</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "sistema":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">Sistema</Badge>;
      case "agendamento":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700">Agendamento</Badge>;
      case "promocional":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700">Promocional</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath={location.pathname} />
        <SidebarInset className="overflow-auto">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Gestão de Notificações</h1>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Notificação
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Send className="mr-2 h-5 w-5 text-green-500" />
                    Enviadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">24</div>
                  <p className="text-sm text-muted-foreground">Este mês</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-orange-500" />
                    Agendadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3</div>
                  <p className="text-sm text-muted-foreground">Próximas 24h</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5 text-blue-500" />
                    Alcance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,234</div>
                  <p className="text-sm text-muted-foreground">Usuários únicos</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-purple-500" />
                    Taxa de Abertura
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">68%</div>
                  <p className="text-sm text-muted-foreground">Média geral</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="notifications">
              <TabsList>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="create">Criar Nova</TabsTrigger>
              </TabsList>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Notificações</CardTitle>
                    <CardDescription>
                      Todas as notificações enviadas e em rascunho
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Destinatários</TableHead>
                          <TableHead>Criada em</TableHead>
                          <TableHead>Enviada em</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {notifications.map((notification) => (
                          <TableRow key={notification.id}>
                            <TableCell className="font-medium">{notification.title}</TableCell>
                            <TableCell>{getTypeBadge(notification.type)}</TableCell>
                            <TableCell>{getStatusBadge(notification.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                {notification.recipients}
                              </div>
                            </TableCell>
                            <TableCell>{notification.createdAt}</TableCell>
                            <TableCell>{notification.sentAt || "-"}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
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
              
              <TabsContent value="templates">
                <Card>
                  <CardHeader>
                    <CardTitle>Templates de Notificação</CardTitle>
                    <CardDescription>
                      Templates pré-configurados para diferentes tipos de notificação
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {templates.map((template) => (
                        <Card key={template.id} className="border-2 hover:border-primary/50 transition-colors">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{template.name}</CardTitle>
                              {getTypeBadge(template.type)}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm font-medium mb-2">{template.subject}</p>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                              {template.content}
                            </p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                Editar
                              </Button>
                              <Button size="sm" className="flex-1">
                                Usar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="create">
                <Card>
                  <CardHeader>
                    <CardTitle>Criar Nova Notificação</CardTitle>
                    <CardDescription>
                      Configure uma nova notificação para enviar aos usuários
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Título</label>
                          <Input placeholder="Digite o título da notificação" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Tipo</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sistema">Sistema</SelectItem>
                              <SelectItem value="agendamento">Agendamento</SelectItem>
                              <SelectItem value="promocional">Promocional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Mensagem</label>
                        <Textarea 
                          placeholder="Digite a mensagem da notificação" 
                          rows={4}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Destinatários</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione os destinatários" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todos">Todos os usuários</SelectItem>
                              <SelectItem value="clientes">Apenas clientes</SelectItem>
                              <SelectItem value="especialistas">Apenas especialistas</SelectItem>
                              <SelectItem value="custom">Personalizado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Canal</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o canal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="app">Notificação no App</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="both">App + Email</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-4">
                        <Button variant="outline">
                          Salvar como Rascunho
                        </Button>
                        <Button>
                          <Send className="mr-2 h-4 w-4" />
                          Enviar Agora
                        </Button>
                      </div>
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
