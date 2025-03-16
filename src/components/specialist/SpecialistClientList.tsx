
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { SessionController } from "@/controllers/SessionController";
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
import { UserSearch, Calendar, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Client {
  id: string;
  created_at: string;
  name?: string;
  full_name?: string;
  email?: string;
  tipo_usuario?: string;
  sessionCount?: number;
}

export function SpecialistClientList({ especialistaId }: { especialistaId?: string }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Load clients for this specialist
        const clientsData = await SessionController.listClients(especialistaId);
        
        // Add session count to each client
        const clientsWithSessionCount = await Promise.all(
          clientsData.map(async (client) => {
            const sessionCount = await SessionController.getClientSessionCount(client.id);
            return {
              ...client,
              sessionCount
            };
          })
        );
        
        setClients(clientsWithSessionCount);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar clientes",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [especialistaId, toast]);

  const handleViewClient = (clientId: string) => {
    navigate(`/dashboard/clients/${clientId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Meus Clientes</CardTitle>
        <CardDescription>
          Gerencie os clientes atribuídos a você
        </CardDescription>
        <div className="flex justify-end mt-4">
          <Button variant="outline">
            <UserSearch className="mr-2 h-4 w-4" />
            Adicionar Cliente
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Carregando clientes...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data de Inscrição</TableHead>
                <TableHead>Sessões Realizadas</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Nenhum cliente encontrado
                  </TableCell>
                </TableRow>
              ) : (
                clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">
                      {client.full_name || client.name || client.email || "Cliente sem nome"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {format(new Date(client.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        {client.sessionCount || 0} sessões
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewClient(client.id)}
                      >
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
  );
}
