
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  User,
  Settings,
  Calendar,
  Receipt,
  Bell,
  FileText,
  Lock,
  Mail,
  MessageSquare,
  CalendarPlus,
  History,
  Edit,
  HelpCircle,
  LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ClientSidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 border-r bg-white", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Área do Cliente</h2>
          <div className="space-y-1">
            <NavLink to="/client-dashboard" end>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Visão Geral
                </Button>
              )}
            </NavLink>
            <NavLink to="/client-dashboard/profile/edit">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Perfil
                </Button>
              )}
            </NavLink>
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Sessões</h2>
          <div className="space-y-1">
            <NavLink to="/client-dashboard/schedule">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Agendar Sessão
                </Button>
              )}
            </NavLink>
            <NavLink to="/client-dashboard/sessions">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <History className="mr-2 h-4 w-4" />
                  Histórico de Sessões
                </Button>
              )}
            </NavLink>
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Configurações</h2>
          <div className="space-y-1">
            <NavLink to="/client-dashboard/settings/profile">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start pl-8"
                >
                  <User className="mr-2 h-4 w-4" />
                  Meu Perfil
                </Button>
              )}
            </NavLink>
            <NavLink to="/client-dashboard/settings/security">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start pl-8"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Segurança
                </Button>
              )}
            </NavLink>
            <NavLink to="/client-dashboard/settings/calendar">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start pl-8"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Google Calendar
                </Button>
              )}
            </NavLink>
            <NavLink to="/client-dashboard/settings/notifications">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start pl-8"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Notificações
                </Button>
              )}
            </NavLink>
          </div>
        </div>

        <div className="px-3 py-2">
          <div className="space-y-1">
            <NavLink to="/client-dashboard/help">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Ajuda
                </Button>
              )}
            </NavLink>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => {
                // Implementar lógica de logout
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
