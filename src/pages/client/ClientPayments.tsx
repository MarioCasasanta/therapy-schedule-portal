
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClientPayments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("pagamentos")
        .select("*")
        .eq("cliente_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar os pagamentos.",
        });
        return;
      }

      setPayments(data || []);
    };

    checkUser();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <ClientSidebar className="w-64 hidden md:block" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Pagamentos</h1>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Pagamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Método</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          {new Date(payment.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>R$ {payment.valor.toFixed(2)}</TableCell>
                        <TableCell>{payment.status}</TableCell>
                        <TableCell>{payment.metodo_pagamento || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientPayments;
