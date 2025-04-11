
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Shield, Heart, Clock, CalendarDays, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
        { id: "3", name: "Ferramentas de autoavaliação", type: "tool", audience: "client" },
      ]
    },
    {
      id: "2",
      name: "Premium",
      description: "Para um acompanhamento mais frequente",
      price: 279.90,
      plan_type: "premium",
      benefits: [
        { id: "4", name: "3 sessões mensais", type: "session", audience: "client" },
        { id: "5", name: "Acesso à biblioteca completa", type: "content", audience: "client" },
        { id: "6", name: "Ferramentas de autoavaliação avançadas", type: "tool", audience: "client" },
        { id: "7", name: "Grupos de apoio exclusivos", type: "community", audience: "client" },
        { id: "8", name: "Atendimento prioritário", type: "support", audience: "client" },
      ]
    },
    {
      id: "3",
      name: "Família",
      description: "Para cuidar de quem você ama",
      price: 499.90,
      plan_type: "family",
      benefits: [
        { id: "9", name: "5 sessões mensais compartilháveis", type: "session", audience: "client" },
        { id: "10", name: "Acesso para até 4 membros da família", type: "access", audience: "client" },
        { id: "11", name: "Biblioteca completa para todos os membros", type: "content", audience: "client" },
        { id: "12", name: "Ferramentas para relacionamento familiar", type: "tool", audience: "client" },
        { id: "13", name: "Sessões de terapia familiar", type: "session", audience: "client" },
        { id: "14", name: "Acesso a especialistas em dinâmica familiar", type: "specialist", audience: "client" },
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
        return <Clock className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />;
      case "tool":
        return <Shield className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />;
      case "community":
        return <Heart className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" />;
      case "support":
        return <Star className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />;
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
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              Nossos Planos
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
                  className={`relative ${plan.id === highlightedPlanId ? 'shadow-lg ring-2 ring-primary/20 bg-primary/5' : 'shadow bg-white'}`}
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
                  <CardContent>
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
                  <CardFooter>
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
              Por que escolher a Além do Apego?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nosso compromisso é com seu bem-estar e desenvolvimento pessoal
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-primary/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Especialistas qualificados</h3>
              <p className="text-gray-600 text-center">Nossa equipe é formada por profissionais com ampla experiência e formação sólida em saúde mental.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-primary/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Abordagem personalizada</h3>
              <p className="text-gray-600 text-center">Entendemos que cada pessoa é única e oferecemos um cuidado adaptado às suas necessidades específicas.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-primary/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Flexibilidade de horários</h3>
              <p className="text-gray-600 text-center">Agende suas sessões em horários que funcionam para você, sem comprometer sua rotina.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              Depoimentos de clientes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Veja como nossos serviços têm ajudado pessoas em sua jornada de autoconhecimento
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <p className="text-gray-700 italic mb-6">
                "Depois de anos lutando contra a ansiedade, finalmente encontrei o suporte que precisava. As sessões foram transformadoras para minha vida."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  MF
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Maria Fernandes</p>
                  <p className="text-sm text-gray-500">Cliente há 8 meses</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl">
              <p className="text-gray-700 italic mb-6">
                "As ferramentas que aprendi me ajudaram a melhorar meus relacionamentos e a lidar com o estresse do dia a dia. Recomendo para todos."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  RS
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Ricardo Silva</p>
                  <p className="text-sm text-gray-500">Cliente há 1 ano</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl">
              <p className="text-gray-700 italic mb-6">
                "Como mãe de dois filhos, eu precisava de ajuda para equilibrar minha vida pessoal e profissional. A terapia foi essencial nesse processo."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  JC
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Juliana Costa</p>
                  <p className="text-sm text-gray-500">Cliente há 6 meses</p>
                </div>
              </div>
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
              Começar agora
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
