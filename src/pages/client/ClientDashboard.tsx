
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { Calendar, Receipt, Clock } from "lucide-react";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [nextSessions, setNextSessions] = useState<any[]>([]);
  const [pendingPayments, setPendingPayments] = useState<any[]>([]);

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

      // Carregar próximas sessões
      const { data: sessions } = await supabase
        .from("sessoes")
        .select("*")
        .eq("cliente_id", session.user.id)
        .gte("data_hora", new Date().toISOString())
        .order("data_hora")
        .limit(3);

      setNextSessions(sessions || []);

      // Carregar pagamentos pendentes
      const { data: payments } = await supabase
        .from("pagamentos")
        .select("*")
        .eq("cliente_id", session.user.id)
        .eq("status", "pendente")
        .order("created_at");

      setPendingPayments(payments || []);
    };

    checkUser();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <ClientSidebar className="w-64 hidden md:block" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Área do Cliente</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Próximas Sessões */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Próximas Sessões
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {nextSessions.length > 0 ? (
                    <div className="space-y-4">
                      {nextSessions.map((session) => (
                        <div key={session.id} className="flex items-center space-x-4">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">
                              {new Date(session.data_hora).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(session.data_hora).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Nenhuma sessão agendada</p>
                  )}
                </CardContent>
              </Card>

              {/* Pagamentos Pendentes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Receipt className="h-5 w-5 mr-2" />
                    Pagamentos Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingPayments.length > 0 ? (
                    <div className="space-y-4">
                      {pendingPayments.map((payment) => (
                        <div key={payment.id} className="flex justify-between items-center">
                          <span>R$ {payment.valor.toFixed(2)}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(payment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Nenhum pagamento pendente</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
