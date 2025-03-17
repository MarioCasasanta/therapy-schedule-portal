
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
import { UserSearch, Calendar, CheckCircle2, Search, Briefcase } from "lucide-react";

interface Specialist {
  id: string;
  created_at: string;
  full_name?: string;
  email?: string;
  bio?: string;
  specialty?: string;
  sessionCount?: number;
}

export function AdminSpecialistList() {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalSpecialists, setTotalSpecialists] = useState<number>(0);
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all");
  const [specialties, setSpecialties] = useState<string[]>([]);
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
        
        // Extract unique specialties for the filter
        const uniqueSpecialties = Array.from(
          new Set(
            specialistsData
              .map(spec => spec.specialty)
              .filter(specialty => specialty) as string[]
          )
        );
        
        setSpecialists(specialistsWithSessionCount);
        setSpecialties(uniqueSpecialties);
        setTotalSpecialists(specialistsWithSessionCount.length);
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

  // Search specialists when search term changes
  useEffect(() => {
    async function searchSpecialists() {
      try {
        if (searchTerm.trim() === "") {
          // If search is cleared, reload all specialists
          const specialistsData = await SessionController.getAllSpecialists();
          
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
          setTotalSpecialists(specialistsWithSessionCount.length);
        } else {
          // Search for specialists
          const specialistsData = await SessionController.searchSpecialists(searchTerm);
          
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
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro na pesquisa",
          description: error.message,
        });
      }
    }

    // Debounce search to avoid too many queries
    const handler = setTimeout(() => {
      searchSpecialists();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, toast]);

  // Filter specialists based on specialty
  const filteredSpecialists = specialists.filter(specialist => {
    return specialtyFilter === "all" || specialist.specialty === specialtyFilter;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Especialistas</CardTitle>
        <CardDescription>
          Gerencie os {totalSpecialists} especialistas cadastrados na plataforma
        </CardDescription>
        <div className="flex flex-col gap-4 mt-4 md:flex-row md:justify-between">
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou especialidade"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={specialtyFilter}
              onValueChange={setSpecialtyFilter}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Filtrar por especialidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as especialidades</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                <TableHead>Data de Inscrição</TableHead>
                <TableHead>Sessões Realizadas</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSpecialists.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
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
                    <TableCell>
                      <div className="flex items-center">
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        {specialist.specialty || "Não especificada"}
                      </div>
                    </TableCell>
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
          Mostrando {filteredSpecialists.length} de {totalSpecialists} especialistas
        </div>
      </CardFooter>
    </Card>
  );
}
