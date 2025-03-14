
import { useState } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-playfair font-semibold text-sage-600">
              Além do Apego
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/especialistas" className="text-sage-600 hover:text-sage-800 transition-colors">
              Especialistas
            </Link>
            <a href="#services" className="text-sage-600 hover:text-sage-800 transition-colors">
              Serviços
            </a>
            <a href="#about" className="text-sage-600 hover:text-sage-800 transition-colors">
              Sobre
            </a>
            <a href="#testimonials" className="text-sage-600 hover:text-sage-800 transition-colors">
              Depoimentos
            </a>
            <a href="#contact" className="text-sage-600 hover:text-sage-800 transition-colors">
              Contato
            </a>
            <Link 
              to="/auth" 
              className="text-sage-600 hover:text-sage-800 transition-colors"
            >
              Entrar
            </Link>
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
