
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";

const especialistaFormSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  nomeCompleto: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  especializacao: z.string().min(3, "A especialização deve ter pelo menos 3 caracteres"),
  biografia: z.string().max(300, "A biografia curta deve ter no máximo 300 caracteres").optional(),
  biografiaLonga: z.string().max(1000, "A biografia longa deve ter no máximo 1000 caracteres").optional(),
  responderDepois: z.boolean().default(false),
  telefone: z.string().optional(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})
.refine(
  (data) => {
    if (data.responderDepois) return true;
    return data.biografia !== undefined;
  },
  {
    message: "Por favor, preencha a biografia curta ou marque a opção para responder depois",
    path: ["biografia"],
  }
);

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
      biografiaLonga: "",
      responderDepois: false,
      telefone: "",
    },
  });

  const responderDepois = form.watch("responderDepois");
  const biografiaValue = form.watch("biografia") || "";
  const biografiaLongaValue = form.watch("biografiaLonga") || "";

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
            biografia: values.biografia || "",
            biografiaLonga: values.biografiaLonga || "",
            responderDepois: values.responderDepois,
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
              name="responderDepois"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Responder às biografias depois do cadastro inicial
                    </FormLabel>
                    <FormDescription>
                      Você poderá completar suas biografias após confirmar seu email
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="biografia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biografia Curta</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea 
                        placeholder="Uma breve descrição da sua formação e especialidade..." 
                        className="min-h-[100px]" 
                        disabled={responderDepois}
                        maxLength={300}
                        {...field} 
                      />
                      <div className="text-xs text-gray-500 text-right mt-1">
                        {biografiaValue.length}/300 caracteres
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Uma breve descrição profissional (máx. 300 caracteres)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="biografiaLonga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biografia Completa</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea 
                        placeholder="Conte sobre sua formação, experiência e abordagem terapêutica..." 
                        className="min-h-[150px]" 
                        disabled={responderDepois}
                        maxLength={1000}
                        {...field} 
                      />
                      <div className="text-xs text-gray-500 text-right mt-1">
                        {biografiaLongaValue.length}/1000 caracteres
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Biografia profissional detalhada (máx. 1000 caracteres)
                  </FormDescription>
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
