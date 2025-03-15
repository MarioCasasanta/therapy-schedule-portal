
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const Payments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPayments = async () => {
      const { data, error } = await supabase
        .from("pagamentos")
        .select(`
          *,
          profiles:cliente_id (*),
          sessoes:sessao_id (*)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar pagamentos",
          description: error.message,
        });
        return;
      }

      setPayments(data || []);
    };

    fetchPayments();
  }, [toast]);

  const handleProcessPayment = async (paymentId: string) => {
    try {
      const { error } = await supabase.functions.invoke('process-payment', {
        body: { payment_id: paymentId }
      });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Pagamento processado com sucesso.",
      });

      // Atualiza a lista de pagamentos
      setPayments(payments.map(payment => {
        if (payment.id === paymentId) {
          return { ...payment, status: "processado", data_pagamento: new Date().toISOString() };
        }
        return payment;
      }));
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao processar pagamento",
        description: error.message,
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath="/dashboard/payments" />
        <SidebarInset className="overflow-auto">
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Pagamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Sessão</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          {format(new Date(payment.created_at), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>{payment.profiles?.full_name}</TableCell>
                        <TableCell>
                          {format(new Date(payment.sessoes?.data_hora), "dd/MM/yyyy HH:mm")}
                        </TableCell>
                        <TableCell>R$ {payment.valor.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={payment.status === "pendente" ? "secondary" : "default"}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.metodo_pagamento || "-"}</TableCell>
                        <TableCell>
                          {payment.status === "pendente" && (
                            <Button
                              size="sm"
                              onClick={() => handleProcessPayment(payment.id)}
                            >
                              Processar
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Payments;
