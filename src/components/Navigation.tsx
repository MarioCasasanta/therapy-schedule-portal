
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-playfair font-semibold text-sage-600">
              Tranquil Mind
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
              className="bg-sage-500 text-white px-6 py-2 rounded-md hover:bg-sage-600 transition-colors"
            >
              Agendar Agora
            </Link>
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
              Agendar Agora
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
