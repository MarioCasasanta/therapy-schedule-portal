
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileNav = ({ isOpen, setIsOpen }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-b border-gray-100">
      <div className="px-2 pt-2 pb-3 space-y-1">
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
        <Link
          to="/auth"
          className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Entrar
        </Link>
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
