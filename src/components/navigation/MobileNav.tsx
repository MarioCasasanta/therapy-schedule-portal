
import { Link } from "react-router-dom";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: any;
  profile: any;
  handleLogout: () => Promise<void>;
}

export const MobileNav = ({ isOpen, setIsOpen, user, profile, handleLogout }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-b border-gray-100">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {!user ? (
          <>
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
            <Link
              to="/profile"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Perfil
            </Link>
            <Link
              to="/client-dashboard"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Minhas Sessões
            </Link>
            {profile?.role === 'admin' && (
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard Admin
              </Link>
            )}
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
            >
              Sair
            </button>
          </>
        )}
      </div>
    </div>
  );
};
