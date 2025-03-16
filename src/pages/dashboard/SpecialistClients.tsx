
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SpecialistClientList } from "@/components/specialist/SpecialistClientList";
import { useAuth } from "@/hooks/useAuth";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function SpecialistClients() {
  const location = useLocation();
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (profile) {
      setLoading(false);
    }
  }, [profile]);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar currentPath={location.pathname} userRole="especialista" />
        <SidebarInset className="overflow-auto">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Meus Clientes</h1>
            <SpecialistClientList especialistaId={user?.id} />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
