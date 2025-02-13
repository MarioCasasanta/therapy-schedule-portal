
export interface SystemConfig {
  id: string;
  key: string;
  value: any;
  created_at: string;
  updated_at: string;
}

export interface PaymentMethodsConfig {
  methods: ("pix" | "credit_card" | "bank_transfer")[];
}

export interface NotificationPreferencesConfig {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
}

export interface CalendarSyncConfig {
  google_calendar: boolean;
}
