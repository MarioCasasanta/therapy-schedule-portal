
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const especialistaFormSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  nomeCompleto: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  especializacao: z.string().min(3, "A especialização deve ter pelo menos 3 caracteres"),
  biografia: z.string().min(10, "A biografia deve ter pelo menos 10 caracteres"),
  telefone: z.string().optional(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const RegistroEspecialista = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof especialistaFormSchema>>({
    resolver: zodResolver(especialistaFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nomeCompleto: "",
      especializacao: "",
      biografia: "",
      telefone: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof especialistaFormSchema>) => {
    setLoading(true);
    
    try {
      // Cadastrar usuário na autenticação do Supabase
      const { error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            role: "especialista",
            full_name: values.nomeCompleto,
            especializacao: values.especializacao,
            biografia: values.biografia,
            telefone: values.telefone,
          }
        }
      });

      if (signUpError) throw signUpError;

      toast({
        title: "Cadastro iniciado com sucesso!",
        description: "Verifique seu email para confirmar o cadastro. Nossa equipe revisará seu perfil para aprovação.",
        variant: "default",
      });
      
      navigate("/auth");
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao cadastrar. Por favor, tente novamente.",
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
        <h2 className="text-2xl font-playfair font-semibold text-center mb-2">
          Cadastro de Especialista
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Junte-se à nossa rede de especialistas em saúde mental e desenvolvimento humano
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="seuemail@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="nomeCompleto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="especializacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialização</FormLabel>
                  <FormControl>
                    <Input placeholder="Psicoterapeuta, Psicólogo, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="biografia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biografia Profissional</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Conte sobre sua formação, experiência e abordagem terapêutica..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-sage-600 text-white py-2 px-4 rounded-md hover:bg-sage-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Carregando..." : "Cadastrar como Especialista"}
            </Button>
            
            <div className="text-center mt-4">
              <Link to="/auth" className="text-sm text-sage-600 hover:text-sage-800">
                Já tem uma conta? Faça login
              </Link>
            </div>
          </form>
        </Form>
      </div>
      
      <div className="mt-8 text-center max-w-md text-sm text-gray-600">
        <p>
          Ao se cadastrar, você concorda com nossos{" "}
          <Link to="/terms-of-service" className="text-sage-600 hover:underline">
            Termos de Serviço
          </Link>{" "}
          e{" "}
          <Link to="/privacy-policy" className="text-sage-600 hover:underline">
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistroEspecialista;
