
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Mail, Edit, Trash2, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_your_publishable_key");

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
  isClientView?: boolean;
  onPayment?: (session: Session) => void;
}

export const SessionList = ({ 
  sessions, 
  onEdit, 
  onDelete, 
  onSendInvite,
  isClientView,
  onPayment 
}: SessionListProps) => {
  const { toast } = useToast();
  const [paymentSession, setPaymentSession] = useState<Session | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handlePayment = async (session: Session) => {
    try {
      setIsProcessing(true);
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe não foi inicializado corretamente');
      }

      // Criar um PaymentMethod
      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
        type: 'card',
        card: {
          number: '4242424242424242', // Para teste
          exp_month: 12,
          exp_year: 2024,
          cvc: '123',
        },
      });

      if (stripeError) {
        throw stripeError;
      }

      // Processar o pagamento através da Edge Function
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: { 
          session_id: session.id,
          payment_method: paymentMethod?.id,
        },
      });

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Pagamento processado com sucesso.",
      });

      setPaymentSession(null);
      if (onPayment) {
        onPayment(session);
      }
    } catch (error) {
      console.error('Erro no pagamento:', error);
      toast({
        variant: "destructive",
        title: "Erro no pagamento",
        description: error.message || "Não foi possível processar o pagamento.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
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
                {isClientView ? (
                  session.status_pagamento === "pendente" && onPayment && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => setPaymentSession(session)}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pagar
                    </Button>
                  )
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!paymentSession} onOpenChange={() => setPaymentSession(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Pagamento</DialogTitle>
            <DialogDescription>
              Você está prestes a pagar a sessão no valor de R$ {paymentSession?.valor?.toFixed(2)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Para fins de demonstração, usando cartão de teste:
              <br />
              4242 4242 4242 4242 - 12/24 - 123
            </p>
            <Button 
              onClick={() => paymentSession && handlePayment(paymentSession)}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? "Processando..." : "Confirmar Pagamento"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
