
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { SessionList } from "@/components/SessionList";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SessionController } from "@/controllers/SessionController";
import { Session } from "@/types/session";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

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
    SessionController.delete(session.id)
      .then(() => {
        setSessions(sessions.filter(s => s.id !== session.id));
        toast({
          title: "Sucesso",
          description: "Sessão excluída com sucesso.",
        });
      })
      .catch((error: any) => {
        toast({
          variant: "destructive",
          title: "Erro ao excluir sessão",
          description: error.message,
        });
      });
  };

  const handleSendInvite = (session: Session) => {
    SessionController.sendInvite(session.id)
      .then(() => {
        toast({
          title: "Sucesso",
          description: "Convite enviado com sucesso.",
        });
      })
      .catch((error: any) => {
        toast({
          variant: "destructive",
          title: "Erro ao enviar convite",
          description: error.message,
        });
      });
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath="/dashboard/sessions" />
        <SidebarInset className="overflow-auto">
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Sessões</h1>
              <div className="space-x-2">
                <Button onClick={() => navigate("/dashboard/availability")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Gerenciar Disponibilidade
                </Button>
                <Button onClick={() => navigate("/dashboard/sessions/new")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Sessão
                </Button>
              </div>
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Sessions;
