
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Clock, CheckCircle2, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
  const [variant, setVariant] = useState<number>(1); // Para mostrar diferentes variações de cards

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

  // Renderiza cards de especialistas com base na variante selecionada
  const renderEspecialistasCards = () => {
    if (especialistas.length === 0) {
      return (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">Nenhum especialista encontrado</p>
        </div>
      );
    }

    switch (variant) {
      case 1:
        return especialistas.map((especialista) => (
          <Card 
            key={especialista.id} 
            className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
          >
            <div className="p-2 sm:p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative mx-auto md:mx-0">
                  <div className="h-28 w-28 rounded-full p-1 bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                    <Avatar className="h-full w-full border-4 border-white">
                      <AvatarImage src={especialista.avatar_url} alt={especialista.full_name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {especialista.full_name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                
                <div className="flex-grow space-y-2 text-center md:text-left">
                  <h2 className="text-xl font-semibold text-gray-900">{especialista.full_name}</h2>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    {especialista.specialty}
                  </Badge>
                  <div className="flex items-center justify-center md:justify-start gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-gray-600">{especialista.rating} (86 avaliações)</span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {especialista.description}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4 justify-between items-center">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-xs text-gray-500">50 min</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary font-medium mr-2">
                    R$ {especialista.session_price?.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <Link to={`/especialistas/${especialista.id}`} className="w-full">
                  <Button className="w-full group-hover:bg-primary/90 transition-all">
                    Agendar consulta
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ));
      
      case 2:
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
      
      case 3:
        return especialistas.map((especialista) => (
          <Card 
            key={especialista.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            <div className="grid md:grid-cols-3 h-full">
              <div className="bg-gradient-to-br from-sage-200 to-sage-400 flex items-center justify-center p-6">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src={especialista.avatar_url} alt={especialista.full_name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {especialista.full_name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="md:col-span-2 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{especialista.full_name}</h2>
                      <p className="text-primary text-sm">{especialista.specialty}</p>
                    </div>
                    <Badge className="bg-green-50 text-green-700 border-none">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> Verificado
                    </Badge>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm ml-1 text-gray-600">{especialista.rating}</span>
                    <span className="text-xs text-gray-400 ml-2">(42 sessões)</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {especialista.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-gray-800 font-semibold">
                    R$ {especialista.session_price?.toFixed(2).replace('.', ',')}
                  </div>
                  <Link to={`/especialistas/${especialista.id}`}>
                    <Button className="bg-primary hover:bg-primary/90 group-hover:scale-105 transition-transform">
                      Agendar agora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ));

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nossos Especialistas</h1>
            <p className="text-gray-600">Encontre o profissional ideal para sua jornada de autocuidado</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button 
              variant={variant === 1 ? "default" : "outline"} 
              onClick={() => setVariant(1)}
              className="px-3"
            >
              Estilo 1
            </Button>
            <Button 
              variant={variant === 2 ? "default" : "outline"} 
              onClick={() => setVariant(2)}
              className="px-3"
            >
              Estilo 2
            </Button>
            <Button 
              variant={variant === 3 ? "default" : "outline"} 
              onClick={() => setVariant(3)}
              className="px-3"
            >
              Estilo 3
            </Button>
          </div>
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
