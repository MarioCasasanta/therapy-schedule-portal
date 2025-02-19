
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsOpen(false);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate("/", { replace: true });
      
      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: error.message,
      });
    }
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-playfair font-semibold text-sage-600">
              Além do Apego
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sage-600 hover:text-sage-800 transition-colors">
              Serviços
            </a>
            <a href="#about" className="text-sage-600 hover:text-sage-800 transition-colors">
              Sobre
            </a>
            <a href="#testimonials" className="text-sage-600 hover:text-sage-800 transition-colors">
              Depoimentos
            </a>
            <a href="#contact" className="text-sage-600 hover:text-sage-800 transition-colors">
              Contato
            </a>
            
            {profile?.role === 'admin' && (
              <Link 
                to="/dashboard" 
                className="text-sage-600 hover:text-sage-800 transition-colors font-medium"
              >
                Dashboard
              </Link>
            )}
            
            {user ? (
              <Button 
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            ) : (
              <Link 
                to="/auth" 
                className="bg-sage-500 text-white px-6 py-2 rounded-md hover:bg-sage-600 transition-colors"
              >
                Entrar
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sage-600 hover:text-sage-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <MobileNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
        profile={profile}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Navigation;
