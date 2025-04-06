
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, HeartHandshake, Sparkles, FlaskConical, Brain as BrainIcon } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SubscriptionPlanCard from "@/components/subscription/SubscriptionPlanCard";
import BenefitCard from "@/components/subscription/BenefitCard";
import { getClientPlans, SubscriptionPlan } from '@/services/subscriptionService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const ParaVoce = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const clientPlans = await getClientPlans();
        setPlans(clientPlans);
      } catch (error) {
        console.error('Error fetching plans:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os planos. Tente novamente mais tarde.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [toast]);

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (!user) {
      toast({
        title: 'Atenção',
        description: 'Você precisa estar logado para assinar um plano.',
      });
      navigate('/auth');
      return;
    }
    
    // Here you would redirect to checkout or handle subscription
    navigate(`/subscription/checkout?plan=${plan.id}&type=client`);
  };

  const benefits = [
    {
      title: 'Testes Psicológicos',
      description: 'Acesse avaliações psicológicas para autoconhecimento e desenvolvimento pessoal.',
      icon: <Brain className="h-5 w-5 text-primary" />
    },
    {
      title: 'Exercícios de Dependência Emocional',
      description: 'Atividades práticas para desenvolver autonomia emocional e relacionamentos mais saudáveis.',
      icon: <HeartHandshake className="h-5 w-5 text-primary" />
    },
    {
      title: 'Exercícios de Casal',
      description: 'Dinâmicas para melhorar a comunicação e fortalecer o relacionamento com seu parceiro(a).',
      icon: <Sparkles className="h-5 w-5 text-primary" />
    },
    {
      title: 'Testes e Exercícios de Memória',
      description: 'Jogos e atividades para estimular funções cognitivas e melhorar a memória.',
      icon: <BrainIcon className="h-5 w-5 text-primary" />
    },
    {
      title: 'Testes de Relacionamento',
      description: 'Avaliações para compreender dinâmicas do seu relacionamento e identificar pontos de melhoria.',
      icon: <FlaskConical className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-24">
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Planos para Você</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comece sua jornada de autoconhecimento e desenvolvimento pessoal com nossos planos feitos para indivíduos.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[1, 2, 3].map(index => (
                  <div key={index} className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {plans.map((plan, index) => (
                  <SubscriptionPlanCard
                    key={plan.id}
                    name={plan.name}
                    description={plan.description || ''}
                    price={plan.price}
                    benefits={(plan.benefits || []).map(benefit => ({
                      id: benefit.id,
                      name: benefit.name,
                      available: true
                    }))}
                    isHighlighted={plan.plan_type === 'professional'}
                    onSelectPlan={() => handleSelectPlan(plan)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Benefícios para Você</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore todas as ferramentas e recursos disponíveis para ajudar em seu desenvolvimento pessoal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <BenefitCard
                  key={index}
                  title={benefit.title}
                  description={benefit.description}
                  icon={benefit.icon}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Perguntas Frequentes</h2>
            <div className="max-w-3xl mx-auto text-left">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">O que está incluso nos planos?</h3>
                <p className="text-gray-600">
                  Cada plano dá acesso a diferentes recursos de autoconhecimento e desenvolvimento pessoal, incluindo 
                  testes psicológicos, exercícios de dependência emocional, atividades para casais e mais.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Posso cancelar meu plano a qualquer momento?</h3>
                <p className="text-gray-600">
                  Sim, você pode cancelar sua assinatura a qualquer momento. O acesso aos recursos continuará disponível 
                  até o final do período pago.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Os testes psicológicos substituem o acompanhamento profissional?</h3>
                <p className="text-gray-600">
                  Não. Nossos testes são ferramentas de autoconhecimento e não substituem o diagnóstico ou tratamento por um 
                  profissional qualificado de saúde mental.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ParaVoce;
