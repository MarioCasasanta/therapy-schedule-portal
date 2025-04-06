
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";

const SubscriptionSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  
  const userType = searchParams.get('user_type');
  const planId = searchParams.get('plan_id');
  
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Sessão expirada",
            description: "Por favor, faça login novamente.",
            variant: "destructive",
          });
          navigate('/auth');
          return;
        }
        
        // Verify subscription in database
        const tableName = userType === 'therapist' ? 'therapist_subscriptions' : 'client_subscriptions';
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('user_id', session.user.id)
          .eq('plan_id', planId)
          .eq('status', 'active')
          .single();
        
        if (error || !data) {
          console.error('Subscription verification error:', error);
          toast({
            title: "Verificação de assinatura",
            description: "Estamos processando sua assinatura. Por favor, aguarde alguns instantes.",
            variant: "default",
          });
        } else {
          toast({
            title: "Assinatura confirmada",
            description: "Sua assinatura foi ativada com sucesso!",
            variant: "default",
          });
        }
        
      } catch (error) {
        console.error('Error checking subscription:', error);
        toast({
          title: "Erro na verificação",
          description: "Ocorreu um erro ao verificar sua assinatura.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    checkSubscription();
  }, [navigate, toast, planId, userType]);
  
  const redirectToDashboard = () => {
    if (userType === 'therapist') {
      navigate('/dashboard');
    } else {
      navigate('/client-dashboard');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          {loading ? (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <h2 className="text-2xl font-semibold">Processando sua assinatura</h2>
              <p className="text-gray-600">Aguarde enquanto confirmamos seu pagamento...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h2 className="text-2xl font-semibold">Assinatura realizada com sucesso!</h2>
              <p className="text-gray-600 mb-6">
                Obrigado por assinar. Agora você tem acesso a todos os benefícios do seu plano.
              </p>
              <Button onClick={redirectToDashboard} className="w-full">
                Ir para o Dashboard
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubscriptionSuccess;
