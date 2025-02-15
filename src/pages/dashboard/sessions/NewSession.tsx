
import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { useLocation } from "react-router-dom";
import { WeeklyCalendar } from "@/components/calendar/WeeklyCalendar";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvailabilityController } from "@/controllers/AvailabilityController";
import { Availability } from "@/types/availability";

const NewSession = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [availableSlots, setAvailableSlots] = useState<{ time: string; available: boolean; }[]>([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const data = await AvailabilityController.list();
        setAvailabilities(data);
        
        // Convertendo as disponibilidades em slots
        const slots = data.reduce((acc, availability) => {
          if (availability.is_available) {
            const [startHour] = availability.start_time.split(':');
            const [endHour] = availability.end_time.split(':');
            const start = parseInt(startHour);
            const end = parseInt(endHour);
            
            for (let hour = start; hour < end; hour++) {
              acc.push({
                time: `${hour.toString().padStart(2, '0')}:00`,
                available: true
              });
            }
          }
          return acc;
        }, [] as { time: string; available: boolean; }[]);

        setAvailableSlots(slots);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar disponibilidade",
          description: error.message,
        });
      }
    };

    fetchAvailability();
  }, [toast]);

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
