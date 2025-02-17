import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 Verificando autenticação...");
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

        console.log("✅ Sessão encontrada:", session.user.id);
        
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

        console.log("✅ Perfil encontrado:", profile);

        if (profile.role !== 'admin') {
          console.warn("⚠️ Usuário não é admin. Redirecionando...");
          navigate("/client-dashboard", { replace: true });
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("❌ Erro inesperado no checkAuth:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-xl">Carregando...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar currentPath="/dashboard" />
      <div className="flex-1 overflow-auto p-6">
        <h1 className="text-2xl font-semibold">Dashboard Administrativo</h1>
        <p className="text-gray-700">Bem-vindo ao painel administrativo.</p>
      </div>
    </div>
  );
};

export default Dashboard;
