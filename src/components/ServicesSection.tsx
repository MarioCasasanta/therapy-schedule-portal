
import { BadgeCheck } from "lucide-react";

const services = [
  {
    title: "Psicoterapia Individual",
    description: "Sessões personalizadas para auxiliar no seu desenvolvimento pessoal e bem-estar emocional.",
    features: ["Ambiente acolhedor", "Abordagem personalizada", "Horários flexíveis"]
  },
  {
    title: "Terapia de Casal",
    description: "Fortalecendo relacionamentos através do diálogo e compreensão mútua.",
    features: ["Mediação especializada", "Exercícios práticos", "Desenvolvimento conjunto"]
  },
  {
    title: "Constelação Familiar",
    description: "Compreenda e transforme padrões familiares através desta abordagem sistêmica.",
    features: ["Abordagem sistêmica", "Resolução de conflitos", "Cura transgeracional"]
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-semibold text-accent mb-4">
            Nossos Serviços
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Oferecemos uma variedade de serviços terapêuticos para atender suas necessidades específicas
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-sage-700">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-gray-600">
                    <BadgeCheck className="w-5 h-5 text-sage-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
