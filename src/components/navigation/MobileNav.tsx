
import { Link } from "react-router-dom";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: any;
  handleLogout: () => Promise<void>;
}

export const MobileNav = ({ isOpen, setIsOpen, user, handleLogout }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
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
          <>
            <Link
              to="/perfil"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Perfil
            </Link>
            <Link
              to="/minhas-sessoes"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Minhas Sessões
            </Link>
            <Link
              to="/configuracoes"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Configurações
            </Link>
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
  );
};
