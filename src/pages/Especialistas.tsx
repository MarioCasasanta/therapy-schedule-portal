
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
        const especialistasData = data.map((profile) => ({
          id: profile.id,
          full_name: profile.full_name || "Especialista",
          avatar_url: profile.avatar_url || "",
          description: profile.notes || "Especialista em terapia e desenvolvimento pessoal.",
          session_price: 150, // Valor padrão, idealmente viria do banco
          rating: 4.8, // Valor padrão, idealmente viria de avaliações
          specialty: "Psicanálise" // Exemplo, idealmente viria do banco
        }));

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nossos Especialistas</h1>
        <p className="text-gray-600 mb-10">Encontre o profissional ideal para sua jornada de autocuidado</p>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {especialistas.length > 0 ? (
              especialistas.map((especialista) => (
                <div 
                  key={especialista.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <div className="rounded-full p-1 border-2 border-white shadow-md">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={especialista.avatar_url} alt={especialista.full_name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-lg">
                            {especialista.full_name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">{especialista.full_name}</h2>
                      <p className="text-sm text-primary mb-1">{especialista.specialty}</p>
                      <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm ml-1 text-gray-600">{especialista.rating}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {especialista.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-gray-800 font-medium">
                          R$ {especialista.session_price?.toFixed(2).replace('.', ',')}
                        </span>
                        <Link to={`/especialistas/${especialista.id}`}>
                          <Button className="bg-primary hover:bg-primary/90">
                            Agendar agora
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">Nenhum especialista encontrado</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EspecialistasPage;
