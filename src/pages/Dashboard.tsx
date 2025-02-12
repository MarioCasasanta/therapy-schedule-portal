
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { SessionForm } from "@/components/SessionForm";
import { SessionList } from "@/components/SessionList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { startOfDay, endOfDay } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [sessions, setSessions] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<any>(null);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      // Debug logs
      console.log("User ID:", session.user.id);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      // Debug logs
      console.log("Profile:", profile);
      console.log("Profile Error:", profileError);

      if (profileError || !profile) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar perfil",
          description: "Não foi possível verificar suas permissões.",
        });
        navigate("/");
        return;
      }

      if (profile.role !== "admin") {
        toast({
          variant: "destructive",
          title: "Acesso negado",
          description: "Você não tem permissão para acessar esta página.",
        });
        navigate("/");
        return;
      }
    };

    checkUser();
  }, [navigate, toast]);

  useEffect(() => {
    const fetchSessions = async () => {
      const start = startOfDay(selectedDate).toISOString();
      const end = endOfDay(selectedDate).toISOString();

      const { data, error } = await supabase
        .from("sessoes")
        .select("*")
        .gte("data_hora", start)
        .lte("data_hora", end)
        .order("data_hora");

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar as sessões.",
        });
        return;
      }

      setSessions(data || []);
    };

    fetchSessions();
  }, [selectedDate, toast]);

  const handleSubmit = async (formData: any) => {
    const session = editingSession?.id
      ? await supabase
          .from("sessoes")
          .update(formData)
          .eq("id", editingSession.id)
          .select()
          .single()
      : await supabase
          .from("sessoes")
          .insert(formData)
          .select()
          .single();

    if (session.error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível salvar a sessão.",
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: `Sessão ${editingSession ? "atualizada" : "criada"} com sucesso!`,
    });

    setIsFormOpen(false);
    setEditingSession(null);
    setSessions((prev) => [
      ...prev.filter((s) => s.id !== session.data?.id),
      session.data,
    ].sort((a, b) => new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime()));
  };

  const handleDelete = async () => {
    if (!sessionToDelete) return;

    const { error } = await supabase
      .from("sessoes")
      .delete()
      .eq("id", sessionToDelete);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível excluir a sessão.",
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Sessão excluída com sucesso!",
    });

    setSessions((prev) => prev.filter((s) => s.id !== sessionToDelete));
    setIsDeleteDialogOpen(false);
    setSessionToDelete(null);
  };

  const handleSendInvite = async (session: any) => {
    const { error } = await supabase.functions.invoke("send-invite", {
      body: { session_id: session.id },
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível enviar o convite.",
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Convite enviado com sucesso!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
            <Button onClick={() => setIsFormOpen(true)}>Nova Sessão</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Agenda de Sessões</h2>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Sessões do Dia
              </h2>
              <SessionList
                sessions={sessions}
                onEdit={(session) => {
                  setEditingSession(session);
                  setIsFormOpen(true);
                }}
                onDelete={(id) => {
                  setSessionToDelete(id);
                  setIsDeleteDialogOpen(true);
                }}
                onSendInvite={handleSendInvite}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSession ? "Editar" : "Nova"} Sessão
            </DialogTitle>
          </DialogHeader>
          <SessionForm
            initialData={editingSession}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingSession(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a sessão.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
