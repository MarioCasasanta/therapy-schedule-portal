
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserSearch, Calendar, CheckCircle2, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Specialist {
  id: string;
  created_at: string;
  full_name?: string;
  email?: string;
  sessionCount?: number;
  specialty?: string;
  rating?: number;
  experience_years?: number;
}

export default function AdminSpecialistList() {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSpecialists, setFilteredSpecialists] = useState<Specialist[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Load all specialists
        const specialistsData = await SessionController.getAllSpecialists();
        
        // Add session count to each specialist
        const specialistsWithSessionCount = await Promise.all(
          specialistsData.map(async (specialist) => {
            const sessionCount = await SessionController.getSpecialistSessionCount(specialist.id);
            return {
              ...specialist,
              sessionCount
            };
          })
        );
        
        setSpecialists(specialistsWithSessionCount);
        setFilteredSpecialists(specialistsWithSessionCount);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar especialistas",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [toast]);

  // Filter specialists based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredSpecialists(specialists);
    } else {
      const filtered = specialists.filter(specialist => {
        return (
          specialist.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          specialist.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          specialist.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredSpecialists(filtered);
    }
  }, [searchTerm, specialists]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Especialistas</CardTitle>
        <CardDescription>
          Gerencie os {specialists.length} especialistas cadastrados na plataforma
        </CardDescription>
        <div className="flex flex-col gap-4 mt-4 md:flex-row md:justify-between">
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou especialidade"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button variant="outline">
            <UserSearch className="mr-2 h-4 w-4" />
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
                <TableHead>Especialidade</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead>Sessões Realizadas</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSpecialists.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Nenhum especialista encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredSpecialists.map((specialist) => (
                  <TableRow key={specialist.id}>
                    <TableCell className="font-medium">
                      {specialist.full_name || "Especialista sem nome"}
                    </TableCell>
                    <TableCell>{specialist.email || "Sem email"}</TableCell>
                    <TableCell>{specialist.specialty || "Não especificada"}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {format(new Date(specialist.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        {specialist.sessionCount || 0} sessões
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="mr-2 h-4 w-4 text-yellow-500" />
                        {specialist.rating || 0}/5
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/specialists/${specialist.id}`}>
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
          Mostrando {filteredSpecialists.length} de {specialists.length} especialistas
        </div>
      </CardFooter>
    </Card>
  );
}
