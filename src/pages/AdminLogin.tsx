
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      setCheckingUser(true);
      console.log("🔍 Verificando sessão existente...");
      
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("❌ Erro ao obter sessão:", error);
        setCheckingUser(false);
        return;
      }

      if (!session?.user) {
        console.log("❌ Nenhum usuário autenticado.");
        setCheckingUser(false);
        return;
      }

      console.log("✅ Usuário encontrado:", session.user.email);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profileError || !profile) {
        console.error("❌ Erro ao buscar perfil do usuário:", profileError);
        setCheckingUser(false);
        return;
      }

      console.log("📋 Role do usuário:", profile.role);

      if (profile.role === "admin") {
        console.log("🔐 Redirecionando admin para dashboard...");
        navigate("/admin", { replace: true });
      } else {
        console.log("⚠️ Usuário não é admin, mostrando mensagem...");
        toast({
          variant: "destructive",
          title: "Acesso negado",
          description: "Você não tem permissão para acessar esta área.",
        });
        navigate("/auth", { replace: true });
      }
      
      setCheckingUser(false);
    };

    checkSession();
  }, [navigate, toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("🔐 Tentando fazer login com:", email);

    try {
      const { data: { session }, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        console.error("❌ Erro no login:", loginError);
        throw loginError;
      }

      if (session) {
        console.log("✅ Login realizado com sucesso:", session.user.email);
        
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();
            
        if (profileError) {
          console.error("❌ Erro ao buscar perfil:", profileError);
          throw profileError;
        }
        
        console.log("📋 Role verificado:", profile.role);
        
        if (profile.role === "admin") {
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo ao painel administrativo.",
          });
          console.log("🎯 Redirecionando para /admin...");
          navigate("/admin", { replace: true });
        } else {
          console.log("⚠️ Usuário não é admin");
          toast({
            variant: "destructive",
            title: "Acesso negado",
            description: "Você não tem permissão para acessar esta área.",
          });
          await supabase.auth.signOut();
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-sage-50 p-4">
      <Link to="/" className="mb-8 flex items-center text-2xl font-playfair font-semibold text-sage-600">
        <Heart className="h-8 w-8 text-pink-500 mr-2 fill-pink-500" />
        Além do Apego
      </Link>
      
      {checkingUser ? (
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-center">Verificando seu cadastro...</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-playfair text-center">
              Login Administrativo
            </CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais de administrador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-sage-600 hover:bg-sage-700 text-white"
              >
                {loading ? "Carregando..." : "Entrar"}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <Link to="/auth" className="text-sm text-sage-600 hover:underline">
                Ir para o login de usuários
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminLogin;
