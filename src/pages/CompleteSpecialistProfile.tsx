
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SpecialistForm from "@/components/specialist/SpecialistForm";

const CompleteSpecialistProfile = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSpecialist, setIsSpecialist] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsAuthenticated(false);
          toast({
            title: "Acesso negado",
            description: "Você precisa estar logado para acessar esta página.",
            variant: "destructive",
          });
          navigate("/auth");
          return;
        }
        
        setIsAuthenticated(true);
        
        // Check if user is a specialist
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();
          
        if (profile?.role === "especialista") {
          setIsSpecialist(true);
        } else {
          toast({
            title: "Acesso negado",
            description: "Esta página é apenas para especialistas.",
            variant: "destructive",
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao carregar a página.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-sage-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sage-800">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isSpecialist) {
    return null; // The useEffect will navigate away
  }

  return (
    <div className="min-h-screen bg-sage-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-playfair font-bold text-center text-sage-800 mb-2">
          Complete seu Perfil Profissional
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Adicione informações detalhadas sobre sua formação e especialização para agilizar o processo de aprovação
        </p>
        
        <SpecialistForm />
      </div>
    </div>
  );
};

export default CompleteSpecialistProfile;
