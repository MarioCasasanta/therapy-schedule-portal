
import { Link } from "react-router-dom";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileNav = ({ isOpen, setIsOpen }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-b border-gray-100">
      <div className="px-2 pt-2 pb-3 space-y-1">
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
      </div>
    </div>
  );
};
