
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { SessionList } from "@/components/SessionList";
import { Badge } from "@/components/ui/badge";

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchClientData = async () => {
      const { data: clientData, error: clientError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (clientError) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados do cliente",
          description: clientError.message,
        });
        return;
      }

      setClient(clientData);

      const { data: sessionsData } = await supabase
        .from("sessoes")
        .select("*")
        .eq("cliente_id", id)
        .order("data_hora", { ascending: false });

      setSessions(sessionsData || []);

      const { data: paymentsData } = await supabase
        .from("pagamentos")
        .select("*")
        .eq("cliente_id", id)
        .order("created_at", { ascending: false });

      setPayments(paymentsData || []);
    };

    if (id) {
      fetchClientData();
    }
  }, [id, toast]);

  if (!client) return null;

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Detalhes do Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Nome</p>
              <p>{client.full_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p>{client.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Telefone</p>
              <p>{client.telefone || "Não informado"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <Badge>{client.status || "Ativo"}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="sessions">
        <TabsList>
          <TabsTrigger value="sessions">Sessões</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Sessões</CardTitle>
            </CardHeader>
            <CardContent>
              <SessionList 
                sessions={sessions}
                onEdit={() => {}}
                onDelete={() => {}}
                onSendInvite={() => {}}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex justify-between items-center p-4 border rounded">
                    <div>
                      <p className="font-medium">
                        R$ {payment.valor.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(payment.created_at), "dd/MM/yyyy")}
                      </p>
                    </div>
                    <Badge>
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetail;
