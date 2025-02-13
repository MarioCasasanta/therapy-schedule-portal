
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentUpload } from "@/components/documents/DocumentUpload";
import { SessionHistory } from "@/components/sessions/SessionHistory";
import { InvoiceViewer } from "@/components/invoices/InvoiceViewer";
import { FileText, Calendar, Receipt } from "lucide-react";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: userProfile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileError || !userProfile) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar perfil",
          description: "Não foi possível verificar suas informações.",
        });
        navigate("/");
        return;
      }

      setProfile(userProfile);
    };

    checkUser();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Área do Cliente</h1>
          </div>

          <Tabs defaultValue="sessions" className="space-y-6">
            <TabsList>
              <TabsTrigger value="sessions" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Sessões
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Documentos
              </TabsTrigger>
              <TabsTrigger value="invoices" className="flex items-center">
                <Receipt className="h-4 w-4 mr-2" />
                Faturas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sessions">
              <SessionHistory />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentUpload />
            </TabsContent>

            <TabsContent value="invoices">
              <InvoiceViewer />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
