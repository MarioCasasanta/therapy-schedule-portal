
import { Check, Calendar, Users, Clock, BarChart, Star, Award, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Básico",
    price: "R$ 49,90",
    description: "Ideal para terapeutas iniciantes",
    features: [
      "Perfil completo na plataforma",
      "Até 5 agendamentos por mês",
      "Integração com Google Calendar",
      "Suporte por email",
      "Pagamentos via plataforma"
    ],
    color: "bg-white",
    buttonColor: "bg-primary hover:bg-primary/90"
  },
  {
    name: "Profissional",
    price: "R$ 99,90",
    description: "Para terapeutas estabelecidos",
    features: [
      "Tudo do plano Básico",
      "Agendamentos ilimitados",
      "Calendário na página do perfil",
      "Botão de WhatsApp no perfil",
      "Prioridade nos resultados de busca",
      "Suporte prioritário",
      "Relatórios mensais de desempenho"
    ],
    color: "bg-primary/5",
    buttonColor: "bg-primary hover:bg-primary/90",
    highlighted: true
  },
  {
    name: "Premium",
    price: "R$ 149,90",
    description: "Para práticas avançadas",
    features: [
      "Tudo do plano Profissional",
      "Perfil destacado na plataforma",
      "Selo 'Além do Apego' após certificação",
      "Exibição em campanhas de dependência emocional",
      "Calendário na página do perfil",
      "Botão de WhatsApp no perfil",
      "Ferramentas de análise avançadas",
      "Lembretes automáticos para clientes",
      "Integração com calendário",
      "Artigos destacados no blog",
      "Suporte 24/7"
    ],
    color: "bg-white",
    buttonColor: "bg-primary hover:bg-primary/90"
  }
];

const steps = [
  {
    title: "Crie sua conta",
    description: "Registre-se gratuitamente e configure seu perfil profissional",
    icon: <Users className="h-10 w-10 text-primary" />
  },
  {
    title: "Configure sua agenda",
    description: "Defina seus horários de disponibilidade e serviços oferecidos",
    icon: <Calendar className="h-10 w-10 text-primary" />
  },
  {
    title: "Receba agendamentos",
    description: "Clientes poderão agendar sessões em seus horários disponíveis",
    icon: <Clock className="h-10 w-10 text-primary" />
  },
  {
    title: "Gerencie sua prática",
    description: "Acompanhe seu desempenho e cresça com nossa plataforma",
    icon: <BarChart className="h-10 w-10 text-primary" />
  }
];

const ParaEspecialistas = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
              Expanda sua prática terapêutica
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Junte-se à plataforma Além do Apego e conecte-se com clientes que buscam seu apoio especializado
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
              Comece agora
            </Button>
          </div>
        </div>
      </div>
      
      {/* How it Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Otimize seu tempo e expanda seu alcance com nossa plataforma intuitiva
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="bg-primary/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Plans Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              Planos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Escolha o plano ideal para o seu estágio profissional
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.color} ${plan.highlighted ? 'shadow-lg ring-2 ring-primary/20' : 'shadow'}`}>
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-sm font-medium py-1 px-4 rounded-full">
                    Mais popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-2">/mês</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => {
                      // Add special icons for highlight features
                      let icon = <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />;
                      
                      if (feature.includes("Selo 'Além do Apego'")) {
                        icon = <Award className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />;
                      } else if (feature.includes("Perfil destacado")) {
                        icon = <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />;
                      } else if (feature.includes("WhatsApp")) {
                        icon = <Phone className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />;
                      } else if (feature.includes("Integração com Google Calendar") || feature.includes("Calendário na página")) {
                        icon = <Calendar className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />;
                      }
                      
                      return (
                        <li key={i} className="flex items-start">
                          {icon}
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={`w-full ${plan.buttonColor}`}>
                    Selecionar plano
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials - For specialists section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              O que dizem nossos especialistas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Veja como nossa plataforma tem ajudado terapeutas a crescerem
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <p className="text-gray-700 italic mb-6">
                "A plataforma simplificou meu processo de agendamento e me ajudou a me conectar com mais clientes. Minha agenda está sempre cheia agora."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  DR
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Dra. Roberta Almeida</p>
                  <p className="text-sm text-gray-500">Psicoterapeuta, Rio de Janeiro</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <p className="text-gray-700 italic mb-6">
                "O sistema de pagamentos integrado me poupa tempo e esforço. Os relatórios me ajudam a entender melhor o crescimento da minha prática."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  FM
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Dr. Felipe Mendes</p>
                  <p className="text-sm text-gray-500">Psicanalista, São Paulo</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <p className="text-gray-700 italic mb-6">
                "Desde que me juntei à plataforma, pude me concentrar mais na terapia e menos na administração. Vale cada centavo do investimento."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  CL
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Dra. Carolina Lima</p>
                  <p className="text-sm text-gray-500">Psicóloga, Belo Horizonte</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-6">
            Pronto para transformar sua prática terapêutica?
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Junte-se a centenas de terapeutas que estão expandindo seus horizontes com a Além do Apego
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Criar minha conta
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Saiba mais
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ParaEspecialistas;
