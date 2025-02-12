
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
}

const StatCard = ({ title, value, description }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </CardContent>
  </Card>
);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const AnalyticsDashboard = () => {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [sessionTypes, setSessionTypes] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSessions: 0,
    averageValue: 0,
    attendanceRate: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const startDate = startOfMonth(new Date());
      const endDate = endOfMonth(new Date());

      // Buscar dados do mês atual
      const { data: sessionsData, error: sessionsError } = await supabase
        .from("sessoes")
        .select("*")
        .gte("data_hora", startDate.toISOString())
        .lte("data_hora", endDate.toISOString());

      if (sessionsError) {
        console.error("Erro ao buscar sessões:", sessionsError);
        return;
      }

      // Processar dados para gráficos
      const dailyRevenue: { [key: string]: number } = {};
      const typeCount: { [key: string]: number } = {};
      let totalRevenue = 0;
      let paidSessions = 0;

      sessionsData?.forEach((session) => {
        // Receita diária
        const date = format(new Date(session.data_hora), "dd/MM", { locale: ptBR });
        dailyRevenue[date] = (dailyRevenue[date] || 0) + (session.valor || 0);

        // Contagem por tipo
        typeCount[session.tipo_sessao] = (typeCount[session.tipo_sessao] || 0) + 1;

        // Estatísticas gerais
        if (session.status_pagamento === "pago") {
          totalRevenue += session.valor || 0;
          paidSessions++;
        }
      });

      // Preparar dados para os gráficos
      const monthlyDataFormatted = Object.entries(dailyRevenue).map(([date, value]) => ({
        date,
        value,
      }));

      const sessionTypesFormatted = Object.entries(typeCount).map(([name, value]) => ({
        name,
        value,
      }));

      // Calcular estatísticas
      const totalSessions = sessionsData?.length || 0;
      const stats = {
        totalRevenue,
        totalSessions,
        averageValue: totalSessions ? totalRevenue / totalSessions : 0,
        attendanceRate: totalSessions ? (paidSessions / totalSessions) * 100 : 0,
      };

      setMonthlyData(monthlyDataFormatted);
      setSessionTypes(sessionTypesFormatted);
      setStats(stats);
    };

    fetchData();
  }, []);

  const handleExportPDF = async () => {
    // Implementar exportação PDF
    console.log("Exportar PDF");
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Receita Total"
          value={`R$ ${stats.totalRevenue.toFixed(2)}`}
          description="Este mês"
        />
        <StatCard
          title="Total de Sessões"
          value={stats.totalSessions.toString()}
          description="Este mês"
        />
        <StatCard
          title="Valor Médio"
          value={`R$ ${stats.averageValue.toFixed(2)}`}
          description="Por sessão"
        />
        <StatCard
          title="Taxa de Comparecimento"
          value={`${stats.attendanceRate.toFixed(1)}%`}
          description="Baseado em sessões pagas"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Receita Diária</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Tipo de Sessão</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sessionTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {sessionTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Relatórios</CardTitle>
          <Button onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily">
            <TabsList>
              <TabsTrigger value="daily">Diário</TabsTrigger>
              <TabsTrigger value="weekly">Semanal</TabsTrigger>
              <TabsTrigger value="monthly">Mensal</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="space-y-4">
              {/* Implementar tabela de relatório diário */}
            </TabsContent>
            <TabsContent value="weekly" className="space-y-4">
              {/* Implementar tabela de relatório semanal */}
            </TabsContent>
            <TabsContent value="monthly" className="space-y-4">
              {/* Implementar tabela de relatório mensal */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
