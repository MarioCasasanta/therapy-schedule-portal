
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeeklyCalendar } from "@/components/calendar/WeeklyCalendar";

const ClientSchedule = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);

  const handleSlotSelect = (date: Date, time: string) => {
    setSelectedSlot({ date, time });
    // TODO: Implementar lógica de agendamento
  };

  const availableSlots = [
    { time: "09:00", available: true },
    { time: "10:00", available: true },
    { time: "11:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <ClientSidebar className="w-64 hidden md:block" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Agendar Sessão</h1>

            <Card>
              <CardHeader>
                <CardTitle>Selecione um Horário</CardTitle>
              </CardHeader>
              <CardContent>
                <WeeklyCalendar
                  onSelectSlot={handleSlotSelect}
                  availableSlots={availableSlots}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientSchedule;
