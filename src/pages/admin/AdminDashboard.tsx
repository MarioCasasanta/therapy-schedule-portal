
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, FileText, CalendarClock, CreditCard, UserCheck } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    specialists: 0,
    clients: 0,
    sessions: 0,
    payments: 0,
    blogPosts: 0
  });

  const logAccess = useCallback(async (userId: string) => {
    try {
      await supabase.from('access_logs').insert([{
        user_id: userId,
        page_accessed: 'admin-dashboard',
        component_accessed: 'admin_dashboard'
      }]);
    } catch (error) {
      console.error("Erro ao registrar acesso:", error);
    }
  }, []);

  useEffect(() => {
    let isAuthenticated = false;

    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("❌ Erro ao obter sessão:", sessionError);
          setIsLoading(false);
          return;
        }

        if (!session?.user) {
          console.warn("⚠️ Nenhum usuário autenticado. Redirecionando...");
          navigate("/auth", { replace: true });
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError || !profile) {
          console.error("❌ Erro ao buscar perfil do usuário:", profileError);
          navigate("/auth", { replace: true });
          return;
        }

        if (profile.role !== 'admin') {
          console.warn("⚠️ Usuário não é admin. Redirecionando...");
          navigate("/client-dashboard", { replace: true });
          return;
        }

        if (!isAuthenticated) {
          await logAccess(session.user.id);
          isAuthenticated = true;
        }

        // Fetch statistics
        const fetchStatistics = async () => {
          try {
            // Get specialists count
            const { count: specialistsCount } = await supabase
              .from('profiles')
              .select('*', { count: 'exact', head: true })
              .eq('role', 'admin');

            // Get clients count
            const { count: clientsCount } = await supabase
              .from('profiles')
              .select('*', { count: 'exact', head: true })
              .eq('role', 'cliente');

            // Get sessions count
            const { count: sessionsCount } = await supabase
              .from('sessoes')
              .select('*', { count: 'exact', head: true });

            // Get blog posts count
            const { count: blogPostsCount } = await supabase
              .from('blog_posts')
              .select('*', { count: 'exact', head: true });

            setStats({
              specialists: specialistsCount || 0,
              clients: clientsCount || 0,
              sessions: sessionsCount || 0,
              payments: 0, // Will need to implement this when we have payment data
              blogPosts: blogPostsCount || 0
            });
          } catch (error) {
            console.error("Error fetching statistics:", error);
          }
        };

        fetchStatistics();
        setIsLoading(false);
      } catch (error) {
        console.error("❌ Erro inesperado no checkAuth:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, logAccess]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-xl">Carregando...</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath="/admin" />
        <SidebarInset className="overflow-auto">
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Painel de Administração</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <UserCheck className="mr-2 h-5 w-5 text-blue-500" />
                    Especialistas
                  </CardTitle>
                  <CardDescription>Total de especialistas cadastrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.specialists}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5 text-green-500" />
                    Clientes
                  </CardTitle>
                  <CardDescription>Total de clientes na plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.clients}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CalendarClock className="mr-2 h-5 w-5 text-purple-500" />
                    Sessões
                  </CardTitle>
                  <CardDescription>Total de sessões agendadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.sessions}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-yellow-500" />
                    Pagamentos
                  </CardTitle>
                  <CardDescription>Total de pagamentos processados</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.payments}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-red-500" />
                    Artigos
                  </CardTitle>
                  <CardDescription>Total de artigos publicados</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.blogPosts}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-indigo-500" />
                    Analytics
                  </CardTitle>
                  <CardDescription>Visão geral do desempenho</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">-</p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="recent">Atividades Recentes</TabsTrigger>
                <TabsTrigger value="pending">Aprovações Pendentes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Visão Geral</CardTitle>
                    <CardDescription>
                      Resumo de todas as operações da plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Use o menu lateral para navegar entre as diferentes seções do painel administrativo.
                      Você pode gerenciar especialistas, clientes, pagamentos, artigos do blog e muito mais.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recent">
                <Card>
                  <CardHeader>
                    <CardTitle>Atividades Recentes</CardTitle>
                    <CardDescription>
                      Ações recentes na plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Não há atividades recentes para exibir.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="pending">
                <Card>
                  <CardHeader>
                    <CardTitle>Aprovações Pendentes</CardTitle>
                    <CardDescription>
                      Itens que precisam de sua aprovação
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Não há itens pendentes de aprovação.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
