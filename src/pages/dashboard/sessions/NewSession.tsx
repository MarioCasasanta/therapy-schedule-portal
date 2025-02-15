
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { useLocation } from "react-router-dom";
import { Construction } from "lucide-react";

const NewSession = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <AdminSidebar currentPath={location.pathname} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto text-center">
            <Construction className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Nova Sessão</h1>
            <p className="text-gray-600">
              Esta página está em construção. Em breve você poderá criar novas sessões por aqui.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewSession;
