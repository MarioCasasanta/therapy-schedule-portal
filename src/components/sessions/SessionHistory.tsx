
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock, CreditCard } from 'lucide-react';

interface Session {
  id: string;
  data_hora: string;
  tipo_sessao: string;
  status: string;
  valor: number;
  status_pagamento: string;
  notas?: string;
}

export const SessionHistory = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sessoes')
        .select('*')
        .order('data_hora', { ascending: false });

      if (error) throw error;

      setSessions(data || []);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar o histórico de sessões.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finalizado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'text-green-600';
      case 'pendente':
        return 'text-yellow-600';
      default:
        return 'text-red-600';
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Sessões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                          {format(new Date(session.data_hora), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>
                          {format(new Date(session.data_hora), "HH:mm", { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <span className={getPaymentStatusColor(session.status_pagamento)}>
                          R$ {session.valor.toFixed(2)} - {session.status_pagamento}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {session.tipo_sessao}
                      </span>
                    </div>
                  </div>
                  {session.notas && (
                    <div className="mt-4 text-sm text-gray-600">
                      <p>{session.notas}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
