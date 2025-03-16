
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserSearch, Calendar, CheckCircle2 } from "lucide-react";

interface Client {
  id: string;
  created_at: string;
  name?: string;
  full_name?: string;
  email?: string;
  tipo_usuario?: string;
  sessionCount?: number;
  specialist?: string;
}

interface Specialist {
  id: string;
  name?: string;
  full_name?: string;
  email?: string;
}

export function AdminClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>("all");
  const { toast } = useToast();

  // Mock data for specialists and their clients
  const mockSpecialistClients: Record<string, string[]> = {
    "1": ["2", "3", "5"],
    "2": ["4", "6", "9"],
    "3": ["7", "8", "10"],
  };

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Load specialists
        const specialistsData = await SessionController.getAllSpecialists();
        setSpecialists(specialistsData);
        
        // Load clients
        const clientsData = await SessionController.getAllClients();
        
        // Add session count to each client
        const clientsWithSessionCount = await Promise.all(
          clientsData.map(async (client) => {
            const sessionCount = await SessionController.getClientSessionCount(client.id);
            
            // Determine the specialist for this client (using mock data for now)
            let specialistName = "Não atribuído";
            const specialistId = Object.keys(mockSpecialistClients).find(
              (specId) => mockSpecialistClients[specId].includes(client.id.toString().slice(0, 1))
            );
            
            if (specialistId) {
              const specialist = specialistsData.find((s) => s.id.toString().slice(0, 1) === specialistId);
              if (specialist) {
                specialistName = specialist.full_name || specialist.name || specialist.email || "Especialista";
              }
            }
            
            return {
              ...client,
              sessionCount,
              specialist: specialistName
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
  }, [toast]);

  // Filter clients based on selected specialist
  const filteredClients = selectedSpecialist === "all" 
    ? clients 
    : clients.filter(client => {
        const specialistId = Object.keys(mockSpecialistClients).find(
          (specId) => mockSpecialistClients[specId].includes(client.id.toString().slice(0, 1))
        );
        return specialistId === selectedSpecialist;
      });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Clientes</CardTitle>
        <CardDescription>
          Gerencie os clientes cadastrados na plataforma
        </CardDescription>
        <div className="flex justify-between mt-4">
          <Select
            value={selectedSpecialist}
            onValueChange={setSelectedSpecialist}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Filtrar por especialista" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os especialistas</SelectItem>
              {specialists.map((specialist, index) => (
                <SelectItem 
                  key={specialist.id} 
                  value={(index + 1).toString()}
                >
                  {specialist.full_name || specialist.name || specialist.email || `Especialista ${index + 1}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                <TableHead>Especialista</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Nenhum cliente encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => (
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
                    <TableCell>{client.specialist}</TableCell>
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
  );
}
