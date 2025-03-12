
import React, { useState, useEffect } from "react";
import { addDays, format, startOfWeek, isSameDay, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { AvailabilityController } from "@/controllers/AvailabilityController";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface WeeklyCalendarProps {
  onSelectSlot: (date: Date, time: string) => void;
  initialDate?: Date;
}

export const WeeklyCalendar = ({ onSelectSlot, initialDate = new Date() }: WeeklyCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [weekStart, setWeekStart] = useState(startOfWeek(initialDate, { weekStartsOn: 0 }));
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [availableSlotsByDay, setAvailableSlotsByDay] = useState<{[key: string]: {time: string; available: boolean}[]}>({}); 
  const { toast } = useToast();

  useEffect(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStart, i));
    }
    setWeekDays(days);
  }, [weekStart]);

  useEffect(() => {
    const loadAllAvailability = async () => {
      try {
        const slotsByDay: {[key: string]: {time: string; available: boolean}[]} = {};
        
        // Load availability for each day of the week
        for (const day of weekDays) {
          const dayOfWeek = day.getDay();
          const availability = await AvailabilityController.getByDayOfWeek(dayOfWeek);
          const formattedDate = format(day, 'yyyy-MM-dd');
          
          if (availability.length > 0) {
            const slots: { time: string; available: boolean; }[] = [];
            availability.forEach(slot => {
              const [startHour] = slot.start_time.split(':');
              const [endHour] = slot.end_time.split(':');
              const start = parseInt(startHour);
              const end = parseInt(endHour);
              
              for (let hour = start; hour < end; hour++) {
                slots.push({
                  time: `${hour.toString().padStart(2, '0')}:00`,
                  available: true
                });
              }
            });
            slotsByDay[formattedDate] = slots;
          } else {
            slotsByDay[formattedDate] = [];
          }
        }
        
        setAvailableSlotsByDay(slotsByDay);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar disponibilidade",
          description: error.message,
        });
      }
    };

    if (weekDays.length > 0) {
      loadAllAvailability();
    }
  }, [weekDays, toast]);

  const handlePreviousWeek = () => {
    setWeekStart(addDays(weekStart, -7));
  };

  const handleNextWeek = () => {
    setWeekStart(addDays(weekStart, 7));
  };

  const handleDaySelect = (day: Date) => {
    setSelectedDate(day);
  };

  const handleTimeSelect = (day: Date, time: string) => {
    onSelectSlot(day, time);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousWeek}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {format(weekStart, "MMMM yyyy", { locale: ptBR })}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextWeek}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-6">
        {weekDays.map((day) => {
          const formattedDate = format(day, 'yyyy-MM-dd');
          const hasAvailableSlots = availableSlotsByDay[formattedDate]?.length > 0;
          
          return (
            <div
              key={day.toISOString()}
              onClick={() => hasAvailableSlots && handleDaySelect(day)}
              className={cn(
                "text-center p-2 rounded-lg cursor-pointer transition-colors",
                selectedDate && isSameDay(selectedDate, day) 
                  ? "bg-primary text-white" 
                  : hasAvailableSlots 
                    ? "hover:bg-primary/10"
                    : "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="text-xs font-medium">
                {format(day, "EEE", { locale: ptBR })}
              </div>
              <div className={cn(
                "text-xl font-semibold mt-1",
                isSameDay(day, new Date()) && !selectedDate && "text-primary"
              )}>
                {format(day, "d")}
              </div>
              {hasAvailableSlots && (
                <div className="mt-1 text-xs flex items-center justify-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {availableSlotsByDay[formattedDate].length} horários
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="text-md font-medium mb-4">
              Horários disponíveis para {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {availableSlotsByDay[format(selectedDate, 'yyyy-MM-dd')]?.map((slot) => (
                <Button
                  key={`${selectedDate.toISOString()}-${slot.time}`}
                  variant="outline"
                  className="h-10 text-sm hover:bg-primary hover:text-white"
                  onClick={() => handleTimeSelect(selectedDate, slot.time)}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
