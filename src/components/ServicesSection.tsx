
import { Brain, Heart, Clock, Battery, Users, MessageSquare } from "lucide-react";

const services = [
  {
    title: "Depressão",
    description: "Tristeza profunda, falta de interesse e sensação de vazio? Vamos ressignificar essas emoções e te devolver o bem-estar.",
    icon: Brain
  },
  {
    title: "Ansiedade",
    description: "Medos e preocupações constantes? Juntos, vamos quebrar os ciclos negativos e te ensinar a lidar com esses sentimentos.",
    icon: Heart
  },
  {
    title: "Procrastinação",
    description: "Cansado de não conseguir agir? Vamos identificar os bloqueios e te dar ferramentas para voltar ao controle da sua vida.",
    icon: Clock
  },
  {
    title: "Burnout",
    description: "Exaustão e sobrecarga? Chegou a hora de equilibrar sua vida e lidar com o estresse de forma eficaz.",
    icon: Battery
  },
  {
    title: "Conflitos familiares",
    description: "Mágoas e desconexão? Vamos restaurar o diálogo e fortalecer os laços familiares com respeito.",
    icon: Users
  },
  {
    title: "Dificuldades no relacionamento",
    description: "Problemas de comunicação e desgaste emocional? Vamos reconstruir pontes e fortalecer os laços afetivos com empatia e compreensão.",
    icon: MessageSquare
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-semibold text-accent mb-4">
            Está passando por algum desses desafios?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Eu posso te ajudar, independentemente do seu desafio
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <service.icon className="w-10 h-10 text-sage-500 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-sage-700">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-sage-500 text-white px-8 py-3 rounded-md hover:bg-sage-600 transition-all transform hover:-translate-y-1">
            Quero superar meus desafios
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
