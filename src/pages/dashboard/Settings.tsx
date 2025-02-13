
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SystemConfigController } from "@/controllers/SystemConfigController";
import type { PaymentMethodsConfig, NotificationPreferencesConfig, CalendarSyncConfig } from "@/types/system-config";
import { Loader2 } from "lucide-react";
import { AvailabilityController } from "@/controllers/AvailabilityController";
import type { Availability } from "@/types/availability";

export default function Settings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsConfig>({ methods: [] });
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferencesConfig>({
    email: true,
    sms: false,
    whatsapp: false
  });
  const [calendarSync, setCalendarSync] = useState<CalendarSyncConfig>({ google_calendar: false });
  const [availability, setAvailability] = useState<Availability[]>([]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [paymentMethodsData, notificationPreferencesData, calendarSyncData, availabilityData] = await Promise.all([
          SystemConfigController.get("payment_methods"),
          SystemConfigController.get("notification_preferences"),
          SystemConfigController.get("calendar_sync"),
          AvailabilityController.list()
        ]);

        setPaymentMethods(paymentMethodsData.value);
        setNotificationPreferences(notificationPreferencesData.value);
        setCalendarSync(calendarSyncData.value);
        setAvailability(availabilityData);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar configurações",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [toast]);

  const handlePaymentMethodUpdate = async (method: string, enabled: boolean) => {
    try {
      const updatedMethods = enabled
        ? [...paymentMethods.methods, method]
        : paymentMethods.methods.filter(m => m !== method);

      await SystemConfigController.update("payment_methods", { methods: updatedMethods });
      setPaymentMethods({ methods: updatedMethods });
      toast({
        title: "Sucesso",
        description: "Métodos de pagamento atualizados.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar métodos de pagamento",
        description: error.message,
      });
    }
  };

  const handleNotificationPreferenceUpdate = async (key: keyof NotificationPreferencesConfig, value: boolean) => {
    try {
      const updatedPreferences = { ...notificationPreferences, [key]: value };
      await SystemConfigController.update("notification_preferences", updatedPreferences);
      setNotificationPreferences(updatedPreferences);
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

  const handleCalendarSyncUpdate = async (enabled: boolean) => {
    try {
      await SystemConfigController.update("calendar_sync", { google_calendar: enabled });
      setCalendarSync({ google_calendar: enabled });
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Configurações</h1>

      <Card>
        <CardHeader>
          <CardTitle>Métodos de Pagamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="pix">PIX</Label>
            <Switch
              id="pix"
              checked={paymentMethods.methods.includes("pix")}
              onCheckedChange={(checked) => handlePaymentMethodUpdate("pix", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="credit_card">Cartão de Crédito</Label>
            <Switch
              id="credit_card"
              checked={paymentMethods.methods.includes("credit_card")}
              onCheckedChange={(checked) => handlePaymentMethodUpdate("credit_card", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="bank_transfer">Transferência Bancária</Label>
            <Switch
              id="bank_transfer"
              checked={paymentMethods.methods.includes("bank_transfer")}
              onCheckedChange={(checked) => handlePaymentMethodUpdate("bank_transfer", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email</Label>
            <Switch
              id="email"
              checked={notificationPreferences.email}
              onCheckedChange={(checked) => handleNotificationPreferenceUpdate("email", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sms">SMS</Label>
            <Switch
              id="sms"
              checked={notificationPreferences.sms}
              onCheckedChange={(checked) => handleNotificationPreferenceUpdate("sms", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Switch
              id="whatsapp"
              checked={notificationPreferences.whatsapp}
              onCheckedChange={(checked) => handleNotificationPreferenceUpdate("whatsapp", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integração com Calendário</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="google_calendar">Google Calendar</Label>
            <Switch
              id="google_calendar"
              checked={calendarSync.google_calendar}
              onCheckedChange={handleCalendarSyncUpdate}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Horários de Atendimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={() => window.location.href = '/dashboard/availability'}>
              Gerenciar Horários
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
