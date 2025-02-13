
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function AvailabilitySection() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horários de Atendimento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={() => navigate('/dashboard/availability')}>
            Gerenciar Disponibilidade
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
