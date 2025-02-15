
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

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

            if (profile?.role === "admin") {
              navigate("/dashboard");
            } else {
              navigate("/client-dashboard");
            }
          }
        } catch (error) {
          console.error("Index: Check session error:", error);
        }
      };

      checkSession();
    }
  }, [navigate, location]);

  // Se não estiver na página inicial, não fazer nada
  if (location.pathname !== "/") {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
