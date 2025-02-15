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
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("Dashboard: No session found, redirecting to auth");
          navigate("/auth", { replace: true });
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error || !profile) {
          console.error("Dashboard: Error fetching profile or no profile found", error);
          navigate("/auth", { replace: true });
          return;
        }

        if (profile.role !== 'admin') {
          console.log("Dashboard: User is not admin, redirecting to client dashboard");
          navigate("/client-dashboard", { replace: true });
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Dashboard: Auth check error:", error);
        navigate("/auth", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar currentPath="/dashboard" />
      <div className="flex-1 overflow-auto">
        Dashboard Content
      </div>
    </div>
  );
};

export default Dashboard;
