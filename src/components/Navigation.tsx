
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: error.message,
      });
    } else {
      navigate("/");
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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sage-600 hover:text-sage-800 transition-colors" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Serviços
            </a>
            <a href="#" className="text-sage-600 hover:text-sage-800 transition-colors" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Sobre
            </a>
            <a href="#" className="text-sage-600 hover:text-sage-800 transition-colors" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Depoimentos
            </a>
            <a href="#" className="text-sage-600 hover:text-sage-800 transition-colors" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Contato
            </a>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-sage-600 hover:text-sage-800 transition-colors"
              >
                Sair
              </button>
            ) : (
              <Link 
                to="/auth" 
                className="bg-sage-500 text-white px-6 py-2 rounded-md hover:bg-sage-600 transition-colors"
              >
                Entrar
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
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

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
            >
              Serviços
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
            >
              Sobre
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
            >
              Depoimentos
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
            >
              Contato
            </a>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              >
                Sair
              </button>
            ) : (
              <Link
                to="/auth"
                className="block text-center bg-sage-500 text-white px-6 py-2 rounded-md hover:bg-sage-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
