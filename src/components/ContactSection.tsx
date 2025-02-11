
import { Mail, Phone, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Como funcionam as sessões?",
    answer: "As sessões são personalizadas para as suas necessidades, e você verá resultados já na primeira conversa!"
  },
  {
    question: "Preciso fazer sessões toda semana?",
    answer: "Não! O tratamento é flexível, de acordo com o seu ritmo."
  },
  {
    question: "Existe garantia sobre o tratamento?",
    answer: "Nosso compromisso é com o seu bem-estar, mas sabemos que cada pessoa é única. Por isso, vamos trabalhar juntos para alcançar o melhor resultado."
  },
  {
    question: "Você segue o caminho tradicional da psicanálise?",
    answer: "Meu método é inovador, utilizando ferramentas validadas para tratar os problemas de forma objetiva e eficaz."
  },
  {
    question: "Você trabalha com dependência emocional e TDAH?",
    answer: "Sim! Meu trabalho é focado em resolver esses e outros problemas, com um acompanhamento específico."
  }
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-sage-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-semibold text-accent mb-4">
            Agende sua sessão agora mesmo!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A transformação começa aqui! Não adie mais a sua felicidade.
            Entre em contato e vamos começar sua jornada de mudança.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-sage-500 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                <p className="text-gray-600">(11) 99999-9999</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-sage-500 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">E-mail</h3>
                <p className="text-gray-600">mario@psicanalise.com</p>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-playfair font-semibold text-accent mb-6">
                Dúvidas Frequentes
              </h3>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-start space-x-3">
                      <HelpCircle className="w-5 h-5 text-sage-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-sage-700 mb-2">{faq.question}</h4>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <form className="space-y-6 bg-white p-8 rounded-lg shadow-md">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                placeholder="Digite seu nome completo"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu melhor e-mail"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="(00) 00000-0000"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensagem
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Conte um pouco sobre o que está te trazendo aqui..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-sage-500 text-white px-6 py-3 rounded-md hover:bg-sage-600 transition-colors"
            >
              Agendar Minha Sessão
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
