
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Construction } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

const Notifications = () => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath={location.pathname} />
        <SidebarInset className="overflow-auto">
          <div className="p-8">
            <div className="max-w-7xl mx-auto text-center">
              <Construction className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Notificações</h1>
              <p className="text-gray-600">
                Esta página está em construção. Em breve você poderá gerenciar suas notificações aqui.
              </p>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Notifications;
