
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
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserSearch, Calendar, CheckCircle2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
            try {
              const sessionCount = await SessionController.getClientSessionCount(client.id);
              
              // For now, assign random specialists until we have a proper relationship
              const randomSpecialistIndex = Math.floor(Math.random() * (specialistsData.length || 1));
              const specialistName = specialistsData[randomSpecialistIndex]?.full_name || 
                                     specialistsData[randomSpecialistIndex]?.name || 
                                     "Não atribuído";
              
              return {
                ...client,
                sessionCount,
                specialist: specialistName
              };
            } catch (err) {
              console.error(`Error getting session count for client ${client.id}:`, err);
              return {
                ...client,
                sessionCount: 0,
                specialist: "Não atribuído"
              };
            }
          })
        );
        
        setClients(clientsWithSessionCount);
      } catch (error: any) {
        console.error("Error loading clients:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar clientes",
          description: error.message || "Ocorreu um erro ao carregar os dados dos clientes",
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
    : clients.filter(client => client.specialist === specialists.find(s => s.id === selectedSpecialist)?.full_name);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Clientes</CardTitle>
            <CardDescription>
              Gerencie os clientes cadastrados na plataforma
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            <Users className="mr-2 h-4 w-4" />
            Total: {clients.length}
          </Badge>
        </div>
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
              {specialists.map((specialist) => (
                <SelectItem 
                  key={specialist.id} 
                  value={specialist.id}
                >
                  {specialist.full_name || specialist.name || specialist.email || "Especialista"}
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
                <TableHead>Email</TableHead>
                <TableHead>Data de Inscrição</TableHead>
                <TableHead>Sessões Realizadas</TableHead>
                <TableHead>Especialista</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Nenhum cliente encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">
                      {client.full_name || client.name || "Cliente sem nome"}
                    </TableCell>
                    <TableCell>{client.email || "Email não cadastrado"}</TableCell>
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
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Mostrando {filteredClients.length} de {clients.length} clientes
        </div>
      </CardFooter>
    </Card>
  );
}
