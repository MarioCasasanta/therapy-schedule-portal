
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SessionCard } from './SessionCard';

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

      setSessions(data as Session[]);
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
              <SessionCard
                key={session.id}
                data_hora={session.data_hora}
                tipo_sessao={session.tipo_sessao}
                status={session.status}
                valor={session.valor}
                status_pagamento={session.status_pagamento}
                notas={session.notas}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
