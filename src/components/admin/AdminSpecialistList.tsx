import { useState, useEffect } from "react";
import { SessionController } from "@/controllers/SessionController";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Edit, User, Star, BookOpen, Award, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Specialist {
  id: string;
  full_name?: string;
  email?: string;
  created_at: string;
  specialty?: string;
  bio?: string;
  experience_years?: number;
  rating?: number;
  avatar_url?: string;
  details?: {
    short_description?: string;
    long_description?: string;
    education?: string;
    thumbnail_url?: string;
    rating?: number;
    sessions_completed?: number;
    areas_of_expertise?: string[];
    languages?: string[];
    certifications?: string[];
  };
}

export default function AdminSpecialistList() {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSpecialist, setCurrentSpecialist] = useState<Specialist | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    specialty: "",
    bio: "",
    experienceYears: "",
    // Campos de detalhes
    shortDescription: "",
    longDescription: "",
    education: "",
    thumbnailUrl: "",
    areasOfExpertise: "",
    languages: "",
    certifications: "",
    sessionsCompleted: "0"
  });

  useEffect(() => {
    loadSpecialists();
  }, []);

  const loadSpecialists = async () => {
    try {
      const specialists = await SessionController.getSpecialists();
      setSpecialists(specialists);
    } catch (error) {
      console.error("Error loading specialists:", error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar especialistas",
        description: "Ocorreu um erro ao buscar os especialistas. Por favor, tente novamente.",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddSpecialist = async () => {
    setIsSubmitting(true);
    try {
      // Criar um ID único para o novo especialista (pode ser substituído por um UUID gerado no backend)
      const newSpecialistId = Math.random().toString(36).substring(2, 15);

      // Preparar os dados do especialista
      const specialistData = {
        specialty: formData.specialty,
        bio: formData.bio,
        experience_years: parseInt(formData.experienceYears || "0", 10),
        rating: 0 // Valor padrão
      };

      // Preparar os dados de detalhes do especialista
      const detailsData = {
        short_description: formData.shortDescription,
        long_description: formData.longDescription,
        education: formData.education,
        thumbnail_url: formData.thumbnailUrl,
        rating: 0, // Valor padrão
        sessions_completed: parseInt(formData.sessionsCompleted || "0", 10),
        areas_of_expertise: formData.areasOfExpertise.split(",").map(item => item.trim()),
        languages: formData.languages.split(",").map(item => item.trim()),
        certifications: formData.certifications.split(",").map(item => item.trim())
      };

      // Registrar o especialista
      await SessionController.registerSpecialist(newSpecialistId, specialistData, detailsData);

      // Atualizar a lista de especialistas
      await loadSpecialists();

      toast({
        title: "Especialista adicionado",
        description: "Especialista adicionado com sucesso!",
      });
      setIsAddDialogOpen(false);
      setFormData({
        fullName: "",
        email: "",
        specialty: "",
        bio: "",
        experienceYears: "",
        // Campos de detalhes
        shortDescription: "",
        longDescription: "",
        education: "",
        thumbnailUrl: "",
        areasOfExpertise: "",
        languages: "",
        certifications: "",
        sessionsCompleted: "0"
      });
    } catch (error: any) {
      console.error("Error adding specialist:", error);
      toast({
        variant: "destructive",
        title: "Erro ao adicionar especialista",
        description: error.message || "Ocorreu um erro ao adicionar o especialista. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSpecialist = async () => {
    if (!currentSpecialist) return;

    setIsSubmitting(true);
    try {
      // Preparar os dados do especialista para atualização
      const specialistData = {
        specialty: formData.specialty,
        bio: formData.bio,
        experience_years: parseInt(formData.experienceYears || "0", 10),
        rating: currentSpecialist.rating || 0 // Manter o rating existente
      };

      // Preparar os dados de detalhes do especialista para atualização
      const detailsData = {
        short_description: formData.shortDescription,
        long_description: formData.longDescription,
        education: formData.education,
        thumbnail_url: formData.thumbnailUrl,
        rating: currentSpecialist.details?.rating || 0, // Manter o rating existente
        sessions_completed: parseInt(formData.sessionsCompleted || "0", 10),
        areas_of_expertise: formData.areasOfExpertise.split(",").map(item => item.trim()),
        languages: formData.languages.split(",").map(item => item.trim()),
        certifications: formData.certifications.split(",").map(item => item.trim())
      };

      // Atualizar o especialista
      await SessionController.registerSpecialist(currentSpecialist.id, specialistData, detailsData);

      // Atualizar a lista de especialistas
      await loadSpecialists();

      toast({
        title: "Especialista atualizado",
        description: "Especialista atualizado com sucesso!",
      });
      setIsEditDialogOpen(false);
      setFormData({
        fullName: "",
        email: "",
        specialty: "",
        bio: "",
        experienceYears: "",
        // Campos de detalhes
        shortDescription: "",
        longDescription: "",
        education: "",
        thumbnailUrl: "",
        areasOfExpertise: "",
        languages: "",
        certifications: "",
        sessionsCompleted: "0"
      });
    } catch (error: any) {
      console.error("Error updating specialist:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar especialista",
        description: error.message || "Ocorreu um erro ao atualizar o especialista. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gerenciar Especialistas</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Especialista
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="inactive">Inativos</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {specialists
              .filter((specialist) => true) // Substituir por filtro real de status
              .map((specialist) => (
                <SpecialistCard 
                  key={specialist.id} 
                  specialist={specialist} 
                  onEdit={() => {
                    setCurrentSpecialist(specialist);
                    setFormData({
                      fullName: specialist.full_name || "",
                      email: specialist.email || "",
                      specialty: specialist.specialty || "",
                      bio: specialist.bio || "",
                      experienceYears: specialist.experience_years?.toString() || "",
                      // Valores de detalhes
                      shortDescription: specialist.details?.short_description || "",
                      longDescription: specialist.details?.long_description || "",
                      education: specialist.details?.education || "",
                      thumbnailUrl: specialist.details?.thumbnail_url || specialist.avatar_url || "",
                      areasOfExpertise: specialist.details?.areas_of_expertise?.join(", ") || "",
                      languages: specialist.details?.languages?.join(", ") || "",
                      certifications: specialist.details?.certifications?.join(", ") || "",
                      sessionsCompleted: specialist.details?.sessions_completed?.toString() || "0"
                    });
                    setIsEditDialogOpen(true);
                  }}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Versão filtrada da lista de especialistas, mostrando pendentes */}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Versão filtrada da lista de especialistas, mostrando inativos */}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog para adicionar especialista */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Especialista</DialogTitle>
            <DialogDescription>
              Preencha os dados para cadastrar um novo especialista.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="specialty">Especialidade</Label>
              <Input
                type="text"
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="experienceYears">Anos de Experiência</Label>
              <Input
                type="number"
                id="experienceYears"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
              />
            </div>

            {/* Campos de detalhes */}
            <div>
              <Label htmlFor="shortDescription">Descrição Curta</Label>
              <Input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="longDescription">Descrição Longa</Label>
              <Textarea
                id="longDescription"
                name="longDescription"
                value={formData.longDescription}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="education">Formação</Label>
              <Input
                type="text"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="thumbnailUrl">URL da Imagem</Label>
              <Input
                type="text"
                id="thumbnailUrl"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="areasOfExpertise">Áreas de Expertise (separadas por vírgula)</Label>
              <Input
                type="text"
                id="areasOfExpertise"
                name="areasOfExpertise"
                value={formData.areasOfExpertise}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="languages">Línguas (separadas por vírgula)</Label>
              <Input
                type="text"
                id="languages"
                name="languages"
                value={formData.languages}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="certifications">Certificações (separadas por vírgula)</Label>
              <Input
                type="text"
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="sessionsCompleted">Sessões Completadas</Label>
              <Input
                type="number"
                id="sessionsCompleted"
                name="sessionsCompleted"
                value={formData.sessionsCompleted}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddSpecialist} disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Especialista"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para editar especialista */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Especialista</DialogTitle>
            <DialogDescription>
              Atualize as informações do especialista.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="specialty">Especialidade</Label>
              <Input
                type="text"
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="experienceYears">Anos de Experiência</Label>
              <Input
                type="number"
                id="experienceYears"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
              />
            </div>

            {/* Campos de detalhes */}
            <div>
              <Label htmlFor="shortDescription">Descrição Curta</Label>
              <Input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="longDescription">Descrição Longa</Label>
              <Textarea
                id="longDescription"
                name="longDescription"
                value={formData.longDescription}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="education">Formação</Label>
              <Input
                type="text"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="thumbnailUrl">URL da Imagem</Label>
              <Input
                type="text"
                id="thumbnailUrl"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="areasOfExpertise">Áreas de Expertise (separadas por vírgula)</Label>
              <Input
                type="text"
                id="areasOfExpertise"
                name="areasOfExpertise"
                value={formData.areasOfExpertise}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="languages">Línguas (separadas por vírgula)</Label>
              <Input
                type="text"
                id="languages"
                name="languages"
                value={formData.languages}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="certifications">Certificações (separadas por vírgula)</Label>
              <Input
                type="text"
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="sessionsCompleted">Sessões Completadas</Label>
              <Input
                type="number"
                id="sessionsCompleted"
                name="sessionsCompleted"
                value={formData.sessionsCompleted}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateSpecialist} disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Atualizar Especialista"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Componente de card para exibir cada especialista na lista
const SpecialistCard = ({ specialist, onEdit }: { specialist: Specialist, onEdit: () => void }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 h-40 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
          <div className="absolute bottom-4 left-4 flex items-center text-white">
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage src={specialist.details?.thumbnail_url || specialist.avatar_url} alt={specialist.full_name} />
              <AvatarFallback>{specialist.full_name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h3 className="font-semibold">{specialist.full_name}</h3>
              <p className="text-sm text-gray-200">{specialist.specialty}</p>
            </div>
          </div>
        </div>
        <img
          src={specialist.details?.thumbnail_url || specialist.avatar_url || 'https://via.placeholder.com/500x200'}
          alt={specialist.full_name}
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center text-amber-500 mb-2">
          <Star className="h-4 w-4 mr-1 fill-amber-500" />
          <span>{specialist.details?.rating || specialist.rating || 0}</span>
          <span className="text-sm text-gray-500 ml-2">
            ({specialist.details?.sessions_completed || 0} sessões)
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">
          {specialist.details?.short_description || specialist.bio}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-gray-500">
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            <span>{specialist.experience_years} anos</span>
          </div>
          <div className="flex items-center">
            <Award className="h-3 w-3 mr-1" />
            <span>{specialist.details?.education?.split(" ")[0] || "Graduação"}</span>
          </div>
          <div className="flex items-center">
            <Globe className="h-3 w-3 mr-1" />
            <span>
              {specialist.details?.languages 
                ? specialist.details.languages.slice(0, 2).join(", ") 
                : "Português"}
            </span>
          </div>
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>Disponível</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t flex justify-end">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
      </CardFooter>
    </Card>
  );
};
