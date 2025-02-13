
import { ProfileForm } from "@/components/profile/ProfileForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ClientProfile = () => {
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
        navigate("/client-dashboard");
        return;
      }

      setProfile(userProfile);
    };

    checkUser();
  }, [navigate, toast]);

  const handleSubmit = async (formData: any) => {
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        telefone: formData.telefone,
        data_nascimento: formData.data_nascimento,
      })
      .eq("id", profile.id);

    if (error) {
      throw error;
    }

    setProfile(prev => ({
      ...prev,
      ...formData
    }));
  };

  if (!profile) return null;

  return (
    <ProfileForm 
      profile={profile} 
      onSubmit={handleSubmit}
      onCancel={() => navigate("/client-dashboard")}
    />
  );
};

export default ClientProfile;
