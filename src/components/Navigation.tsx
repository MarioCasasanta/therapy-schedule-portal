
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      console.log("Navigation: Checking session...");
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Navigation: Session:", session);
      
      if (session?.user) {
        setUser(session.user);
        
        console.log("Navigation: Fetching profile...");
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          console.error("Navigation: Profile fetch error:", error);
          return;
        }
        
        console.log("Navigation: Profile found:", data);
        setProfile(data);
      } else {
        setUser(null);
        setProfile(null);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Navigation: Auth state changed", _event, session);
      
      if (session?.user) {
        setUser(session.user);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          console.error("Navigation: Profile fetch error on auth change:", error);
          return;
        }
        
        setProfile(data);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      // Primeiro limpa os estados locais
      setUser(null);
      setProfile(null);
      
      // Fecha o menu mobile se estiver aberto
      setIsOpen(false);
      
      // Então faz o logout no Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Redireciona para a home
      navigate('/', { replace: true });
      
      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error: any) {
      console.error('Erro no logout:', error);
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: error.message,
      });
    }
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-playfair font-semibold text-sage-600">
              Além do Apego
            </Link>
          </div>
          
          <DesktopNav user={user} profile={profile} handleLogout={handleLogout} />

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
