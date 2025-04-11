
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Painel do Cliente</h1>
      <p>Bem-vindo ao seu painel, {user?.email || 'Cliente'}!</p>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Suas sessões</h2>
        <p>Nenhuma sessão agendada. Agende sua primeira sessão!</p>
      </div>
    </div>
  );
};

export default ClientDashboard;
