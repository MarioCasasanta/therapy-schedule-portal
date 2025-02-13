
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface SessionCardProps {
  data_hora: string;
  tipo_sessao: string;
  status: string;
  valor: number;
  status_pagamento: string;
  notas?: string;
}

export const SessionCard = ({
  data_hora,
  tipo_sessao,
  status,
  valor,
  status_pagamento,
  notas
}: SessionCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finalizado':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'text-green-600';
      case 'pendente':
        return 'text-yellow-600';
      default:
        return 'text-red-600';
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="font-medium">
                {format(new Date(data_hora), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>
                {format(new Date(data_hora), "HH:mm", { locale: ptBR })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <span className={getPaymentStatusColor(status_pagamento)}>
                R$ {valor.toFixed(2)} - {status_pagamento}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(status)}`}>
              {status}
            </span>
            <span className="text-sm text-gray-500">
              {tipo_sessao}
            </span>
          </div>
        </div>
        {notas && (
          <div className="mt-4 text-sm text-gray-600">
            <p>{notas}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
