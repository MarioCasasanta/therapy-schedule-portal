
import { useState } from "react";
import { Menu, X, Calendar, Heart, UserCheck, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { MobileNav } from "./navigation/MobileNav";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, loading } = useAuth();

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-playfair font-semibold text-sage-600 flex items-center">
              <Heart className="h-6 w-6 text-pink-500 mr-2 fill-pink-500" />
              Além do Apego
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <Link to="/para-voce" className="block p-3 space-y-1 hover:bg-gray-50 rounded-md">
                        <div className="font-medium">Para Você</div>
                        <p className="text-sm text-gray-500">Encontre o apoio que você precisa</p>
                      </Link>
                      <Link to="/para-especialistas" className="block p-3 space-y-1 hover:bg-gray-50 rounded-md">
                        <div className="font-medium">Para Especialistas</div>
                        <p className="text-sm text-gray-500">Faça parte da nossa rede de profissionais</p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/blog" className="text-sage-600 hover:text-sage-800 transition-colors">
              Blog
            </Link>
            
            {loading ? (
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gray-200">
                  <span className="sr-only">Carregando</span>
                </AvatarFallback>
              </Avatar>
            ) : user ? (
              <Link to={profile?.role === 'admin' ? '/dashboard' : '/client-dashboard'} className="flex items-center gap-2 text-sage-600 hover:text-sage-800">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-sage-100 text-sage-600">
                    {profile?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-primary font-medium hidden sm:inline-block">
                  {profile?.full_name?.split(' ')[0] || 'Usuário'}
                </span>
              </Link>
            ) : (
              <Link 
                to="/auth" 
                className="text-sage-600 hover:text-sage-800 transition-colors"
              >
                Entrar
              </Link>
            )}
            
            <Link 
              to="/especialistas" 
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 flex items-center gap-2 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              Agendar Consulta
            </Link>
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

      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default Navigation;
