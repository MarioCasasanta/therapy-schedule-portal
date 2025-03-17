
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserSearch, Calendar, CheckCircle2, Search, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

interface Client {
  id: string;
  created_at: string;
  full_name?: string;
  email?: string;
  sessionCount?: number;
  specialist?: string;
}

interface Specialist {
  id: string;
  full_name?: string;
  email?: string;
}

export function AdminClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalClients, setTotalClients] = useState<number>(0);
  const { toast } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load specialists
      const { data: specialistsData, error: specialistsError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .eq('role', 'especialista');
        
      if (specialistsError) throw specialistsError;
      setSpecialists(specialistsData || []);
      
      // Buscar todos os clientes com role = 'cliente'
      const { data: clientsData, error: clientsError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'cliente');
        
      if (clientsError) throw clientsError;
      
      console.log("Fetched clients:", clientsData);
      
      // Add session count to each client (simplified for now)
      const clientsWithSessionCount = await Promise.all(
        (clientsData || []).map(async (client) => {
          const { count } = await supabase
            .from('sessoes')
            .select('*', { count: 'exact' })
            .eq('cliente_id', client.id);
            
          return {
            ...client,
            sessionCount: count || 0
          };
        })
      );
      
      setClients(clientsWithSessionCount);
      setTotalClients(clientsWithSessionCount.length);
    } catch (error: any) {
      console.error("Error loading clients:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar clientes",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [toast]);

  // Filter clients based on search term and selected specialist
  const filteredClients = clients.filter(client => {
    const matchesSearch = searchTerm === "" || 
      (client.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       client.email?.toLowerCase().includes(searchTerm.toLowerCase()));
       
    const matchesSpecialist = selectedSpecialist === "all" || client.specialist === selectedSpecialist;
    
    return matchesSearch && matchesSpecialist;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Clientes</CardTitle>
        <CardDescription>
          Gerencie os {totalClients} clientes cadastrados na plataforma
        </CardDescription>
        <div className="flex flex-col gap-4 mt-4 md:flex-row md:justify-between">
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
                    {specialist.full_name || specialist.email || `Especialista`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadData}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar Lista
            </Button>
            <Button variant="outline">
              <UserSearch className="mr-2 h-4 w-4" />
              Adicionar Cliente
            </Button>
          </div>
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
                      {client.full_name || "Cliente sem nome"}
                    </TableCell>
                    <TableCell>{client.email || "Sem email"}</TableCell>
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
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/clients/${client.id}`}>
                          Ver detalhes
                        </Link>
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
          Mostrando {filteredClients.length} de {totalClients} clientes
        </div>
      </CardFooter>
    </Card>
  );
}
