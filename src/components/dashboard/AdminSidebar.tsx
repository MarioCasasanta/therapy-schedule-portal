
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
  FileText,
  UserCog,
  TestTube,
  PencilRuler
} from "lucide-react";
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
  userRole?: string;
}

interface MenuItem {
  icon: any;
  label: string;
  path: string;
  position?: number;
}

export function AdminSidebar({ currentPath, userRole = "admin" }: AdminSidebarProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state } = useSidebar();

  // Define menu items based on role
  const getMenuItems = () => {
    // Base items for admin
    const adminBaseItems: MenuItem[] = [
      { icon: LayoutDashboard, label: "Visão Geral", path: "/admin-dashboard" },
      { icon: Calendar, label: "Sessões", path: "/admin-sessions" },
      { icon: Bell, label: "Notificações", path: "/admin-notifications" },
      { icon: Settings, label: "Configurações", path: "/admin-settings" },
      { icon: UserCircle, label: "Meu Perfil", path: "/admin-profile" },
    ];
    
    // Base items for specialist
    const specialistBaseItems: MenuItem[] = [
      { icon: LayoutDashboard, label: "Visão Geral", path: "/specialist-dashboard" },
      { icon: Calendar, label: "Sessões", path: "/specialist-sessions" },
      { icon: Bell, label: "Notificações", path: "/specialist-notifications" },
      { icon: Settings, label: "Configurações", path: "/specialist-settings" },
      { icon: UserCircle, label: "Meu Perfil", path: "/specialist-profile" },
    ];
    
    // Admin-specific items
    const adminItems: MenuItem[] = [
      { icon: Users, label: "Clientes", path: "/admin-clients", position: 1 },
      { icon: UserCog, label: "Especialistas", path: "/admin-specialists", position: 2 },
      { icon: CreditCard, label: "Financeiro", path: "/admin-payments", position: 4 },
      { icon: FileText, label: "Blog", path: "/admin-blog-posts", position: 5 },
      { icon: TestTube, label: "Testes", path: "/admin-tests", position: 6 },
      { icon: PencilRuler, label: "Editor de Site", path: "/admin-site-editor", position: 7 },
      { icon: BarChart, label: "Relatórios", path: "/admin-reports", position: 8 },
    ];
    
    // Specialist-specific items
    const specialistItems: MenuItem[] = [
      { icon: Users, label: "Meus Clientes", path: "/specialist-clients", position: 1 },
      { icon: CreditCard, label: "Financeiro", path: "/specialist-payments", position: 4 },
      { icon: BarChart, label: "Relatórios", path: "/specialist-reports", position: 5 },
      { icon: Calendar, label: "Disponibilidade", path: "/specialist-availability", position: 6 },
    ];

    if (userRole === "admin") {
      // Combine base items with admin items
      return [...adminBaseItems, ...adminItems].sort((a, b) => {
        const posA = a.position || 999;
        const posB = b.position || 999;
        return posA - posB;
      });
    } else {
      // For specialists, combine base items with specialist items
      return [...specialistBaseItems, ...specialistItems].sort((a, b) => {
        const posA = a.position || 999;
        const posB = b.position || 999;
        return posA - posB;
      });
    }
  };

  const menuItems = getMenuItems();

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
