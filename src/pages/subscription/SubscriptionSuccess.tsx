
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [subscriptionType, setSubscriptionType] = useState<string>('');
  
  useEffect(() => {
    // Parse query parameters to get subscription information
    const params = new URLSearchParams(location.search);
    const type = params.get('type') || '';
    setSubscriptionType(type);
    
    // Check if user is authenticated
    if (!user) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para ver esta página.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, navigate, location, toast]);
  
  const goToAccount = () => {
    if (subscriptionType === 'therapist') {
      navigate('/dashboard');
    } else {
      navigate('/dashboard/cliente');
    }
  };
  
  const goHome = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-semibold">Assinatura realizada com sucesso!</h2>
            <p className="text-gray-600 mb-6">
              Parabéns! Sua assinatura foi processada com sucesso.
              Agora você tem acesso a todos os recursos do plano contratado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button onClick={goToAccount} className="w-full">
                Acessar minha conta
              </Button>
              <Button onClick={goHome} variant="outline" className="w-full">
                Voltar para início
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubscriptionSuccess;
