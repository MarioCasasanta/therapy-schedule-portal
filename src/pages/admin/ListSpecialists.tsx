
import { useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import SpecialistsList from "@/components/admin/SpecialistsList";

export default function ListSpecialists() {
  const location = useLocation();
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar currentPath={location.pathname} />
        <SidebarInset className="overflow-auto">
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold mb-6">Lista de Especialistas</h1>
            <SpecialistsList />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
