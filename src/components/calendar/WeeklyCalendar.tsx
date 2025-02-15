
import { useState, useEffect } from "react";
import { addDays, format, startOfWeek, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface WeeklyCalendarProps {
  onSelectSlot: (date: Date, time: string) => void;
  availableSlots?: TimeSlot[];
}

export const WeeklyCalendar = ({ onSelectSlot, availableSlots = [] }: WeeklyCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [weekDays, setWeekDays] = useState<Date[]>([]);

  useEffect(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStart, i));
    }
    setWeekDays(days);
  }, [weekStart]);

  const handlePreviousWeek = () => {
    setWeekStart(addDays(weekStart, -7));
  };

  const handleNextWeek = () => {
    setWeekStart(addDays(weekStart, 7));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
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

      <div className="grid grid-cols-8 gap-2">
        <div className="col-span-1"></div>
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className="text-center"
          >
            <div className="font-medium">
              {format(day, "EEE", { locale: ptBR })}
            </div>
            <div className={cn(
              "text-sm",
              isSameDay(day, new Date()) && "text-blue-600 font-bold"
            )}>
              {format(day, "d")}
            </div>
          </div>
        ))}

        {availableSlots
          .filter(slot => slot.available)
          .map((slot) => (
            <>
              <div key={`time-${slot.time}`} className="text-right pr-2 text-sm text-gray-600">
                {slot.time}
              </div>
              {weekDays.map((day) => (
                <Button
                  key={`${day.toISOString()}-${slot.time}`}
                  variant="outline"
                  className="h-8 text-xs hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => onSelectSlot(day, slot.time)}
                >
                  Disponível
                </Button>
              ))}
            </>
          ))}
      </div>
    </div>
  );
};
