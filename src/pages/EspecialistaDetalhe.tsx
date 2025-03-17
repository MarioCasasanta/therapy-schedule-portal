
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SessionController } from "@/controllers/SessionController";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, Star, MapPin, Globe, Award, BookOpen, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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

export default function EspecialistaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecialist = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await SessionController.getSpecialistById(id);
        setSpecialist(data);
      } catch (err) {
        console.error("Error fetching specialist:", err);
        setError("Não foi possível carregar os dados do especialista.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialist();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (error || !specialist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500">{error || "Especialista não encontrado."}</p>
        <Button onClick={() => window.history.back()} className="mt-4">Voltar</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna lateral com informações do especialista */}
          <div className="md:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                  <img 
                    src={specialist.details?.thumbnail_url || specialist.avatar_url || 'https://via.placeholder.com/400'} 
                    alt={specialist.full_name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold">{specialist.full_name}</h1>
                <p className="text-gray-600">{specialist.specialty}</p>
                
                <div className="flex items-center justify-center mt-2 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.round(specialist.details?.rating || specialist.rating || 0) ? "fill-amber-500" : "text-gray-300"}`} 
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    ({specialist.details?.sessions_completed || 0} sessões)
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <BookOpen className="h-5 w-5 mr-3 text-indigo-500" />
                  <span>{specialist.experience_years} anos de experiência</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="h-5 w-5 mr-3 text-indigo-500" />
                  <span>{specialist.details?.education || "Formação Acadêmica"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-indigo-500" />
                  <span>Sessões Online</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="h-5 w-5 mr-3 text-indigo-500" />
                  <span>
                    {specialist.details?.languages 
                      ? specialist.details.languages.join(", ") 
                      : "Português"}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <Button className="w-full mb-3">Agendar Sessão</Button>
                <Button variant="outline" className="w-full">Entrar em Contato</Button>
              </div>
            </Card>
          </div>

          {/* Conteúdo principal */}
          <div className="md:col-span-2">
            <Tabs defaultValue="sobre" className="w-full">
              <TabsList className="w-full mb-8">
                <TabsTrigger value="sobre" className="flex-1">Sobre</TabsTrigger>
                <TabsTrigger value="especialidades" className="flex-1">Especialidades</TabsTrigger>
                <TabsTrigger value="horarios" className="flex-1">Horários</TabsTrigger>
                <TabsTrigger value="avaliacoes" className="flex-1">Avaliações</TabsTrigger>
              </TabsList>

              <TabsContent value="sobre" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Apresentação</h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {specialist.details?.long_description || specialist.bio || "Descrição não disponível."}
                  </p>
                </Card>
                
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Formação</h2>
                  <p className="text-gray-700">
                    {specialist.details?.education || "Informação não disponível."}
                  </p>
                </Card>
                
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Certificações</h2>
                  <div className="flex flex-wrap gap-2">
                    {specialist.details?.certifications && specialist.details.certifications.length > 0 ? (
                      specialist.details.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {cert}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500">Nenhuma certificação listada.</p>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="especialidades">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Áreas de Atuação</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specialist.details?.areas_of_expertise && specialist.details.areas_of_expertise.length > 0 ? (
                      specialist.details.areas_of_expertise.map((area, index) => (
                        <div key={index} className="flex items-center p-3 border rounded-md">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>{area}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Nenhuma especialidade listada.</p>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="horarios">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Disponibilidade</h2>
                  <div className="bg-gray-100 p-4 rounded-md text-center mb-6">
                    <p className="text-gray-600">
                      Consulte a disponibilidade do especialista e agende sua sessão.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {["Segunda", "Terça", "Quarta", "Quinta", "Sexta"].map((day) => (
                      <div key={day} className="border rounded-md p-3 text-center cursor-pointer hover:bg-gray-50">
                        <div className="flex justify-center mb-2 text-indigo-600">
                          <CalendarDays className="h-5 w-5" />
                        </div>
                        <p className="font-medium">{day}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {["09:00", "10:30", "14:00", "15:30", "17:00", "18:30"].map((time) => (
                      <div key={time} className="border rounded-md p-2 text-center cursor-pointer hover:bg-gray-50 flex items-center justify-center">
                        <Clock className="h-4 w-4 mr-1 text-indigo-600" />
                        <span>{time}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="avaliacoes">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Avaliações de Clientes</h2>
                  <div className="space-y-4">
                    <p className="text-gray-500 text-center py-8">
                      Ainda não há avaliações disponíveis para este especialista.
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
