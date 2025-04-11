
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Painel do Especialista</h1>
      <p>Bem-vindo ao seu painel, {user?.email || 'Especialista'}!</p>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Seus clientes</h2>
        <p>Você ainda não possui clientes. Comece a promover seu perfil!</p>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Próximas sessões</h2>
        <p>Nenhuma sessão agendada.</p>
      </div>
    </div>
  );
};

export default Dashboard;
