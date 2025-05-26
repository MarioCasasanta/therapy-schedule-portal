import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ArrowLeft, CalendarDays, Clock, MapPin, User, Mail, Phone, GraduationCap, Languages } from "lucide-react";
import { SessionController } from "@/controllers/SessionController";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeeklyCalendar } from "@/components/calendar/WeeklyCalendar";
import { Badge } from "@/components/ui/badge";

interface SpecialistDetail {
  short_description?: string;
  long_description?: string;
  education?: string;
  thumbnail_url?: string;
  sessions_completed?: number;
  areas_of_expertise?: string[];
  languages?: string[];
  certifications?: string[];
  rating?: number;
  [key: string]: any; // Allow additional properties
}

interface Especialista {
  id: string;
  full_name?: string;
  avatar_url?: string;
  description?: string;
  notes?: string;
  specialty?: string;
  bio?: string;
  session_price?: number;
  rating?: number;
  experience_years?: number;
  email?: string;
  phone?: string;
  details?: SpecialistDetail;
}

const EspecialistaDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const [especialista, setEspecialista] = useState<Especialista | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [confirmStep, setConfirmStep] = useState(false);

  useEffect(() => {
    const fetchEspecialista = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await SessionController.getSpecialistDetails(id);

        if (data) {
          setEspecialista({
            id: data.id,
            full_name: data.full_name,
            avatar_url: data.details?.thumbnail_url || data.avatar_url, 
            description: data.details?.short_description || data.bio,
            bio: data.bio,
            specialty: data.specialty,
            session_price: 150, // Valor padrão, idealmente viria do banco
            rating: data.rating,
            experience_years: data.experience_years,
            email: data.email,
            phone: data.phone,
            details: data.details || {}
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados do especialista:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialista();
  }, [id]);

  const handleSelectSlot = (date: Date, time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);
    setSelectedDateTime(dateTime);
    setConfirmStep(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!especialista) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-10">
            <h1 className="text-2xl font-bold mb-4">Especialista não encontrado</h1>
            <Link to="/especialistas">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para lista de especialistas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <Link 
            to="/especialistas" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para lista de especialistas
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="mb-4">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                      <AvatarImage src={especialista.avatar_url} alt={especialista.full_name || ""} />
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                        {especialista.full_name ? especialista.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : 'ES'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{especialista.full_name}</h1>
                  <p className="text-primary mb-2">{especialista.specialty}</p>
                  
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-gray-700">{especialista.rating} (Excelente)</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
                    <p className="text-lg font-semibold text-gray-900 mb-1">
                      R$ {especialista.session_price?.toFixed(2).replace('.', ',')}
                    </p>
                    <p className="text-gray-500 text-sm">por sessão de 50 minutos</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Formação</h3>
                      <p className="text-gray-600 text-sm">{especialista.details?.education || "Não informada"}</p>
                    </div>
                  </div>
                
                  <div className="flex items-start gap-3">
                    <CalendarDays className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Experiência</h3>
                      <p className="text-gray-600 text-sm">{especialista.experience_years} anos de experiência</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Duração</h3>
                      <p className="text-gray-600 text-sm">Sessões de 50 minutos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Atendimento</h3>
                      <p className="text-gray-600 text-sm">Online via videoconferência</p>
                    </div>
                  </div>
                  
                  {especialista.details?.languages && especialista.details.languages.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Languages className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Idiomas</h3>
                        <p className="text-gray-600 text-sm">{especialista.details.languages.join(", ")}</p>
                      </div>
                    </div>
                  )}
                  
                  {especialista.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Email</h3>
                        <p className="text-gray-600 text-sm">{especialista.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Phone property is not available in the specialist type */}
                  {/* <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Telefone</h3>
                      <p className="text-gray-600 text-sm">{especialista.phone}</p>
                    </div>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">Sobre</TabsTrigger>
                <TabsTrigger value="schedule">Agendar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Sobre o profissional</h2>
                    <div className="prose max-w-none text-gray-700">
                      <p>{especialista.details?.short_description || especialista.description}</p>
                      
                      {especialista.details?.long_description && (
                        <p className="mt-4">{especialista.details.long_description}</p>
                      )}
                      
                      {!especialista.details?.long_description && (
                        <>
                          <p className="mt-4">
                            Com {especialista.experience_years} anos de experiência, {especialista.full_name} é 
                            especialista em atender pessoas que buscam desenvolvimento pessoal, 
                            autoconhecimento e bem-estar emocional.
                          </p>
                          <p className="mt-4">
                            Cada sessão é personalizada de acordo com as necessidades individuais, 
                            utilizando técnicas baseadas em evidências para ajudar no processo terapêutico.
                          </p>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-3">Especializações</h3>
                      <div className="flex flex-wrap gap-2">
                        {especialista.details?.areas_of_expertise && especialista.details.areas_of_expertise.length > 0 ? (
                          especialista.details.areas_of_expertise.map((area, index) => (
                            <Badge key={index} variant="secondary" className="rounded-full">
                              {area}
                            </Badge>
                          ))
                        ) : (
                          <>
                            <Badge variant="secondary" className="rounded-full">Ansiedade</Badge>
                            <Badge variant="secondary" className="rounded-full">Depressão</Badge>
                            <Badge variant="secondary" className="rounded-full">Autoconhecimento</Badge>
                            <Badge variant="secondary" className="rounded-full">Relacionamentos</Badge>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {especialista.details?.certifications && especialista.details.certifications.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-3">Certificações</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {especialista.details.certifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="schedule">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Agende sua sessão</h2>
                    
                    <WeeklyCalendar
                      onSelectSlot={handleSelectSlot}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspecialistaDetalhe;
