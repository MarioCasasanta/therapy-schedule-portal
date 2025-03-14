
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    text: "O método do Mario me ajudou a superar a ansiedade que me paralisava. Logo na primeira sessão já senti a diferença!",
    role: "Cliente há 2 meses",
    rating: 5
  },
  {
    name: "João Santos",
    text: "Finalmente consegui entender os padrões que me impediam de progredir. A abordagem é única e os resultados são reais.",
    role: "Cliente há 3 meses",
    rating: 5
  },
  {
    name: "Ana Costa",
    text: "As sessões mudaram minha vida. O Mario tem um dom especial para nos ajudar a ver as coisas de uma nova perspectiva.",
    role: "Cliente há 1 mês",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-semibold text-accent mb-4">
            Depoimentos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Veja o que nossos clientes dizem sobre sua jornada terapêutica
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">{testimonial.text}</p>
              <div>
                <div className="font-semibold text-sage-700">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
