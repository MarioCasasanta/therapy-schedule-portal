
import { Link } from "react-router-dom";
import { User, Settings, LogOut, Calendar } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: any;
  profile: any;
  handleLogout: () => Promise<void>;
}

export const MobileNav = ({ isOpen, setIsOpen, user, profile, handleLogout }: MobileNavProps) => {
  const isAdmin = profile?.role === 'admin';
  
  if (!isOpen) return null;

  const handleLogoutClick = async () => {
    await handleLogout();
    setIsOpen(false);
  };

  return (
    <div className="md:hidden bg-white border-b border-gray-100">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {!user ? (
          <>
            <a
              href="#services"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Serviços
            </a>
            <a
              href="#about"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sobre
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Depoimentos
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contato
            </a>
            <Link
              to="/auth"
              className="block text-center bg-sage-500 text-white px-6 py-2 rounded-md hover:bg-sage-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Entrar
            </Link>
          </>
        ) : (
          <>
            {isAdmin && (
              <Link
                to="/dashboard"
                className="flex items-center px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}
            {!isAdmin && (
              <>
                <Link
                  to="/client-dashboard/profile/edit"
                  className="flex items-center px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </Link>
                <Link
                  to="/client-dashboard/sessions"
                  className="flex items-center px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Minhas Sessões</span>
                </Link>
              </>
            )}
            <button
              onClick={handleLogoutClick}
              className="flex items-center w-full px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
