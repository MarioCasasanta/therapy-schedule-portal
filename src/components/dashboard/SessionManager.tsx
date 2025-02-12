
import { useState } from "react";
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

interface SessionManagerProps {
  selectedDate: Date;
  sessions: any[];
  setSessions: (sessions: any[]) => void;
}

export const SessionManager = ({ selectedDate, sessions, setSessions }: SessionManagerProps) => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<any>(null);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

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
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Sessões do Dia
        </h2>
        <Button onClick={() => setIsFormOpen(true)}>Nova Sessão</Button>
      </div>

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
