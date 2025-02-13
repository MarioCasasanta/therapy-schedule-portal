
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { SessionList } from "@/components/SessionList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SessionController } from "@/controllers/SessionController";
import { Session } from "@/types/session";

const Sessions = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [sessions, setSessions] = useState<Session[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await SessionController.list();
        setSessions(data);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar sessões",
          description: error.message,
        });
      }
    };

    fetchSessions();
  }, [toast]);

  const handleEdit = (session: Session) => {
    navigate(`/dashboard/sessions/${session.id}`);
  };

  const handleDelete = (session: Session) => {
    const id = session.id;
    try {
      SessionController.delete(id);
      setSessions(sessions.filter(s => s.id !== id));
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

  const handleSendInvite = (session: Session) => {
    const id = session.id;
    try {
      SessionController.sendInvite(id);
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
