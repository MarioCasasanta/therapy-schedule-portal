
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { SystemConfigController } from "@/controllers/SystemConfigController";
import type { PaymentMethodsConfig, NotificationPreferencesConfig, CalendarSyncConfig } from "@/types/system-config";
import { PaymentMethodsSection } from "@/components/settings/PaymentMethodsSection";
import { NotificationsSection } from "@/components/settings/NotificationsSection";
import { CalendarSection } from "@/components/settings/CalendarSection";
import { AvailabilitySection } from "@/components/settings/AvailabilitySection";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

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

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [paymentMethodsData, notificationPreferencesData, calendarSyncData] = await Promise.all([
          SystemConfigController.get("payment_methods"),
          SystemConfigController.get("notification_preferences"),
          SystemConfigController.get("calendar_sync"),
        ]);

        setPaymentMethods(paymentMethodsData.value);
        setNotificationPreferences(notificationPreferencesData.value);
        setCalendarSync(calendarSyncData.value);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath="/dashboard/settings" />
        <SidebarInset className="overflow-auto">
          <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Configurações</h1>
            
            <PaymentMethodsSection
              initialMethods={paymentMethods}
              onUpdate={setPaymentMethods}
            />
            
            <NotificationsSection
              initialPreferences={notificationPreferences}
              onUpdate={setNotificationPreferences}
            />
            
            <CalendarSection
              initialConfig={calendarSync}
              onUpdate={setCalendarSync}
            />
            
            <AvailabilitySection />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
