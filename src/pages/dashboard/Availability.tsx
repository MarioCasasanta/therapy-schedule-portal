
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface Availability {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

const DAYS_OF_WEEK = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
];

const Availability = () => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAvailability = async () => {
      const { data, error } = await supabase
        .from("availability")
        .select("*")
        .order("day_of_week", { ascending: true });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar disponibilidade",
          description: error.message,
        });
        return;
      }

      // Ensure we have an entry for each day of the week
      const availability = DAYS_OF_WEEK.map((_, index) => {
        const existing = data?.find(a => a.day_of_week === index);
        return existing || {
          day_of_week: index,
          start_time: "09:00",
          end_time: "17:00",
          is_available: false
        };
      });

      setAvailabilities(availability);
    };

    fetchAvailability();
  }, [toast]);

  const handleSave = async (availability: Availability) => {
    try {
      const { error } = await supabase
        .from("availability")
        .upsert({
          day_of_week: availability.day_of_week,
          start_time: availability.start_time,
          end_time: availability.end_time,
          is_available: availability.is_available
        });

      if (error) throw error;

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
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Disponibilidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {availabilities.map((availability) => (
              <div key={availability.day_of_week} className="flex items-center space-x-4">
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
                      a.day_of_week === availability.day_of_week ? updated : a
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
                            a.day_of_week === availability.day_of_week ? updated : a
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
                            a.day_of_week === availability.day_of_week ? updated : a
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
    </div>
  );
};

export default Availability;
