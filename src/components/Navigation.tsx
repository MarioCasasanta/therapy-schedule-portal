
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-playfair font-semibold text-sage-600">Tranquil Mind</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sage-600 hover:text-sage-800 transition-colors">
              Services
            </a>
            <a href="#about" className="text-sage-600 hover:text-sage-800 transition-colors">
              About
            </a>
            <a href="#testimonials" className="text-sage-600 hover:text-sage-800 transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="text-sage-600 hover:text-sage-800 transition-colors">
              Contact
            </a>
            <button className="bg-sage-500 text-white px-6 py-2 rounded-md hover:bg-sage-600 transition-colors">
              Schedule Now
            </button>
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
              Services
            </a>
            <a
              href="#about"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-sage-600 hover:text-sage-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <button className="w-full text-center bg-sage-500 text-white px-6 py-2 rounded-md hover:bg-sage-600 transition-colors">
              Schedule Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
