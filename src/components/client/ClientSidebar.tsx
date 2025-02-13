
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardList, 
  Receipt, 
  Bell,
  CreditCard,
  MessageSquare,
  CalendarPlus,
  History,
  FileText
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
          <h2 className="mb-2 px-4 text-lg font-semibold">Financeiro</h2>
          <div className="space-y-1">
            <NavLink to="/client-dashboard/payments">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pagamentos
                </Button>
              )}
            </NavLink>
            <NavLink to="/client-dashboard/invoices">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Faturas e Recibos
                </Button>
              )}
            </NavLink>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Comunicação</h2>
          <div className="space-y-1">
            <NavLink to="/client-dashboard/notifications">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notificações
                </Button>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
