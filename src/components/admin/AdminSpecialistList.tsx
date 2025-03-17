
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserSearch, Calendar, CheckCircle2, Search, Briefcase, GraduationCap, Languages, Award, Star } from "lucide-react";

interface SpecialistDetail {
  short_description?: string;
  long_description?: string;
  education?: string;
  thumbnail_url?: string;
  sessions_completed?: number;
  areas_of_expertise?: string[];
  languages?: string[];
  certifications?: string[];
}

interface Specialist {
  id: string;
  created_at: string;
  full_name?: string;
  email?: string;
  specialty?: string;
  bio?: string;
  experience_years?: number;
  rating?: number;
  sessionCount?: number;
  details?: SpecialistDetail;
}

export function AdminSpecialistList() {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalSpecialists, setTotalSpecialists] = useState<number>(0);
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
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

  const handleViewDetails = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
    setDetailDialogOpen(true);
  };

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
                <TableHead>Qualificações</TableHead>
                <TableHead>Data de Inscrição</TableHead>
                <TableHead>Sessões Realizadas</TableHead>
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
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={specialist.details?.thumbnail_url || specialist.avatar_url} alt={specialist.full_name || ""} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {specialist.full_name ? specialist.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : 'ES'}
                          </AvatarFallback>
                        </Avatar>
                        <span>{specialist.full_name || "Especialista sem nome"}</span>
                      </div>
                    </TableCell>
                    <TableCell>{specialist.email || "Sem email"}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        {specialist.specialty || "Não especificada"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {specialist.details?.areas_of_expertise && specialist.details.areas_of_expertise.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {specialist.details.areas_of_expertise.slice(0, 2).map((area, index) => (
                            <span key={index} className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs">
                              {area}
                            </span>
                          ))}
                          {specialist.details.areas_of_expertise.length > 2 && (
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs">
                              +{specialist.details.areas_of_expertise.length - 2}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Não informadas</span>
                      )}
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
                        {specialist.details?.sessions_completed || specialist.sessionCount || 0} sessões
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(specialist)}>
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

      {/* Dialog para exibir detalhes do especialista */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Especialista</DialogTitle>
            <DialogDescription>
              Informações detalhadas sobre o especialista selecionado
            </DialogDescription>
          </DialogHeader>
          
          {selectedSpecialist && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedSpecialist.details?.thumbnail_url || selectedSpecialist.avatar_url} alt={selectedSpecialist.full_name || ""} />
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">
                    {selectedSpecialist.full_name ? selectedSpecialist.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : 'ES'}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-xl font-semibold">{selectedSpecialist.full_name}</h3>
                  <p className="text-muted-foreground">{selectedSpecialist.email}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>{selectedSpecialist.rating || selectedSpecialist.details?.rating || 0}</span>
                    <span className="mx-2">•</span>
                    <Briefcase className="h-4 w-4 text-muted-foreground mr-1" />
                    <span>{selectedSpecialist.specialty}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedSpecialist.experience_years || 0} anos de experiência</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Formação
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedSpecialist.details?.education || "Não informada"}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Languages className="h-4 w-4 mr-2" />
                    Idiomas
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedSpecialist.details?.languages && selectedSpecialist.details.languages.length > 0 ? (
                      selectedSpecialist.details.languages.map((language, index) => (
                        <span key={index} className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs">
                          {language}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">Não informados</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Áreas de Especialização
                </h4>
                <div className="flex flex-wrap gap-1">
                  {selectedSpecialist.details?.areas_of_expertise && selectedSpecialist.details.areas_of_expertise.length > 0 ? (
                    selectedSpecialist.details.areas_of_expertise.map((area, index) => (
                      <span key={index} className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs">
                        {area}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">Não informadas</span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Descrição Curta</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedSpecialist.details?.short_description || selectedSpecialist.bio || "Não informada"}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Descrição Completa</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedSpecialist.details?.long_description || "Não informada"}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
              Fechar
            </Button>
            <Button>
              Editar Especialista
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
