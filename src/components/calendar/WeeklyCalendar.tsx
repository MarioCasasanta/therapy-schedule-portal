
import React, { useState, useEffect } from "react";
import { addDays, format, startOfWeek, isSameDay, parseISO, isSameMonth } from "date-fns";
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
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [visibleDays, setVisibleDays] = useState<Date[]>([]);
  const [availableSlotsByDay, setAvailableSlotsByDay] = useState<{[key: string]: {time: string; available: boolean}[]}>({}); 
  const { toast } = useToast();

  // Inicializa os 5 dias visíveis a partir da data atual
  useEffect(() => {
    const days = [];
    for (let i = 0; i < 5; i++) {
      days.push(addDays(currentDate, i));
    }
    setVisibleDays(days);
  }, [currentDate]);

  useEffect(() => {
    const loadAllAvailability = async () => {
      try {
        const slotsByDay: {[key: string]: {time: string; available: boolean}[]} = {};
        
        // Load availability for each visible day
        for (const day of visibleDays) {
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

    if (visibleDays.length > 0) {
      loadAllAvailability();
    }
  }, [visibleDays, toast]);

  const handlePreviousPage = () => {
    setCurrentDate(addDays(currentDate, -5));
  };

  const handleNextPage = () => {
    setCurrentDate(addDays(currentDate, 5));
  };

  const handleDaySelect = (day: Date) => {
    setSelectedDate(day);
  };

  const handleTimeSelect = (day: Date, time: string) => {
    onSelectSlot(day, time);
  };

  // Filtra apenas os dias que têm horários disponíveis
  const availableDays = visibleDays.filter(day => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    return availableSlotsByDay[formattedDate]?.length > 0;
  });

  // Organiza os slots em colunas para exibição
  const organizeAvailableSlotsInColumns = (slots: {time: string; available: boolean}[]) => {
    const columns = [[], [], []]; // 3 colunas
    
    slots.forEach((slot, index) => {
      const columnIndex = index % 3;
      columns[columnIndex].push(slot);
    });
    
    return columns;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousPage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {format(currentDate, "MMMM yyyy", { locale: ptBR })}
          {!isSameMonth(currentDate, visibleDays[visibleDays.length - 1]) && 
            ` - ${format(visibleDays[visibleDays.length - 1], "MMMM yyyy", { locale: ptBR })}`}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextPage}
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
              {availableSlotsByDay[format(selectedDate, 'yyyy-MM-dd')]?.map((slot, index) => (
                <Button
                  key={`${format(selectedDate, 'yyyy-MM-dd')}-${slot.time}-${index}`}
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
          <h3 className="text-md font-medium mb-4">Selecione um dia para ver os horários disponíveis</h3>
          
          {availableDays.length > 0 ? (
            <div className="grid grid-cols-5 gap-4">
              {visibleDays.map((day) => {
                const formattedDate = format(day, 'yyyy-MM-dd');
                const slots = availableSlotsByDay[formattedDate] || [];
                const hasAvailableSlots = slots.length > 0;
                const isToday = isSameDay(day, new Date());
                
                return (
                  <div 
                    key={formattedDate}
                    className={cn(
                      "rounded-lg border transition-colors",
                      hasAvailableSlots 
                        ? "hover:border-primary cursor-pointer" 
                        : "opacity-50 cursor-not-allowed",
                      isToday && "border-primary/50"
                    )}
                    onClick={() => hasAvailableSlots && handleDaySelect(day)}
                  >
                    <div className={cn(
                      "p-3 text-center border-b",
                      isToday && "bg-primary/10"
                    )}>
                      <div className="text-xs font-medium uppercase">
                        {format(day, "EEE", { locale: ptBR })}
                      </div>
                      <div className="text-xl font-semibold mt-1">
                        {format(day, "d")}
                      </div>
                    </div>

                    <div className="p-3">
                      {hasAvailableSlots ? (
                        <>
                          <div className="text-xs text-center mb-2 flex items-center justify-center text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {slots.length} horários
                          </div>
                          <div className="space-y-1">
                            {slots.slice(0, 3).map((slot, idx) => (
                              <div 
                                key={`${formattedDate}-preview-${idx}`} 
                                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded text-center"
                              >
                                {slot.time}
                              </div>
                            ))}
                            {slots.length > 3 && (
                              <div className="text-xs bg-gray-100 px-2 py-1 rounded text-center">
                                +{slots.length - 3} mais
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="text-xs text-center text-muted-foreground p-4">
                          Indisponível
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Não há horários disponíveis para este período. 
              Tente verificar outros dias.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
