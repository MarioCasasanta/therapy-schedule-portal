
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Especialista {
  id: string;
  full_name: string;
  avatar_url: string;
  description?: string;
  session_price?: number;
  rating?: number;
  specialty?: string;
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
          specialty: "Psicanálise" // Exemplo, idealmente viria do banco
        }));

        // Adicionar especialistas fictícios para visualização do layout
        if (especialistasData.length < 6) {
          const ficticios = [
            {
              id: "ficticio-1",
              full_name: "Dra. Amanda Santos",
              avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Especialista em Terapia Cognitivo-Comportamental com foco em ansiedade e depressão.",
              session_price: 180,
              rating: 4.9,
              specialty: "Psicologia Cognitivo-Comportamental"
            },
            {
              id: "ficticio-2",
              full_name: "Dr. Ricardo Oliveira",
              avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Psicoterapeuta com 15 anos de experiência em relacionamentos e traumas.",
              session_price: 200,
              rating: 4.7,
              specialty: "Psicoterapia"
            },
            {
              id: "ficticio-3",
              full_name: "Dra. Carla Mendes",
              avatar_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Especialista em saúde mental com abordagem humanista e foco no autoconhecimento.",
              session_price: 170,
              rating: 4.8,
              specialty: "Psicologia Humanista"
            },
            {
              id: "ficticio-4",
              full_name: "Dr. Paulo Fernandes",
              avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Psicanalista especializado em questões de identidade e desenvolvimento pessoal.",
              session_price: 190,
              rating: 4.6,
              specialty: "Psicanálise"
            },
            {
              id: "ficticio-5",
              full_name: "Dra. Juliana Martins",
              avatar_url: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
              description: "Terapeuta comportamental com experiência em transtornos alimentares e autoestima.",
              session_price: 160,
              rating: 4.9,
              specialty: "Terapia Comportamental"
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

  const renderEspecialistasCards = () => {
    if (especialistas.length === 0) {
      return (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">Nenhum especialista encontrado</p>
        </div>
      );
    }

    // Usando apenas o estilo 2
    return especialistas.map((especialista) => (
      <div 
        key={especialista.id} 
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20"
      >
        <div className="bg-gradient-to-r from-primary/90 to-primary h-20 relative">
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <Avatar className="h-20 w-20 border-4 border-white shadow-sm">
              <AvatarImage src={especialista.avatar_url} alt={especialista.full_name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {especialista.full_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        <div className="pt-12 px-4 pb-4 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{especialista.full_name}</h2>
          <p className="text-primary text-sm font-medium mb-2">{especialista.specialty}</p>
          
          <div className="flex items-center justify-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(especialista.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm ml-2 text-gray-600">({especialista.rating})</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {especialista.description}
          </p>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-xs text-gray-500">Disponível hoje</span>
            </div>
            <div className="text-gray-800 font-semibold">
              R$ {especialista.session_price?.toFixed(2).replace('.', ',')}
            </div>
          </div>
          
          <Link to={`/especialistas/${especialista.id}`}>
            <Button variant="outline" className="w-full bg-white hover:bg-primary hover:text-white border-primary/30 text-primary">
              Agendar agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    ));
  };

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
            {renderEspecialistasCards()}
          </div>
        )}
      </div>
    </div>
  );
};

export default EspecialistasPage;
