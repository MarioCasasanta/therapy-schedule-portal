
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { SystemConfigController } from "@/controllers/SystemConfigController";
import type { NotificationPreferencesConfig } from "@/types/system-config";

export function NotificationsSection({
  initialPreferences,
  onUpdate
}: {
  initialPreferences: NotificationPreferencesConfig;
  onUpdate: (preferences: NotificationPreferencesConfig) => void;
}) {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState(initialPreferences);

  const handlePreferenceUpdate = async (key: keyof NotificationPreferencesConfig, value: boolean) => {
    try {
      const updatedPreferences = { ...preferences, [key]: value };
      await SystemConfigController.update("notification_preferences", updatedPreferences);
      setPreferences(updatedPreferences);
      onUpdate(updatedPreferences);
      toast({
        title: "Sucesso",
        description: "Preferências de notificação atualizadas.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar preferências de notificação",
        description: error.message,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email">Email</Label>
          <Switch
            id="email"
            checked={preferences.email}
            onCheckedChange={(checked) => handlePreferenceUpdate("email", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="sms">SMS</Label>
          <Switch
            id="sms"
            checked={preferences.sms}
            onCheckedChange={(checked) => handlePreferenceUpdate("sms", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Switch
            id="whatsapp"
            checked={preferences.whatsapp}
            onCheckedChange={(checked) => handlePreferenceUpdate("whatsapp", checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
