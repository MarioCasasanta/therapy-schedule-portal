
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("admin");

  const logAccess = useCallback(async (userId: string) => {
    try {
      await supabase.from('access_logs').insert([{
        user_id: userId,
        page_accessed: 'dashboard',
        component_accessed: 'admin_dashboard'
      }]);
    } catch (error) {
      console.error("Erro ao registrar acesso:", error);
    }
  }, []);

  useEffect(() => {
    let isAuthenticated = false;

    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("❌ Erro ao obter sessão:", sessionError);
          setIsLoading(false);
          return;
        }

        if (!session?.user) {
          console.warn("⚠️ Nenhum usuário autenticado. Redirecionando...");
          navigate("/auth", { replace: true });
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError || !profile) {
          console.error("❌ Erro ao buscar perfil do usuário:", profileError);
          navigate("/auth", { replace: true });
          return;
        }

        setUserRole(profile.role);

        // Redirect based on user role
        if (profile.role === 'admin') {
          navigate("/admin", { replace: true });
          return;
        } else if (profile.role === 'especialista') {
          // Stay on this page for specialists
        } else {
          console.warn("⚠️ Usuário não é admin ou especialista. Redirecionando...");
          navigate("/client-dashboard", { replace: true });
          return;
        }

        if (!isAuthenticated) {
          await logAccess(session.user.id);
          isAuthenticated = true;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("❌ Erro inesperado no checkAuth:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, logAccess]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-xl">Carregando...</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath="/dashboard" userRole={userRole} />
        <SidebarInset className="overflow-auto">
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Dashboard do Especialista</h1>
            <p className="text-gray-700">Bem-vindo ao seu painel de controle.</p>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
