
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { MessagingContainer } from "@/components/messaging/MessagingContainer";
import { Loader2 } from "lucide-react";

const ClientMessages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) {
          navigate("/auth", { replace: true });
          return;
        }

        setUserId(session.user.id);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!userId) {
    return null; // Redirect handled in useEffect
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <ClientSidebar currentPath="/client/messages" />
        <SidebarInset className="overflow-auto">
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Mensagens</h1>
            <MessagingContainer currentUserId={userId} />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ClientMessages;
