
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SubscriptionPlanCard from "@/components/subscription/SubscriptionPlanCard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getClientPlans, SubscriptionPlan } from "@/services/subscriptionService";

const PlansPage = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await getClientPlans();
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
            userType: "client",
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
              Transforme sua jornada emocional
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Escolha o plano ideal para o seu desenvolvimento pessoal e acesse recursos exclusivos para o autoconhecimento
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-4">
              Planos para Clientes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Desbloquie ferramentas poderosas para seu crescimento emocional
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
              Benefícios de nossos planos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Veja o que você pode acessar com nossa assinatura
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Testes Psicológicos</h3>
              <p className="text-gray-600">Acesse avaliações psicológicas validadas para autoconhecimento</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-green-100 text-green-600 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dependência Emocional</h3>
              <p className="text-gray-600">Exercícios para superar a dependência em relacionamentos</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-purple-100 text-purple-600 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Terapia de Casal</h3>
              <p className="text-gray-600">Materiais para fortalecer relacionamentos e melhorar a comunicação</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-yellow-100 text-yellow-600 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exercícios de Memória</h3>
              <p className="text-gray-600">Atividades para estimular a cognição e melhorar o foco</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-playfair font-semibold text-gray-900 mb-6">
            Comece sua jornada de transformação hoje
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Invista em seu bem-estar emocional e tenha acesso a ferramentas exclusivas para seu crescimento
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PlansPage;
