
import React, { useState, useEffect } from "react";
import { addDays, format, startOfWeek, isSameDay, parseISO, isToday } from "date-fns";
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
    for (let i = 0; i < 5; i++) {
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

  // Filtra apenas os dias que têm horários disponíveis
  const availableDays = weekDays.filter(day => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    return availableSlotsByDay[formattedDate]?.length > 0;
  });

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

      {selectedDate ? (
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
      ) : (
        <div className="mt-4">
          <div className="grid grid-cols-5 gap-4">
            {weekDays.map((day) => {
              const formattedDate = format(day, 'yyyy-MM-dd');
              const daySlots = availableSlotsByDay[formattedDate] || [];
              const hasAvailableSlots = daySlots.length > 0;
              
              return (
                <Card 
                  key={day.toISOString()} 
                  className={cn(
                    "hover:border-primary transition-colors",
                    !hasAvailableSlots && "opacity-50"
                  )}
                >
                  <CardContent className="p-4">
                    <div 
                      className={cn(
                        "text-center p-2 rounded-lg",
                        isToday(day) ? "bg-primary/10" : ""
                      )}
                    >
                      <div className="text-xs font-medium">
                        {format(day, "EEE", { locale: ptBR })}
                      </div>
                      <div className={cn(
                        "text-xl font-semibold",
                        isToday(day) && "text-primary"
                      )}>
                        {format(day, "d")}
                      </div>
                    </div>
                    
                    {hasAvailableSlots ? (
                      <div className="mt-4 space-y-2">
                        {daySlots.slice(0, 5).map((slot, index) => (
                          <Button
                            key={`${day.toISOString()}-${slot.time}-${index}`}
                            variant="outline"
                            size="sm"
                            className="w-full text-sm hover:bg-primary hover:text-white"
                            onClick={() => handleTimeSelect(day, slot.time)}
                          >
                            {slot.time}
                          </Button>
                        ))}
                        {daySlots.length > 5 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => handleDaySelect(day)}
                          >
                            +{daySlots.length - 5} mais
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="mt-4 text-center text-sm text-muted-foreground">
                        Sem horários
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
