
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SessionManager } from "@/components/dashboard/SessionManager";
import { CalendarManager } from "@/components/dashboard/CalendarManager";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { startOfDay, endOfDay } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Session } from "@/types/session";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [sessions, setSessions] = useState<Session[]>([]);
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileError || !profile) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar perfil",
          description: "Não foi possível verificar suas permissões.",
        });
        navigate("/");
        return;
      }

      if (profile.role !== "admin") {
        toast({
          variant: "destructive",
          title: "Acesso negado",
          description: "Você não tem permissão para acessar esta página.",
        });
        navigate("/");
        return;
      }
    };

    checkUser();
  }, [navigate, toast]);

  useEffect(() => {
    const fetchSessions = async () => {
      const start = startOfDay(selectedDate).toISOString();
      const end = endOfDay(selectedDate).toISOString();

      const { data, error } = await supabase
        .from("sessoes")
        .select("*")
        .gte("data_hora", start)
        .lte("data_hora", end)
        .order("data_hora");

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar as sessões.",
        });
        return;
      }

      setSessions(data || []);
    };

    fetchSessions();
  }, [selectedDate, toast]);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("tipo_usuario", "cliente")
        .order("full_name");

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar os clientes.",
        });
        return;
      }

      setClients(data || []);
    };

    fetchClients();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <AdminSidebar currentPath={location.pathname} />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-semibold">{sessions.length}</div>
                  <div className="text-sm text-gray-500">Sessões Hoje</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-semibold">{clients.length}</div>
                  <div className="text-sm text-gray-500">Total de Clientes</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-semibold">
                    {sessions.filter(s => s.status === "concluido").length}
                  </div>
                  <div className="text-sm text-gray-500">Sessões Concluídas</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CalendarManager
                selectedDate={selectedDate}
                onSelectDate={(date) => date && setSelectedDate(date)}
              />
              <SessionManager
                selectedDate={selectedDate}
                sessions={sessions}
                setSessions={setSessions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
