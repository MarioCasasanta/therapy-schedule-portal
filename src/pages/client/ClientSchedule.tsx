
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { WeeklyCalendar } from "@/components/calendar/WeeklyCalendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ClientSchedule = () => {
  const location = useLocation();
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [confirmStep, setConfirmStep] = useState(false);
  const { toast } = useToast();

  const handleSelectSlot = (date: Date, time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);
    setSelectedDateTime(dateTime);
    setConfirmStep(true);
  };

  const handleConfirmSession = () => {
    // Aqui poderia integrar com a API para confirmação da sessão
    toast({
      title: "Sessão agendada com sucesso!",
      description: `Sua sessão foi agendada para ${format(selectedDateTime!, "PPp", { locale: ptBR })}`,
    });
    
    // Reset estado
    setSelectedDateTime(null);
    setConfirmStep(false);
  };

  const handleBack = () => {
    setConfirmStep(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Agendar Sessão</h1>
      
      {!confirmStep ? (
        <Card>
          <CardHeader>
            <CardTitle>Selecione uma data e horário</CardTitle>
            <CardDescription>
              Escolha um dos horários disponíveis para sua sessão
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WeeklyCalendar
              onSelectSlot={handleSelectSlot}
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Confirmar Agendamento</CardTitle>
            <CardDescription>
              Verifique os detalhes do seu agendamento antes de confirmar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-primary/10 p-4 rounded-lg flex items-start gap-4">
                <Clock className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium text-lg">
                    {format(selectedDateTime!, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                  </h3>
                  <p className="text-gray-600">
                    {format(selectedDateTime!, "p", { locale: ptBR })}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 justify-end">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <Button onClick={handleConfirmSession}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmar Agendamento
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientSchedule;
