
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const Reports = () => {
  const [reports, setReports] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from("financial_reports")
        .select("*")
        .order("report_date", { ascending: true });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar relatórios",
          description: error.message,
        });
        return;
      }

      setReports(data || []);
    };

    fetchReports();
  }, [toast]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath="/dashboard/reports" />
        <SidebarInset className="overflow-auto">
          <div className="p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Receita Mensal</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reports}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="report_date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="total_revenue" 
                      stroke="#10b981" 
                      name="Receita"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total de Sessões</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {reports[reports.length - 1]?.sessions_count || 0}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sessões Pagas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {reports[reports.length - 1]?.paid_sessions_count || 0}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sessões Pendentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">
                    {reports[reports.length - 1]?.pending_sessions_count || 0}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Reports;
