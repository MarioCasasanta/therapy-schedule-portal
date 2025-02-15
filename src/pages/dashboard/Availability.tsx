
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AvailabilityController } from "@/controllers/AvailabilityController";
import { Availability } from "@/types/availability";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { useLocation } from "react-router-dom";

const DAYS_OF_WEEK = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
];

const AvailabilityPage = () => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const data = await AvailabilityController.list();
        const availability = DAYS_OF_WEEK.map((_, index) => {
          const existing = data.find(a => a.day_of_week === index);
          return existing || {
            id: crypto.randomUUID(),
            day_of_week: index,
            start_time: "09:00",
            end_time: "17:00",
            is_available: false,
            interval_minutes: 60,
            max_concurrent_sessions: 1,
            exceptions: []
          } as Availability;
        });
        setAvailabilities(availability);
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

  const handleSave = async (availability: Availability) => {
    try {
      const updatedAvailability = await AvailabilityController.update(availability);
      setAvailabilities(availabilities.map(a => 
        a.id === updatedAvailability.id ? updatedAvailability : a
      ));
      toast({
        title: "Sucesso",
        description: "Disponibilidade atualizada com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar disponibilidade",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <AdminSidebar currentPath={location.pathname} />
        <main className="flex-1 p-8">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Disponibilidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {availabilities.map((availability) => (
                  <div key={availability.id} className="flex items-center space-x-4">
                    <div className="w-32">
                      <Label>{DAYS_OF_WEEK[availability.day_of_week]}</Label>
                    </div>
                    <Switch
                      checked={availability.is_available}
                      onCheckedChange={(checked) => {
                        const updated = {
                          ...availability,
                          is_available: checked
                        };
                        setAvailabilities(availabilities.map(a => 
                          a.id === availability.id ? updated : a
                        ));
                        handleSave(updated);
                      }}
                    />
                    {availability.is_available && (
                      <>
                        <div className="flex items-center space-x-2">
                          <Label>Início</Label>
                          <Input
                            type="time"
                            value={availability.start_time}
                            onChange={(e) => {
                              const updated = {
                                ...availability,
                                start_time: e.target.value
                              };
                              setAvailabilities(availabilities.map(a => 
                                a.id === availability.id ? updated : a
                              ));
                            }}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label>Fim</Label>
                          <Input
                            type="time"
                            value={availability.end_time}
                            onChange={(e) => {
                              const updated = {
                                ...availability,
                                end_time: e.target.value
                              };
                              setAvailabilities(availabilities.map(a => 
                                a.id === availability.id ? updated : a
                              ));
                            }}
                          />
                        </div>
                        <Button
                          onClick={() => handleSave(availability)}
                        >
                          Salvar
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AvailabilityPage;
