
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SessionController } from "@/controllers/SessionController";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedBlogCarousel from "@/components/FeaturedBlogCarousel";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [specialists, setSpecialists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar a sessão se estivermos na página inicial
    if (location.pathname === "/") {
      const checkSession = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            console.log("Index: Session found, checking profile");
            // Buscar o perfil do usuário para verificar o role
            const { data: profile, error } = await supabase
              .from("profiles")
              .select("role")
              .eq("id", session.user.id)
              .single();

            if (error) {
              console.error("Index: Profile fetch error:", error);
              return;
            }

            console.log("Index: Profile found:", profile);

            // Removido o redirecionamento automático para permitir
            // que o usuário veja a página inicial mesmo logado
          }
        } catch (error) {
          console.error("Index: Check session error:", error);
        }
      };

      checkSession();
    }

    // Carregar especialistas em destaque
    const loadSpecialists = async () => {
      try {
        setLoading(true);
        const specialists = await SessionController.getSpecialists();
        setSpecialists(specialists.slice(0, 3)); // Mostrar apenas 3 especialistas em destaque
      } catch (error) {
        console.error("Error loading specialists:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSpecialists();
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      
      {/* Seção de Especialistas em Destaque */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Nossos Especialistas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça nossa equipe de profissionais qualificados e prontos para ajudar você 
              em sua jornada de transformação pessoal e bem-estar emocional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center py-8">Carregando especialistas...</div>
            ) : specialists.length > 0 ? (
              specialists.map((specialist) => (
                <Card key={specialist.id} className="overflow-hidden transition-transform duration-300 hover:shadow-lg">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={specialist.details?.thumbnail_url || specialist.avatar_url || 'https://via.placeholder.com/400'} 
                      alt={specialist.full_name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-4 left-4">
                        <p className="text-white font-medium text-lg">{specialist.specialty}</p>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-3 border-2 border-white shadow">
                          <AvatarImage src={specialist.details?.thumbnail_url || specialist.avatar_url} />
                          <AvatarFallback>{specialist.full_name?.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-lg">{specialist.full_name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                            <span className="text-amber-600 font-medium">{specialist.details?.rating || specialist.rating || 0}</span>
                            <span className="text-gray-400 text-sm ml-1">
                              ({specialist.details?.sessions_completed || 0} sessões)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {specialist.details?.short_description || specialist.bio || 
                      "Especialista qualificado com experiência em atendimento personalizado."}
                    </p>
                    
                    <Button 
                      onClick={() => navigate(`/especialista/${specialist.id}`)} 
                      variant="outline" 
                      className="w-full"
                    >
                      Ver Perfil Completo
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                Nenhum especialista encontrado. Em breve teremos novos profissionais disponíveis.
              </div>
            )}
          </div>
          
          {specialists.length > 0 && (
            <div className="text-center mt-10">
              <Button 
                onClick={() => navigate('/especialistas')} 
                variant="default" 
                size="lg"
              >
                Ver Todos os Especialistas
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <FeaturedBlogCarousel />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
