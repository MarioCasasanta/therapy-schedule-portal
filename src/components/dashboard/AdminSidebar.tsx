
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  BarChart,
  Bell,
  Settings,
  UserCircle,
  ArrowLeft,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdminSidebarProps {
  currentPath: string;
}

export function AdminSidebar({ currentPath }: AdminSidebarProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    { icon: LayoutDashboard, label: "Visão Geral", path: "/dashboard" },
    { icon: Users, label: "Clientes", path: "/dashboard/clients" },
    { icon: Calendar, label: "Sessões", path: "/dashboard/sessions" },
    { icon: CreditCard, label: "Financeiro", path: "/dashboard/payments" },
    { icon: BarChart, label: "Relatórios", path: "/dashboard/reports" },
    { icon: Bell, label: "Notificações", path: "/dashboard/notifications" },
    { icon: Settings, label: "Configurações", path: "/dashboard/settings" },
    { icon: UserCircle, label: "Meu Perfil", path: "/dashboard/profile" },
  ];

  const handleGoToHome = () => {
    window.location.href = "/";
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado com sucesso.",
      });
      navigate("/", { replace: true });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: error.message,
      });
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-full">
      <div className="space-y-4 flex-grow">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleGoToHome}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Site
        </Button>
        
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                currentPath === item.path && "bg-sage-50 text-sage-900"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sair
      </Button>
    </div>
  );
}
