
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthAndLog = async () => {
      if (!loading && !user) {
        navigate("/auth", { replace: true });
        return;
      }

      if (!loading && profile && profile.role !== 'admin') {
        navigate("/client-dashboard", { replace: true });
        return;
      }

      if (!loading && user && profile?.role === 'admin') {
        try {
          await supabase.from('access_logs').insert([{
            user_id: user.id,
            page_accessed: 'dashboard',
            component_accessed: 'admin_dashboard'
          }]);
        } catch (error) {
          console.error("Erro ao registrar acesso:", error);
        }
      }
    };

    checkAuthAndLog();
  }, [user, profile, loading, navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/", { replace: true });
      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: error.message,
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl">Carregando...</div>;
  }

  if (!user || profile?.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar currentPath="/dashboard" />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Dashboard Administrativo</h1>
            <Button 
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
          <p className="text-gray-700">Bem-vindo ao painel administrativo.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
