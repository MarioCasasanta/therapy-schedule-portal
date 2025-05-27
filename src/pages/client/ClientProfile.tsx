
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, X } from "lucide-react";

const ClientProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<any>({});

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
      setEditedProfile(userProfile);
      setLoading(false);
    };

    checkUser();
  }, [navigate, toast]);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update(editedProfile)
        .eq("id", profile.id);

      if (error) throw error;

      setProfile(editedProfile);
      setEditing(false);
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: error.message,
      });
    }
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex h-screen w-full bg-gray-50">
          <ClientSidebar />
          <SidebarInset className="overflow-auto">
            <div className="flex items-center justify-center h-full">
              <p className="text-lg">Carregando...</p>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50">
        <ClientSidebar />
        <SidebarInset className="overflow-auto">
          <div className="max-w-4xl mx-auto py-8 px-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
              {!editing ? (
                <Button onClick={() => setEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setEditing(false);
                    setEditedProfile(profile);
                  }}>
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}
            </div>

            <div className="grid gap-6">
              {/* Informações Pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Informações Pessoais
                  </CardTitle>
                  <CardDescription>
                    Suas informações básicas e dados de contato
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {profile?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{profile?.full_name || 'Usuário'}</h3>
                      <Badge variant="secondary">{profile?.role || 'Cliente'}</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Nome Completo</Label>
                      {editing ? (
                        <Input
                          id="full_name"
                          value={editedProfile.full_name || ''}
                          onChange={(e) => setEditedProfile({...editedProfile, full_name: e.target.value})}
                        />
                      ) : (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{profile?.full_name || 'Não informado'}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{profile?.email || 'Não informado'}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      {editing ? (
                        <Input
                          id="phone"
                          value={editedProfile.phone || ''}
                          onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                        />
                      ) : (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{profile?.phone || 'Não informado'}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                      {editing ? (
                        <Input
                          id="data_nascimento"
                          type="date"
                          value={editedProfile.data_nascimento || ''}
                          onChange={(e) => setEditedProfile({...editedProfile, data_nascimento: e.target.value})}
                        />
                      ) : (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{profile?.data_nascimento ? new Date(profile.data_nascimento).toLocaleDateString('pt-BR') : 'Não informado'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações</Label>
                    {editing ? (
                      <Textarea
                        id="notes"
                        value={editedProfile.notes || ''}
                        onChange={(e) => setEditedProfile({...editedProfile, notes: e.target.value})}
                        placeholder="Adicione observações sobre seu perfil..."
                      />
                    ) : (
                      <div className="min-h-[60px] p-3 border rounded-md bg-gray-50">
                        <span className="text-gray-700">{profile?.notes || 'Nenhuma observação adicionada'}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Preferências */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferências</CardTitle>
                  <CardDescription>
                    Configure suas preferências de atendimento e comunicação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <p>Configurações de preferências em desenvolvimento</p>
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

export default ClientProfile;
