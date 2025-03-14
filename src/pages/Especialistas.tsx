
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Especialista {
  id: string;
  full_name: string;
  avatar_url: string;
  description?: string;
  session_price?: number;
  rating?: number;
  specialty?: string;
  location?: string;
  experience?: number;
}

const EspecialistasPage = () => {
  const [especialistas, setEspecialistas] = useState<Especialista[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEspecialistas = async () => {
      try {
        // Buscar perfis com role = 'admin' pois são os terapeutas/especialistas
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("role", "admin");

        if (error) throw error;

        // Transformando os dados para o formato que precisamos
        let especialistasData = data.map((profile) => ({
          id: profile.id,
          full_name: profile.full_name || "Especialista",
          avatar_url: profile.avatar_url || "",
          description: profile.notes || "Especialista com vasta experiência em terapia e desenvolvimento pessoal. Oferece suporte para questões de ansiedade, autoconhecimento, relacionamentos e desenvolvimento profissional. Utiliza abordagem integrativa adaptada às necessidades individuais de cada cliente, criando um espaço seguro e acolhedor para o processo terapêutico.",
          session_price: 150, // Valor padrão, idealmente viria do banco
          rating: 4.8, // Valor padrão, idealmente viria de avaliações
          specialty: "Psicanálise", // Exemplo, idealmente viria do banco
          location: "Atendimento online",
          experience: 5
        }));

        // Adicionar especialistas fictícios para visualização do layout
        if (especialistasData.length < 6) {
          const ficticios = [
            {
              id: "ficticio-1",
              full_name: "Amanda Santos",
              avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Psicóloga com abordagem cognitivo-comportamental, especialista em ansiedade e depressão. Utiliza técnicas baseadas em evidências para ajudar seus clientes a desenvolverem ferramentas práticas para lidar com desafios emocionais. Oferece um espaço acolhedor onde você pode explorar seus pensamentos e emoções com segurança, desenvolvendo estratégias personalizadas para seu bem-estar mental.",
              session_price: 180,
              rating: 4.9,
              specialty: "Psicologia Cognitivo-Comportamental",
              location: "Atendimento online",
              experience: 8
            },
            {
              id: "ficticio-2",
              full_name: "Ricardo Oliveira",
              avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Psicoterapeuta com 15 anos de experiência em relacionamentos e traumas. Especializado em terapia de casal e familiar, ajudando pessoas a reconstruírem vínculos e superarem dificuldades de comunicação. Trabalha com abordagem sistêmica, considerando os diversos fatores que influenciam os relacionamentos e oferecendo ferramentas práticas para transformação positiva.",
              session_price: 200,
              rating: 4.7,
              specialty: "Psicoterapia",
              location: "Atendimento online",
              experience: 15
            },
            {
              id: "ficticio-3",
              full_name: "Carla Mendes",
              avatar_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Especialista em saúde mental com abordagem humanista e foco no autoconhecimento. Dedicada a ajudar pessoas a encontrarem seu potencial pleno e autenticidade. Cria um ambiente terapêutico de aceitação incondicional onde você pode explorar seus valores e sentimentos mais profundos, redescobrindo sua capacidade inata de crescimento pessoal e bem-estar emocional.",
              session_price: 170,
              rating: 4.8,
              specialty: "Psicologia Humanista",
              location: "Atendimento online",
              experience: 7
            },
            {
              id: "ficticio-4",
              full_name: "Paulo Fernandes",
              avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Psicanalista especializado em questões de identidade e desenvolvimento pessoal. Com formação em psicanálise contemporânea, oferece um espaço seguro para exploração do inconsciente e ressignificação de experiências. Trabalha com sonhos, memórias e associações livres para ajudar seus clientes a compreenderem padrões comportamentais e emocionais que influenciam suas vidas.",
              session_price: 190,
              rating: 4.6,
              specialty: "Psicanálise",
              location: "Atendimento online",
              experience: 10
            },
            {
              id: "ficticio-5",
              full_name: "Juliana Martins",
              avatar_url: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Terapeuta comportamental com experiência em transtornos alimentares e autoestima. Utiliza técnicas baseadas em evidências para promover mudanças positivas e duradouras. Especializada em ajudar pessoas a desenvolverem uma relação saudável com o corpo e a alimentação, trabalhando questões de imagem corporal, comportamentos compulsivos e crenças limitantes sobre si mesmas.",
              session_price: 160,
              rating: 4.9,
              specialty: "Terapia Comportamental",
              location: "Atendimento online",
              experience: 6
            }
          ];
          
          especialistasData = [...especialistasData, ...ficticios];
        }

        setEspecialistas(especialistasData);
      } catch (error) {
        console.error("Erro ao buscar especialistas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialistas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nossos Especialistas</h1>
          <p className="text-gray-600">Encontre o profissional ideal para sua jornada de autocuidado</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {especialistas.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Nenhum especialista encontrado</p>
              </div>
            ) : (
              especialistas.map((especialista) => (
                <Card 
                  key={especialista.id} 
                  className="overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* Foto e informações básicas */}
                      <div className="md:col-span-3">
                        <div className="flex flex-col items-center md:items-start">
                          <Avatar className="h-20 w-20 mb-3">
                            <AvatarImage src={especialista.avatar_url} alt={especialista.full_name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {especialista.full_name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <h3 className="font-semibold text-xl text-gray-900 mb-1">{especialista.full_name}</h3>
                          <p className="text-primary mb-2">{especialista.specialty}</p>
                          
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < Math.floor(especialista.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-sm text-gray-500 ml-1">({especialista.rating})</span>
                          </div>
                          
                          <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                              {especialista.location}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-1 text-gray-400" />
                              {especialista.experience} anos de experiência
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Descrição */}
                      <div className="md:col-span-5">
                        <h4 className="font-medium text-gray-900 mb-2 md:hidden">Sobre</h4>
                        <p className="text-gray-600 text-sm md:text-base line-clamp-6">
                          {especialista.description}
                        </p>
                      </div>
                      
                      {/* Agenda e Preço */}
                      <div className="md:col-span-4">
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="flex items-center mb-3">
                            <Calendar className="h-5 w-5 text-primary mr-2" />
                            <h4 className="font-medium text-gray-900">Próximas disponibilidades</h4>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            <Button variant="outline" size="sm" className="justify-start">
                              Hoje, 14:00
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start">
                              Hoje, 16:30
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start">
                              Amanhã, 10:00
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start">
                              Amanhã, 15:30
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-sm text-gray-500">Preço da sessão</p>
                            <p className="text-xl font-semibold text-primary">
                              R$ {especialista.session_price?.toFixed(2).replace('.', ',')}
                            </p>
                          </div>
                          
                          <Link to={`/especialistas/${especialista.id}`}>
                            <Button>
                              Ver perfil
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EspecialistasPage;
