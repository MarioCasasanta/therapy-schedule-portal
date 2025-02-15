
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

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00"
  ];

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

        {timeSlots.map((time) => (
          <>
            <div key={`time-${time}`} className="text-right pr-2 text-sm text-gray-600">
              {time}
            </div>
            {weekDays.map((day) => {
              const isAvailable = availableSlots.some(
                slot => slot.time === time && slot.available
              );
              return (
                <Button
                  key={`${day.toISOString()}-${time}`}
                  variant="outline"
                  className={cn(
                    "h-8 text-xs",
                    isAvailable
                      ? "hover:bg-blue-50 hover:text-blue-600"
                      : "opacity-50 cursor-not-allowed"
                  )}
                  disabled={!isAvailable}
                  onClick={() => isAvailable && onSelectSlot(day, time)}
                >
                  {isAvailable ? "Disponível" : "Indisponível"}
                </Button>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
};
