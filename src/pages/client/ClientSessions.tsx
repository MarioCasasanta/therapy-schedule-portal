
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { SessionHistory } from "@/components/sessions/SessionHistory";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClientSessions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <ClientSidebar className="w-64 hidden md:block" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Histórico de Sessões</h1>
              <Button 
                variant="outline"
                onClick={() => navigate("/client-dashboard/sessions/feedback")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Adicionar Feedback
              </Button>
            </div>
            <SessionHistory />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientSessions;
