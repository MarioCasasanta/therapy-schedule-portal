
export interface Session {
  id: string;
  cliente_id?: string;
  data_hora: string;
  tipo_sessao: string;
  status: string;
  notas?: string;
  valor?: number;
  data_pagamento?: string;
  status_pagamento?: string;
  google_event_id?: string;
  guest_email?: string;
  invitation_status?: string;
  post_session_notes?: string;
  feedback?: string;
  created_at?: string;
  updated_at?: string;
  specialist_id?: string;
  clientName?: string;
}

export interface SessionFormData {
  cliente_id?: string;
  data_hora: string;
  tipo_sessao: string;
  status?: string;
  notas?: string;
  valor?: number;
  guest_email?: string;
}
