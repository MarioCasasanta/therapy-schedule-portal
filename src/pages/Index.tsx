
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="fixed bottom-4 right-4 z-50">
        <Link 
          to="/domain-info" 
          className="bg-sage-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-sage-700 transition-colors"
        >
          URLs Autorizadas
        </Link>
      </div>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
