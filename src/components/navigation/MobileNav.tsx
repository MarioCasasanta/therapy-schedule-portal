
import { Link } from "react-router-dom";
import { Calendar, UserCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileNav = ({ isOpen, setIsOpen }: MobileNavProps) => {
  const { user, profile, loading } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-b border-gray-100">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <Link
          to="/para-voce"
          className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Para Você
        </Link>
        <Link
          to="/para-especialistas"
          className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Para Especialistas
        </Link>
        <Link
          to="/blog"
          className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Blog
        </Link>
        
        {loading ? (
          <div className="px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        ) : user ? (
          <Link
            to={profile?.role === 'admin' ? '/dashboard' : '/client-dashboard'}
            className="flex items-center gap-2 px-3 py-2 text-primary"
            onClick={() => setIsOpen(false)}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile?.avatar_url} fallback="/placeholder.svg" />
              <AvatarFallback className="bg-sage-100 text-sage-600">
                {profile?.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">
              {profile?.full_name?.split(' ')[0] || 'Usuário'}
            </span>
          </Link>
        ) : (
          <Link
            to="/auth"
            className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Entrar
          </Link>
        )}

        <Link
          to="/especialistas"
          className="block text-center bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 flex items-center justify-center gap-2 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <Calendar className="h-4 w-4" />
          Agendar Consulta
        </Link>
      </div>
    </div>
  );
};
