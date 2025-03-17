
import { useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { ListaClientes } from "@/components/admin/ListaClientes";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function GerenciarClientes() {
  const location = useLocation();
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar currentPath={location.pathname} />
        <SidebarInset className="overflow-auto">
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold mb-6">Gestão de Clientes</h1>
            <ListaClientes />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
