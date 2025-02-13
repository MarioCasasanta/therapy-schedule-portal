
import { Mail, Phone } from "lucide-react";

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
          <div className="space-y-8">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Phone className="w-6 h-6 text-sage-500 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                <p className="text-gray-600">(21) 99622-3993</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
