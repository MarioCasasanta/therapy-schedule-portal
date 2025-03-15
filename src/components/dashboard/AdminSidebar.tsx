
import { useNavigate } from "react-router-dom";
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
  LogOut,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";

interface AdminSidebarProps {
  currentPath: string;
}

export function AdminSidebar({ currentPath }: AdminSidebarProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state } = useSidebar();

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
    <Sidebar>
      <SidebarHeader className="relative">
        <div className="absolute right-2 top-2 md:hidden">
          <SidebarTrigger />
        </div>
        <div className="p-2">
          <SidebarMenuButton
            variant="outline"
            className="w-full justify-start"
            onClick={handleGoToHome}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Voltar ao Site</span>
          </SidebarMenuButton>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                isActive={currentPath === item.path}
                tooltip={state === "collapsed" ? item.label : undefined}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenuButton
          variant="outline"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
