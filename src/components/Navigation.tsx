
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
    const fetchProfile = async (userId: string) => {
      console.log("Navigation: Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Navigation: Profile fetch error:", error);
        return null;
      }
      
      console.log("Navigation: Profile data:", data);
      return data;
    };

    const checkSession = async () => {
      console.log("Navigation: Checking session...");
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Navigation: Session data:", session);
      
      if (session?.user) {
        setUser(session.user);
        const profileData = await fetchProfile(session.user.id);
        console.log("Navigation: Setting profile:", profileData);
        setProfile(profileData);
      } else {
        console.log("Navigation: No session found");
        setUser(null);
        setProfile(null);
      }
    };

    // Checa a sessão inicial
    checkSession();

    // Inscreve para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Navigation: Auth state changed:", _event, session);
      
      if (session?.user) {
        setUser(session.user);
        const profileData = await fetchProfile(session.user.id);
        console.log("Navigation: Setting profile after auth change:", profileData);
        setProfile(profileData);
      } else {
        console.log("Navigation: Clearing user and profile data");
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      console.log("Navigation: Unsubscribing from auth changes");
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      console.log("Navigation: Starting logout process");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log("Navigation: Clearing local state");
      setUser(null);
      setProfile(null);
      
      navigate('/', { replace: true });
      
      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error: any) {
      console.error('Navigation: Logout error:', error);
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: error.message,
      });
    }
  };

  console.log("Navigation: Current state -", { user, profile });

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
