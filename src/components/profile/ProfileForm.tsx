
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface ProfileFormProps {
  profile: any;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export const ProfileForm = ({ profile, onSubmit, onCancel }: ProfileFormProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    telefone: profile?.telefone || "",
    data_nascimento: profile?.data_nascimento ? format(new Date(profile.data_nascimento), 'yyyy-MM-dd') : "",
    email: profile?.email || "",
    avatar_url: profile?.avatar_url || ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Por favor, selecione apenas arquivos de imagem.",
        });
        return;
      }

      // Verificar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "A imagem deve ter no máximo 5MB.",
        });
        return;
      }

      setSelectedFile(file);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let updatedFormData = { ...formData };

      // Se há uma nova imagem selecionada, convertê-la para base64
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          updatedFormData.avatar_url = e.target?.result as string;
          
          await onSubmit(updatedFormData);
          setIsEditing(false);
          setSelectedFile(null);
          setPreviewUrl(null);
          toast({
            title: "Perfil atualizado",
            description: "Suas informações foram atualizadas com sucesso.",
          });
        };
        reader.readAsDataURL(selectedFile);
      } else {
        await onSubmit(updatedFormData);
        setIsEditing(false);
        toast({
          title: "Perfil atualizado",
          description: "Suas informações foram atualizadas com sucesso.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: error.message,
      });
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setFormData({
      full_name: profile?.full_name || "",
      telefone: profile?.telefone || "",
      data_nascimento: profile?.data_nascimento ? format(new Date(profile.data_nascimento), 'yyyy-MM-dd') : "",
      email: profile?.email || "",
      avatar_url: profile?.avatar_url || ""
    });
    onCancel();
  };

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
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>{profile?.full_name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <Label className="font-medium">Nome Completo</Label>
                  <p>{profile?.full_name || "Não informado"}</p>
                </div>
                <div>
                  <Label className="font-medium">Email</Label>
                  <p>{profile?.email}</p>
                </div>
                <div>
                  <Label className="font-medium">Telefone</Label>
                  <p>{profile?.telefone || "Não informado"}</p>
                </div>
                <div>
                  <Label className="font-medium">Data de Nascimento</Label>
                  <p>
                    {profile?.data_nascimento 
                      ? format(new Date(profile.data_nascimento), 'dd/MM/yyyy')
                      : "Não informado"}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={previewUrl || profile?.avatar_url} />
                      <AvatarFallback>{profile?.full_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <label 
                      htmlFor="avatar-upload" 
                      className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer hover:bg-primary/90 transition-colors"
                    >
                      <Camera className="h-3 w-3" />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Clique no ícone da câmera para alterar a foto</p>
                    <p className="text-xs">Máximo 5MB - JPG, PNG, GIF</p>
                  </div>
                </div>

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
                    onClick={cancelEdit}
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
