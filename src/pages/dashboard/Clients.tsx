
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { AdminClientList } from "@/components/admin/AdminClientList";
import { useLocation } from "react-router-dom";

export default function DashboardClients() {
  const location = useLocation();
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar currentPath={location.pathname} />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Gestão de Clientes</h1>
        <AdminClientList />
      </div>
    </div>
  );
}
