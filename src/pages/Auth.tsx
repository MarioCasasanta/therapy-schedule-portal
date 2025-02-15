
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Verificar o role do usuário
        const { data: profiles, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id);

        console.log("Profile data:", profiles); // Debug log

        if (profiles && profiles.length > 0) {
          if (profiles[0].role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/client-dashboard");
          }
        } else {
          console.log("No profile found for user:", session.user.id);
        }
      }
    };

    checkSession();
  }, [navigate]);

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
          // Verificar o role do usuário após login
          const { data: profiles, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id);

          if (profileError) throw profileError;

          console.log("Profile data after login:", profiles); // Debug log

          if (profiles && profiles.length > 0) {
            if (profiles[0].role === "admin") {
              navigate("/dashboard");
            } else {
              navigate("/client-dashboard");
            }
          } else {
            toast({
              variant: "destructive",
              title: "Erro",
              description: "Perfil não encontrado.",
            });
          }
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Verifique seu email para confirmar o cadastro.",
        });
      }
    } catch (error: any) {
      console.error("Auth error:", error); // Debug log
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sage-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-playfair font-semibold text-center mb-6">
          {isLogin ? "Login" : "Criar conta"}
        </h2>
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
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-sm text-sage-600 hover:text-sage-700 w-full text-center"
        >
          {isLogin ? "Não tem uma conta? Cadastre-se" : "Já tem uma conta? Faça login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
