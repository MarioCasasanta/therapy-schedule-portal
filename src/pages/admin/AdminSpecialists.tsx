
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SessionController } from "@/controllers/SessionController";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, UserCog } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Specialist {
  id: string;
  created_at: string;
  name?: string;
  full_name?: string;
  email?: string;
}

export default function AdminSpecialists() {
  const location = useLocation();
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    async function loadSpecialists() {
      try {
        setLoading(true);
        const data = await SessionController.getAllSpecialists();
        setSpecialists(data);
      } catch (error: any) {
        console.error("Error loading specialists:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar especialistas",
          description: error.message || "Ocorreu um erro ao carregar os dados dos especialistas",
        });
      } finally {
        setLoading(false);
      }
    }
    
    loadSpecialists();
  }, [toast]);
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar currentPath={location.pathname} />
        <SidebarInset className="overflow-auto">
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold mb-6">Gestão de Especialistas</h1>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Especialistas</CardTitle>
                    <CardDescription>
                      Gerencie os especialistas cadastrados na plataforma
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    <UserCog className="mr-2 h-4 w-4" />
                    Total: {specialists.length}
                  </Badge>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline">
                    <UserCog className="mr-2 h-4 w-4" />
                    Adicionar Especialista
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Carregando especialistas...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Data de Inscrição</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {specialists.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8">
                            Nenhum especialista encontrado
                          </TableCell>
                        </TableRow>
                      ) : (
                        specialists.map((specialist) => (
                          <TableRow key={specialist.id}>
                            <TableCell className="font-medium">
                              {specialist.full_name || specialist.name || "Especialista sem nome"}
                            </TableCell>
                            <TableCell>{specialist.email || "Email não cadastrado"}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                {format(new Date(specialist.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Ver detalhes
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
