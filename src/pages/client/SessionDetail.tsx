
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ClientSessionDetail = () => {
  const { id } = useParams();
  const [session, setSession] = useState<any>(null);
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchSessionData = async () => {
      const { data, error } = await supabase
        .from("sessoes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados da sessão",
          description: error.message,
        });
        return;
      }

      setSession(data);
      setFeedback(data.feedback || "");
    };

    if (id) {
      fetchSessionData();
    }
  }, [id, toast]);

  const handleSaveFeedback = async () => {
    try {
      const { error } = await supabase
        .from("sessoes")
        .update({ feedback })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Feedback salvo com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar feedback",
        description: error.message,
      });
    }
  };

  if (!session) return null;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Sessão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Data e Hora</p>
                <p>{format(new Date(session.data_hora), "PPp")}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Tipo de Sessão</p>
                <Badge>{session.tipo_sessao}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant={session.status === "agendado" ? "default" : "secondary"}>
                  {session.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Valor</p>
                <p>R$ {session.valor?.toFixed(2)}</p>
              </div>
            </div>

            {session.notas && (
              <div>
                <p className="text-sm font-medium mb-2">Notas da Sessão</p>
                <p className="text-gray-600">{session.notas}</p>
              </div>
            )}

            <div>
              <p className="text-sm font-medium mb-2">Seu Feedback</p>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Compartilhe suas impressões sobre a sessão..."
                rows={4}
              />
              <Button
                onClick={handleSaveFeedback}
                className="mt-2"
              >
                Salvar Feedback
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientSessionDetail;
