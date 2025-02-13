
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    telefone: "",
    data_nascimento: "",
    email: ""
  });

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
      setFormData({
        full_name: userProfile.full_name || "",
        telefone: userProfile.telefone || "",
        data_nascimento: userProfile.data_nascimento ? format(new Date(userProfile.data_nascimento), 'yyyy-MM-dd') : "",
        email: userProfile.email || ""
      });
    };

    checkUser();
  }, [navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        telefone: formData.telefone,
        data_nascimento: formData.data_nascimento,
      })
      .eq("id", profile.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: "Não foi possível salvar suas alterações.",
      });
      return;
    }

    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
    
    setIsEditing(false);
    setProfile(prev => ({
      ...prev,
      ...formData
    }));
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Meu Perfil</CardTitle>
            {!isEditing && (
              <Button 
                onClick={() => setIsEditing(true)}
                variant="outline"
              >
                Editar Perfil
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {!isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label className="font-medium">Nome Completo</Label>
                  <p>{profile.full_name || "Não informado"}</p>
                </div>
                <div>
                  <Label className="font-medium">Email</Label>
                  <p>{profile.email}</p>
                </div>
                <div>
                  <Label className="font-medium">Telefone</Label>
                  <p>{profile.telefone || "Não informado"}</p>
                </div>
                <div>
                  <Label className="font-medium">Data de Nascimento</Label>
                  <p>
                    {profile.data_nascimento 
                      ? format(new Date(profile.data_nascimento), 'dd/MM/yyyy')
                      : "Não informado"}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Nome Completo</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    placeholder="Seu telefone"
                  />
                </div>
                <div>
                  <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                  <Input
                    id="data_nascimento"
                    name="data_nascimento"
                    type="date"
                    value={formData.data_nascimento}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <Button type="submit">Salvar Alterações</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        full_name: profile.full_name || "",
                        telefone: profile.telefone || "",
                        data_nascimento: profile.data_nascimento ? format(new Date(profile.data_nascimento), 'yyyy-MM-dd') : "",
                        email: profile.email || ""
                      });
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
