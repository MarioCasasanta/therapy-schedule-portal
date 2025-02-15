
import { MessageSquare } from "lucide-react";

const ContactSection = () => {
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de agendar uma sessão.");
  const whatsappLink = `https://wa.me/5521996223993?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-20 bg-sage-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-semibold text-accent mb-4">
            Entre em contato agora mesmo!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A transformação começa aqui! Não adie mais a sua felicidade.
            Entre em contato e vamos começar sua jornada de mudança.
          </p>
        </div>
        <div className="max-w-lg mx-auto">
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fadeIn"
          >
            <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110" />
            <div className="text 2xs:text-sm sm:text-base md:text-lg font-medium">
              Agendar Sessão via WhatsApp
            </div>
            <div className="hidden sm:block text-sm opacity-90">
              (21) 99622-3993
            </div>
          </a>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Atendimento de Segunda a Sexta, das 9h às 18h
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
