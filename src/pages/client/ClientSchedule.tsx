
import { useState } from "react";
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { useLocation } from "react-router-dom";
import { WeeklyCalendar } from "@/components/calendar/WeeklyCalendar";

const ClientSchedule = () => {
  const location = useLocation();
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const handleSelectSlot = (date: Date, time: string) => {
    setSelectedDateTime(new Date(`${date.toDateString()} ${time}`));
    console.log("Selected date and time:", new Date(`${date.toDateString()} ${time}`));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Agendar Sessão</h1>
      <WeeklyCalendar
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
};

export default ClientSchedule;
