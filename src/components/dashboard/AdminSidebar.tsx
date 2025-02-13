
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
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  currentPath: string;
}

export function AdminSidebar({ currentPath }: AdminSidebarProps) {
  const navigate = useNavigate();

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

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="space-y-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => navigate("/")}
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
    </div>
  );
}
