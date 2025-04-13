
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Shield, Heart, Clock, CalendarDays, Star, Brain, TestTube, BarChart, Lock, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface ClientPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  plan_type: string;
  benefits?: Benefit[];
}

interface Benefit {
  id: string;
  name: string;
  description: string;
  type: string;
  audience: string;
}

const ParaVoce = () => {
  const [plans, setPlans] = useState<ClientPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // Fetch plans
        const { data: plansData, error: plansError } = await supabase
          .from("client_subscription_plans")
          .select("*")
          .order("price");

        if (plansError) {
          console.error("Error fetching plans:", plansError);
          toast({
            variant: "destructive",
            title: "Erro ao carregar planos",
            description: "Não foi possível carregar os planos disponíveis."
          });
          return;
        }

        // Fetch benefits for each plan
        const plansWithBenefits = await Promise.all(
          (plansData || []).map(async (plan) => {
            // Get the benefits linked to this plan
            const { data: planBenefitLinks, error: benefitLinksError } = await supabase
              .from("client_plan_benefits")
              .select("benefit_id")
              .eq("plan_id", plan.id);

            if (benefitLinksError) {
              console.error("Error fetching benefit links:", benefitLinksError);
              return { ...plan, benefits: [] };
            }

            if (!planBenefitLinks?.length) {
              return { ...plan, benefits: [] };
            }

            // Get the actual benefits
            const benefitIds = planBenefitLinks.map(link => link.benefit_id);
            const { data: benefitsData, error: benefitsError } = await supabase
              .from("benefits")
              .select("*")
              .in("id", benefitIds)
              .eq("audience", "client");

            if (benefitsError) {
              console.error("Error fetching benefits:", benefitsError);
              return { ...plan, benefits: [] };
            }

            return { ...plan, benefits: benefitsData || [] };
          })
        );

        setPlans(plansWithBenefits);
      } catch (error) {
        console.error("Error in fetchPlans:", error);
        toast({
          variant: "destructive",
          title: "Erro inesperado",
          description: "Ocorreu um erro ao carregar as informações dos planos."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [toast]);

  // If there's no data yet in the database, show fallback demo plans
  const demoPlans = [
    {
      id: "1",
      name: "Básico",
      description: "Para quem está começando sua jornada de autoconhecimento",
      price: 99.90,
      plan_type: "basic",
      benefits: [
        { id: "1", name: "1 sessão mensal", type: "session", audience: "client" },
        { id: "2", name: "Acesso à biblioteca básica", type: "content", audience: "client" },
        { id: "3", name: "Testes básicos de autoanálise", type: "tool", audience: "client" },
        { id: "4", name: "1 protocolo de desbloqueio emocional", type: "protocol", audience: "client" },
      ]
    },
    {
      id: "2",
      name: "Premium",
      description: "Para um acompanhamento mais frequente",
      price: 279.90,
      plan_type: "premium",
      benefits: [
        { id: "5", name: "3 sessões mensais", type: "session", audience: "client" },
        { id: "6", name: "Acesso à biblioteca completa", type: "content", audience: "client" },
        { id: "7", name: "Testes completos de autoanálise", type: "tool", audience: "client" },
        { id: "8", name: "3 protocolos de desbloqueio emocional", type: "protocol", audience: "client" },
        { id: "9", name: "Grupos de apoio exclusivos", type: "community", audience: "client" },
        { id: "10", name: "Atendimento prioritário", type: "support", audience: "client" },
      ]
    },
    {
      id: "3",
      name: "Família",
      description: "Para cuidar de quem você ama",
      price: 499.90,
      plan_type: "family",
      benefits: [
        { id: "11", name: "5 sessões mensais compartilháveis", type: "session", audience: "client" },
        { id: "12", name: "Acesso para até 4 membros da família", type: "access", audience: "client" },
        { id: "13", name: "Biblioteca completa para todos os membros", type: "content", audience: "client" },
        { id: "14", name: "Todos os protocolos de desbloqueio emocional", type: "protocol", audience: "client" },
        { id: "15", name: "Sessões de terapia familiar", type: "session", audience: "client" },
        { id: "16", name: "Testes completos para toda família", type: "tool", audience: "client" },
        { id: "17", name: "Acesso a especialistas em dinâmica familiar", type: "specialist", audience: "client" },
      ]
    }
  ];

  const displayPlans = plans.length > 0 ? plans : demoPlans;
  
  // Find which plan to highlight (usually the middle one or the "premium" one)
  const getHighlightedPlan = () => {
    const premiumPlan = displayPlans.find(p => p.plan_type === "premium");
    if (premiumPlan) return premiumPlan.id;
    
    if (displayPlans.length >= 3) {
      return displayPlans[1].id; // Middle plan
    }
    
    return null; // Don't highlight any plan
  };
  
  const highlightedPlanId = getHighlightedPlan();

  // Helper function to get benefit icon based on type
  const getBenefitIcon = (type: string) => {
    switch (type) {
      case "session":
        return <CalendarDays className="h-5 w-5 text-primary mr-2 flex-shrink-0" />;
      case "content":
        return <BookOpen className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />;
      case "tool":
        return <TestTube className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />;
      case "protocol":
        return <Brain className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />;
      case "community":
        return <Heart className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" />;
      case "support":
        return <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />;
      case "access":
        return <Lock className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />;
      case "specialist":
        return <Shield className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0" />;
      default:
        return <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
              Cuide da sua saúde mental
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Escolha o plano ideal para sua jornada de autoconhecimento e desenvolvimento pessoal
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-3">
              Assinaturas
            </span>
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              Comece sua jornada de transformação
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Invista no seu bem-estar emocional com nossos planos personalizados
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {displayPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative h-full flex flex-col ${plan.id === highlightedPlanId ? 'shadow-lg ring-2 ring-primary/20 bg-primary/5' : 'shadow bg-white'}`}
                >
                  {plan.id === highlightedPlanId && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-sm font-medium py-1 px-4 rounded-full">
                      Mais popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">R$ {plan.price.toFixed(2)}</span>
                      <span className="text-gray-500 ml-2">/mês</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {plan.benefits?.map((benefit) => (
                        <li key={benefit.id} className="flex items-start">
                          {getBenefitIcon(benefit.type)}
                          <span className="text-gray-700">
                            {benefit.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Escolher plano
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              Benefícios exclusivos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conheça as ferramentas que vão transformar sua relação consigo mesmo
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-orange-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Brain className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Protocolos de desbloqueio emocional</h3>
              <p className="text-gray-600 text-center">Metodologias exclusivas para identificar e superar padrões limitantes, desenvolvidas por nossa equipe de especialistas.</p>
              <div className="mt-4 text-center">
                <a href="https://resilience.alemdoapego.com.br" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center">
                  Conhecer protocolos <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <TestTube className="h-10 w-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Testes de autoconhecimento</h3>
              <p className="text-gray-600 text-center">Avaliações cientificamente validadas que ajudam a identificar padrões comportamentais, traços de personalidade e áreas para desenvolvimento.</p>
              <div className="mt-4 text-center">
                <a href="https://testes.alemdoapego.com.br" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center">
                  Fazer testes <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-blue-100 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <CalendarDays className="h-10 w-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Sessões terapêuticas</h3>
              <p className="text-gray-600 text-center">Encontros personalizados com nossos especialistas qualificados para acompanhar sua jornada de desenvolvimento pessoal.</p>
              <div className="mt-4 text-center">
                <Link to="/especialistas" className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center">
                  Conhecer especialistas <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              Como nossos planos funcionam
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Uma jornada completa para seu desenvolvimento pessoal e bem-estar emocional
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4 relative">
                <span className="text-primary font-bold text-xl">1</span>
                <div className="absolute hidden md:block h-1 bg-primary/20 w-full right-0 top-1/2 transform translate-x-1/2"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Escolha seu plano</h3>
              <p className="text-gray-600 text-sm">Selecione a assinatura que melhor se adapta às suas necessidades e objetivos.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4 relative">
                <span className="text-primary font-bold text-xl">2</span>
                <div className="absolute hidden md:block h-1 bg-primary/20 w-full right-0 top-1/2 transform translate-x-1/2"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Acesse as ferramentas</h3>
              <p className="text-gray-600 text-sm">Explore nossos protocolos de desbloqueio emocional e faça os testes de autoconhecimento.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4 relative">
                <span className="text-primary font-bold text-xl">3</span>
                <div className="absolute hidden md:block h-1 bg-primary/20 w-full right-0 top-1/2 transform translate-x-1/2"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Agende suas sessões</h3>
              <p className="text-gray-600 text-sm">Marque encontros com nossos especialistas conforme a disponibilidade do seu plano.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Transforme sua vida</h3>
              <p className="text-gray-600 text-sm">Acompanhe seu progresso e celebre cada conquista em sua jornada de autoconhecimento.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-6">
            Perguntas frequentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-12 text-left max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold mb-2">Posso cancelar minha assinatura a qualquer momento?</h3>
              <p className="text-gray-600">Sim, você pode cancelar sua assinatura quando quiser. O acesso aos benefícios permanece até o final do período pago.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Como funcionam as sessões com especialistas?</h3>
              <p className="text-gray-600">As sessões podem ser realizadas online ou presencialmente, dependendo da sua localização e preferência.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Os protocolos funcionam para qualquer pessoa?</h3>
              <p className="text-gray-600">Nossos protocolos são adaptáveis e foram desenvolvidos para atender diferentes perfis e necessidades emocionais.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Posso trocar de plano depois?</h3>
              <p className="text-gray-600">Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento, com os ajustes de valor proporcionais.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-6">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Invista em você mesmo e descubra como nossos serviços podem transformar sua vida
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Escolher um plano
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Falar com um especialista
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ParaVoce;
