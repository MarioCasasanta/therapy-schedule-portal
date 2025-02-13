
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionForm } from "@/components/SessionForm";

const SessionDetail = () => {
  const { id } = useParams();
  const [session, setSession] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSessionData = async () => {
      const { data, error } = await supabase
        .from("sessoes")
        .select("*, profiles!sessoes_cliente_id_fkey(*)")
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
    };

    if (id) {
      fetchSessionData();
    }
  }, [id, toast]);

  const handleSubmit = async (formData: any) => {
    try {
      const { error } = await supabase
        .from("sessoes")
        .update(formData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Sessão atualizada com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar sessão",
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
          <SessionForm
            initialData={session}
            onSubmit={handleSubmit}
            onCancel={() => window.history.back()}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionDetail;
