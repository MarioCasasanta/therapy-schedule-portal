
import { useState } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { useLocation } from "react-router-dom";
import { WeeklyCalendar } from "@/components/calendar/WeeklyCalendar";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewSession = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  // Simular horários disponíveis - isso deve vir da API
  const availableSlots = [
    { time: "09:00", available: true },
    { time: "10:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: true },
  ];

  const handleSlotSelect = (date: Date, time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);
    setSelectedDateTime(dateTime);

    toast({
      title: "Horário selecionado",
      description: `Você selecionou ${time} do dia ${date.toLocaleDateString()}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <AdminSidebar currentPath={location.pathname} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Nova Sessão</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Selecione um horário disponível</CardTitle>
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

export default NewSession;
