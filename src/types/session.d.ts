
export interface Session {
  id: string;
  data_hora: string;
  tipo_sessao: string;
  guest_email?: string;
  invitation_status?: string;
  notas?: string;
  valor?: number;
  status_pagamento?: string;
  data_pagamento?: string;
  cliente_id?: string;
  status?: string;
  feedback?: string;
  post_session_notes?: string;
}

export interface SessionFormData {
  data_hora: string;
  tipo_sessao: string;
  guest_email?: string;
  notas?: string;
  valor: number;
  status_pagamento: string;
  data_pagamento?: string;
}

export interface SessionListProps {
  sessions: Session[];
  onEdit: (session: Session) => void;
  onDelete: (session: Session) => void;
  onSendInvite: (session: Session) => void;
}
