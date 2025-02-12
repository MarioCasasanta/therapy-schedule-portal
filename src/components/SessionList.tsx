
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Mail, Edit, Trash2 } from "lucide-react";

interface Session {
  id: string;
  data_hora: string;
  tipo_sessao: string;
  guest_email?: string;
  invitation_status?: string;
  notas?: string;
  valor?: number;
  status_pagamento?: string;
  data_pagamento?: string;
}

interface SessionListProps {
  sessions: Session[];
  onEdit: (session: Session) => void;
  onDelete: (id: string) => void;
  onSendInvite: (session: Session) => void;
}

export const SessionList = ({ sessions, onEdit, onDelete, onSendInvite }: SessionListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pago":
        return "bg-green-500 hover:bg-green-600";
      case "cancelado":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-yellow-500 hover:bg-yellow-600";
    }
  };

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-white p-4 rounded-lg shadow border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">
                {format(new Date(session.data_hora), "PPp", { locale: ptBR })}
              </h3>
              <div className="flex gap-2 mt-1">
                <Badge variant={session.tipo_sessao === "individual" ? "default" : "secondary"}>
                  {session.tipo_sessao}
                </Badge>
                {session.status_pagamento && (
                  <Badge className={getStatusColor(session.status_pagamento)}>
                    {session.status_pagamento}
                  </Badge>
                )}
              </div>
              {session.guest_email && (
                <p className="text-sm text-gray-600 mt-1">
                  Convidado: {session.guest_email}
                  {session.invitation_status && (
                    <Badge 
                      variant={session.invitation_status === "accepted" ? "default" : "secondary"}
                      className={`ml-2 ${
                        session.invitation_status === "accepted" 
                          ? "bg-green-500 hover:bg-green-600" 
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                    >
                      {session.invitation_status}
                    </Badge>
                  )}
                </p>
              )}
              {session.valor !== undefined && (
                <p className="text-sm text-gray-600 mt-1">
                  Valor: R$ {session.valor.toFixed(2)}
                  {session.data_pagamento && (
                    <span className="ml-2">
                      (Pago em: {format(new Date(session.data_pagamento), "PP", { locale: ptBR })})
                    </span>
                  )}
                </p>
              )}
              {session.notas && (
                <p className="text-sm text-gray-600 mt-1">{session.notas}</p>
              )}
            </div>
            <div className="flex space-x-2">
              {session.guest_email && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSendInvite(session)}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(session)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(session.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
