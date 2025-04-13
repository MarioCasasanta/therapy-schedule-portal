
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthComponentProps {
  onAuthSuccess?: (user: any) => void;
  redirectUrl?: string;
  customLogo?: string;
  customTitle?: string;
  customDescription?: string;
}

export const AuthComponent = ({
  onAuthSuccess,
  redirectUrl,
  customLogo,
  customTitle = "Bem-vindo",
  customDescription = "Faça login ou crie sua conta",
}: AuthComponentProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data: { session }, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (session) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo de volta.",
          });

          onAuthSuccess?.(profile);
          if (redirectUrl) window.location.href = redirectUrl;
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (error) throw error;

        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Verifique seu email para confirmar o cadastro.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro na autenticação",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-2 text-center">
        {customLogo && (
          <div className="flex justify-center mb-4">
            <img src={customLogo} alt="Logo" className="h-12" />
          </div>
        )}
        <CardTitle className="text-2xl font-playfair">{customTitle}</CardTitle>
        <CardDescription>{customDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                className="w-full"
              />
            </div>
          )}
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            variant="default"
          >
            {loading ? "Carregando..." : isLogin ? "Entrar" : "Cadastrar"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm"
          >
            {isLogin
              ? "Não tem uma conta? Cadastre-se"
              : "Já tem uma conta? Faça login"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const LogoutButton = ({
  onLogoutSuccess,
  className,
}: {
  onLogoutSuccess?: () => void;
  className?: string;
}) => {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado.",
      });

      onLogoutSuccess?.();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: error.message,
      });
    }
  };

  return (
    <Button onClick={handleLogout} variant="ghost" className={className}>
      Sair
    </Button>
  );
};
