
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
          description: profile.notes || "Especialista em terapia e desenvolvimento pessoal.",
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
              description: "Psicóloga com abordagem cognitivo-comportamental, especialista em ansiedade e depressão.",
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
              description: "Psicoterapeuta com 15 anos de experiência em relacionamentos e traumas.",
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
              description: "Especialista em saúde mental com abordagem humanista e foco no autoconhecimento.",
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
              description: "Psicanalista especializado em questões de identidade e desenvolvimento pessoal.",
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
              description: "Terapeuta comportamental com experiência em transtornos alimentares e autoestima.",
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {especialistas.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">Nenhum especialista encontrado</p>
              </div>
            ) : (
              especialistas.map((especialista) => (
                <Card 
                  key={especialista.id} 
                  className="overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      <div className="p-4 flex items-center gap-4">
                        <Avatar className="h-16 w-16 rounded-md border border-gray-100">
                          <AvatarImage src={especialista.avatar_url} alt={especialista.full_name} />
                          <AvatarFallback className="rounded-md bg-primary/10 text-primary">
                            {especialista.full_name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{especialista.full_name}</h3>
                          <p className="text-sm text-primary">{especialista.specialty}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-3 w-3 ${i < Math.floor(especialista.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">({especialista.rating})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-4 pb-2">
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                          {especialista.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {especialista.location}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {especialista.experience} anos de experiência
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 px-4 py-3 flex justify-between items-center mt-auto">
                        <div className="font-medium">
                          <div className="text-sm text-gray-400">Sessão</div>
                          <div className="text-primary font-semibold">
                            R$ {especialista.session_price?.toFixed(2).replace('.', ',')}
                          </div>
                        </div>
                        
                        <Link to={`/especialistas/${especialista.id}`}>
                          <Button variant="default" size="sm" className="text-sm">
                            Ver perfil
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
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
