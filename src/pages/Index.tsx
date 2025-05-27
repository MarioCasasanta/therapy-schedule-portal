
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedBlogCarousel from "@/components/FeaturedBlogCarousel";
import FAQSection from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Só verificar a sessão se estivermos na página inicial
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
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <FeaturedBlogCarousel />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
