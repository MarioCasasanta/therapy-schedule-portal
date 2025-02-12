
import { Calendar } from "@/components/ui/calendar";

interface CalendarManagerProps {
  selectedDate: Date;
  onSelectDate: (date: Date | undefined) => void;
}

export const CalendarManager = ({ selectedDate, onSelectDate }: CalendarManagerProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Agenda de Sessões</h2>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        className="rounded-md border"
      />
    </div>
  );
};
