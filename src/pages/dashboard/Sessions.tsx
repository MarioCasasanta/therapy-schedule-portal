
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { SessionList } from "@/components/SessionList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sessions = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [sessions, setSessions] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await supabase
        .from("sessoes")
        .select(`
          *,
          profiles:cliente_id (*)
        `)
        .order("data_hora", { ascending: true });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar sessões",
          description: error.message,
        });
        return;
      }

      setSessions(data || []);
    };

    fetchSessions();
  }, [toast]);

  const handleEdit = (id: string) => {
    navigate(`/dashboard/sessions/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("sessoes")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setSessions(sessions.filter(session => session.id !== id));
      toast({
        title: "Sucesso",
        description: "Sessão excluída com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir sessão",
        description: error.message,
      });
    }
  };

  const handleSendInvite = async (id: string) => {
    try {
      const { error } = await supabase.functions.invoke('send-invite', {
        body: { session_id: id }
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Convite enviado com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar convite",
        description: error.message,
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sessões</h1>
        <Button onClick={() => navigate("/dashboard/sessions/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Sessão
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Lista de Sessões</CardTitle>
          </CardHeader>
          <CardContent>
            <SessionList
              sessions={sessions}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSendInvite={handleSendInvite}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sessions;
