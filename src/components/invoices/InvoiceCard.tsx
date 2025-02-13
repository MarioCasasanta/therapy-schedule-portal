
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Receipt, Calendar, AlertCircle, Download } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface InvoiceCardProps {
  invoice_number: string;
  amount: number;
  status: string;
  due_date: string;
  onDownload: () => void;
}

export const InvoiceCard = ({
  invoice_number,
  amount,
  status,
  due_date,
  onDownload
}: InvoiceCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Receipt className="h-4 w-4 text-gray-500" />
              <span className="font-medium">
                Fatura #{invoice_number}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>
                Vencimento: {format(new Date(due_date), "dd/MM/yyyy", { locale: ptBR })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-gray-500" />
              <span className={status === 'paid' ? 'text-green-600' : 'text-yellow-600'}>
                R$ {amount.toFixed(2)} - {status === 'paid' ? 'Pago' : 'Pendente'}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
