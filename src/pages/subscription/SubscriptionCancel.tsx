
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

const SubscriptionCancel = () => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate('/para-especialistas');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-20">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="h-16 w-16 text-red-500" />
            <h2 className="text-2xl font-semibold">Assinatura cancelada</h2>
            <p className="text-gray-600 mb-6">
              O processo de assinatura foi cancelado. Você não foi cobrado.
              Se precisar de ajuda, entre em contato conosco.
            </p>
            <Button onClick={goBack} className="w-full">
              Voltar para os planos
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubscriptionCancel;
