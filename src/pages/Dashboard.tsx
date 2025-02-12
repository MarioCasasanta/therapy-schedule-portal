
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SessionManager } from "@/components/dashboard/SessionManager";
import { CalendarManager } from "@/components/dashboard/CalendarManager";
import { startOfDay, endOfDay } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [sessions, setSessions] = useState<any[]>([]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
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
  );
};

export default Dashboard;
