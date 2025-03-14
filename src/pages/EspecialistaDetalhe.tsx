
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ArrowLeft, CalendarDays, Clock, MapPin, User, Mail, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeeklyCalendar } from "@/components/calendar/WeeklyCalendar";

interface Especialista {
  id: string;
  full_name: string;
  avatar_url: string;
  description?: string;
  notes?: string;
  specialty?: string;
  session_price?: number;
  rating?: number;
  experience_years?: number;
  email?: string;
  phone?: string;
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
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        // Transformando os dados para o formato que precisamos
        setEspecialista({
          id: data.id,
          full_name: data.full_name || "Especialista",
          avatar_url: data.avatar_url || "",
          description: data.notes || "Especialista em terapia e desenvolvimento pessoal.",
          notes: data.notes,
          specialty: "Psicanálise", // Exemplo, idealmente viria do banco
          session_price: 150, // Valor padrão, idealmente viria do banco
          rating: 4.8, // Valor padrão, idealmente viria de avaliações
          experience_years: 5, // Exemplo, idealmente viria do banco
          email: data.email,
          phone: data.telefone || data.phone,
        });
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
          {/* Coluna de informações do especialista */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="mb-4">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                      <AvatarImage src={especialista.avatar_url} alt={especialista.full_name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                        {especialista.full_name.split(' ').map(n => n[0]).join('')}
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
                  
                  {especialista.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Email</h3>
                        <p className="text-gray-600 text-sm">{especialista.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {especialista.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Telefone</h3>
                        <p className="text-gray-600 text-sm">{especialista.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Coluna de conteúdo e agendamento */}
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
                      <p>{especialista.description}</p>
                      <p className="mt-4">
                        Com {especialista.experience_years} anos de experiência, {especialista.full_name} é 
                        especialista em atender pessoas que buscam desenvolvimento pessoal, 
                        autoconhecimento e bem-estar emocional.
                      </p>
                      <p className="mt-4">
                        Cada sessão é personalizada de acordo com as necessidades individuais, 
                        utilizando técnicas baseadas em evidências para ajudar no processo terapêutico.
                      </p>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-3">Especialidades</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          Ansiedade
                        </span>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          Depressão
                        </span>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          Autoconhecimento
                        </span>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          Relacionamentos
                        </span>
                      </div>
                    </div>
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
