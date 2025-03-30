import { Brain, Heart, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
const HeroSection = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleAgendarClick = async () => {
    const {
      data: {
        session
      }
    } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Login necessário",
        description: "Por favor, faça login para agendar uma sessão.",
        variant: "default"
      });
      navigate("/auth");
      return;
    }
    navigate("/client-dashboard");
  };
  return <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-sage-50 to-white">
      <div className="absolute inset-0">
        <img src="/photo-1649972904349-6e44c42644a7" alt="Background" className="w-full h-full object-cover opacity-10" />
      </div>
      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fadeIn [animation-delay:200ms]">
            <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-sage-600 bg-sage-100 rounded-full shadow-sm">
              Terapia Rápida e Eficaz
            </span>
          </div>
          <div className="relative mb-10">
            <h1 className="animate-fadeIn [animation-delay:400ms] text-4xl md:text-6xl font-playfair font-bold 
            bg-gradient-to-r from-sage-700 via-sage-600 to-sage-500 bg-clip-text text-transparent 
            leading-tight tracking-tight drop-shadow-sm mb-2">
              Além do Apego
              <span className="block mt-2 text-2xl md:text-4xl font-medium text-sage-600">
                Um novo jeito de encarar a saúde mental e o desenvolvimento humano
              </span>
            </h1>
            <div className="absolute -z-10 w-full h-full blur-3xl opacity-10 bg-sage-300 rounded-full"></div>
          </div>
          
          <p className="animate-fadeIn [animation-delay:600ms] text-lg md:text-xl text-gray-600 mb-8">
            Chegou a hora de dar um basta! Descubra o método de terapia que oferece resultados rápidos, 
            transformações logo na primeira sessão e acompanhamento 100% personalizado.
          </p>
          <div className="animate-fadeIn [animation-delay:800ms] flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button onClick={handleAgendarClick} className="bg-sage-500 text-white px-8 py-3 rounded-md hover:bg-sage-600 transition-all transform hover:-translate-y-1 shadow-md">
              Quero agendar minha sessão
            </button>
          </div>
          <div className="animate-fadeIn [animation-delay:1000ms] grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Brain className="w-10 h-10 text-sage-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Método Exclusivo</h3>
              <p className="text-gray-600 text-sm text-center">Ferramentas práticas que transformam a sua vida</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Heart className="w-10 h-10 text-sage-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Acolhimento</h3>
              <p className="text-gray-600 text-sm text-center">Escuta ativa para curar traumas</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Target className="w-10 h-10 text-sage-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Resultados Rápidos</h3>
              <p className="text-gray-600 text-sm text-center">A primeira sessão já traz resultados concretos!</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;