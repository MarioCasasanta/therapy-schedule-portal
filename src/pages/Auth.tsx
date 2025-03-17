
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("cliente"); // "cliente" ou "especialista"
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("❌ Erro ao obter sessão:", error);
        return;
      }

      if (!session?.user) {
        console.log("❌ Nenhum usuário autenticado.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profileError || !profile) {
        console.error("❌ Erro ao buscar perfil do usuário:", profileError);
        return;
      }

      navigate(profile.role === "admin" ? "/dashboard" : 
             profile.role === "especialista" ? "/dashboard" : 
             "/client-dashboard", { replace: true });
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        checkSession();
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data: { session }, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) throw loginError;

        if (session) {
          // After login, we'll check the profile and redirect accordingly
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();
            
          if (profileError) throw profileError;
          
          navigate(profile.role === "admin" ? "/dashboard" : 
                 profile.role === "especialista" ? "/dashboard" : 
                 "/client-dashboard", { replace: true });
        }
      } else {
        // For signup, we include the user type in metadata
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: userType  // This will be used by the trigger function
            }
          }
        });

        if (signUpError) throw signUpError;

        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Verifique seu email para confirmar o cadastro.",
        });
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
      
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <Tabs defaultValue="cliente" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="cliente" 
              onClick={() => setUserType("cliente")}
              className={userType === "cliente" ? "font-semibold" : ""}
            >
              Para Clientes
            </TabsTrigger>
            <TabsTrigger 
              value="especialista" 
              onClick={() => setUserType("especialista")}
              className={userType === "especialista" ? "font-semibold" : ""}
            >
              Para Especialistas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cliente" className="mt-4">
            <h2 className="text-2xl font-playfair font-semibold text-center mb-2">
              {isLogin ? "Login" : "Crie sua conta"}
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Acesse como cliente para marcar suas consultas
            </p>
          </TabsContent>
          
          <TabsContent value="especialista" className="mt-4">
            <h2 className="text-2xl font-playfair font-semibold text-center mb-2">
              {isLogin ? "Login" : "Cadastro"} de Especialista
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Acesse como especialista para gerenciar suas consultas
            </p>
          </TabsContent>
        </Tabs>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sage-600 text-white py-2 px-4 rounded-md hover:bg-sage-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Carregando..." : isLogin ? "Entrar" : "Cadastrar"}
          </button>
          
          <div className="text-center mt-4">
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
        </form>
      </div>
    </div>
  );
};

export default Auth;
