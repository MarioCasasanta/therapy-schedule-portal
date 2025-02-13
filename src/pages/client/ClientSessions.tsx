
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { SessionHistory } from "@/components/sessions/SessionHistory";

const ClientSessions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <ClientSidebar className="w-64 hidden md:block" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Histórico de Sessões</h1>
            <SessionHistory />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientSessions;
