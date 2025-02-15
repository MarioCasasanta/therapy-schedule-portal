
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { Construction } from "lucide-react";

const SessionFeedback = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <ClientSidebar className="w-64 hidden md:block" />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto text-center">
            <Construction className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Feedback da Sessão</h1>
            <p className="text-gray-600">
              Esta página está em construção. Em breve você poderá deixar seu feedback sobre as sessões aqui.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SessionFeedback;
