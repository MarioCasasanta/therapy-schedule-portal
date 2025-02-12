
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { SessionList } from "@/components/SessionList";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: userProfile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileError || !userProfile) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar perfil",
          description: "Não foi possível verificar suas informações.",
        });
        navigate("/");
        return;
      }

      setProfile(userProfile);
    };

    checkUser();
  }, [navigate, toast]);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!profile) return;

      const { data, error } = await supabase
        .from("sessoes")
        .select("*")
        .or(`cliente_id.eq.${profile.id},guest_email.eq.${profile.email}`)
        .order("data_hora");

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar suas sessões.",
        });
        return;
      }

      setSessions(data || []);
    };

    fetchSessions();
  }, [profile, toast]);

  const handlePayment = async (session: any) => {
    // Por enquanto, apenas simular o pagamento
    const { error } = await supabase
      .from("sessoes")
      .update({
        status_pagamento: "pago",
        data_pagamento: new Date().toISOString(),
      })
      .eq("id", session.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível processar o pagamento.",
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Pagamento registrado com sucesso!",
    });

    // Atualizar a lista de sessões
    setSessions((prev) =>
      prev.map((s) =>
        s.id === session.id
          ? {
              ...s,
              status_pagamento: "pago",
              data_pagamento: new Date().toISOString(),
            }
          : s
      )
    );
  };

  const groupSessionsByMonth = (sessions: any[]) => {
    return sessions.reduce((acc, session) => {
      const monthYear = format(new Date(session.data_hora), "MMMM yyyy", {
        locale: ptBR,
      });
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(session);
      return acc;
    }, {});
  };

  const groupedSessions = groupSessionsByMonth(sessions);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Minhas Sessões</h1>
          </div>

          <div className="space-y-8">
            {Object.entries(groupedSessions).map(([monthYear, monthSessions]: [string, any[]]) => (
              <div key={monthYear} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 capitalize">
                  {monthYear}
                </h2>
                <SessionList
                  sessions={monthSessions}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onSendInvite={() => {}}
                  isClientView
                  onPayment={handlePayment}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
