
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { SystemConfigController } from "@/controllers/SystemConfigController";
import type { CalendarSyncConfig } from "@/types/system-config";

export function CalendarSection({
  initialConfig,
  onUpdate
}: {
  initialConfig: CalendarSyncConfig;
  onUpdate: (config: CalendarSyncConfig) => void;
}) {
  const { toast } = useToast();
  const [config, setConfig] = useState(initialConfig);

  const handleSyncUpdate = async (enabled: boolean) => {
    try {
      const updatedConfig = { google_calendar: enabled };
      await SystemConfigController.update("calendar_sync", updatedConfig);
      setConfig(updatedConfig);
      onUpdate(updatedConfig);
      toast({
        title: "Sucesso",
        description: "Sincronização com Google Calendar atualizada.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar sincronização",
        description: error.message,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integração com Calendário</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="google_calendar">Google Calendar</Label>
          <Switch
            id="google_calendar"
            checked={config.google_calendar}
            onCheckedChange={handleSyncUpdate}
          />
        </div>
      </CardContent>
    </Card>
  );
}
