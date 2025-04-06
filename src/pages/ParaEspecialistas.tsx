
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { 
  Clock, BarChart, Calendar, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SubscriptionPlanCard from "@/components/subscription/SubscriptionPlanCard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getTherapistPlans, SubscriptionPlan } from "@/services/subscriptionService";

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
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await getTherapistPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast({
          title: "Erro ao carregar planos",
          description: "Não foi possível carregar os planos de assinatura.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlans();
  }, [toast]);

  const handleSelectPlan = async (plan: SubscriptionPlan) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Login necessário",
          description: "Por favor, faça login para assinar um plano.",
          variant: "default"
        });
        navigate("/auth");
        return;
      }
      
      // Call Supabase Edge Function to create Stripe checkout
      const response = await fetch(
        "https://mwsogytsctdjuijgcpbn.supabase.co/functions/v1/create-subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`
          },
          body: JSON.stringify({
            planId: plan.id,
            userType: "therapist",
            price: plan.price,
            planName: plan.name
          })
        }
      );
      
      const data = await response.json();
      
      if (data.error) {
        toast({
          title: "Erro",
          description: data.error,
          variant: "destructive"
        });
        return;
      }
      
      if (data.url) {
        window.location.href = data.url;
      }
      
    } catch (error) {
      console.error("Error selecting plan:", error);
      toast({
        title: "Erro ao processar assinatura",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive"
      });
    }
  };

  // Format the plans and benefits for display
  const formatPlansForDisplay = () => {
    return plans.map(plan => {
      // Find the "professional" plan to highlight
      const isHighlighted = plan.plan_type === 'professional';
      
      // Format benefits for display
      const formattedBenefits = plan.benefits?.map(benefit => ({
        id: benefit.id,
        name: benefit.name,
        available: true,
        description: benefit.description
      })) || [];
      
      return {
        id: plan.id,
        name: plan.name,
        description: plan.description || '',
        price: plan.price,
        benefits: formattedBenefits,
        isHighlighted
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
              Expanda sua prática terapêutica
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Junte-se à plataforma Além do Apego e conecte-se com clientes que buscam seu apoio especializado
            </p>
            <Button 
              onClick={() => navigate('/cadastro-especialista')}
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
              Comece agora
            </Button>
          </div>
        </div>
      </div>
      
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
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              Planos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Escolha o plano ideal para o seu estágio profissional
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center my-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {formatPlansForDisplay().map((plan, index) => (
                <SubscriptionPlanCard
                  key={plan.id}
                  name={plan.name}
                  description={plan.description}
                  price={plan.price}
                  benefits={plan.benefits}
                  isHighlighted={plan.isHighlighted}
                  onSelectPlan={() => handleSelectPlan(plans[index])}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
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
      
      <section className="py-16 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-6">
            Pronto para transformar sua prática terapêutica?
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Junte-se a centenas de terapeutas que estão expandindo seus horizontes com a Além do Apego
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => navigate('/cadastro-especialista')}
              size="lg" 
              className="bg-primary hover:bg-primary/90">
              Criar minha conta
            </Button>
            <Button 
              onClick={() => {
                const plansSection = document.querySelector('section:nth-of-type(2)');
                plansSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10">
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
