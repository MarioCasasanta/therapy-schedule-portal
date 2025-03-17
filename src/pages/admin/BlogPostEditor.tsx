
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const blogPostSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  slug: z.string().min(3, "O slug deve ter pelo menos 3 caracteres").regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
  excerpt: z.string().min(10, "O resumo deve ter pelo menos 10 caracteres"),
  content: z.string().min(50, "O conteúdo deve ter pelo menos 50 caracteres"),
  published: z.boolean().default(false)
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

const BlogPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const isEditMode = !!id;

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      published: false
    },
    mode: "onChange"
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
          navigate("/auth", { replace: true });
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError || !profile || profile.role !== 'admin') {
          navigate("/client-dashboard", { replace: true });
          return;
        }

        if (isEditMode) {
          // Fetch existing post data
          const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();

          if (error) {
            toast({
              variant: "destructive",
              title: "Erro",
              description: "Não foi possível carregar o artigo."
            });
            navigate("/admin/blog-posts");
            return;
          }

          form.reset({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            published: data.published
          });
        }

        setIsLoading(false);
      } catch (error) {
        console.error("❌ Erro inesperado:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, id, isEditMode, form, toast]);

  const onSubmit = async (values: BlogPostFormValues) => {
    setIsSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast({
          variant: "destructive",
          title: "Sessão expirada",
          description: "Faça login novamente para continuar."
        });
        navigate("/auth");
        return;
      }

      if (isEditMode) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: values.title,
            slug: values.slug,
            excerpt: values.excerpt,
            content: values.content,
            published: values.published,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Artigo atualizado",
          description: "O artigo foi atualizado com sucesso."
        });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title: values.title,
            slug: values.slug,
            excerpt: values.excerpt,
            content: values.content,
            published: values.published,
            author_id: session.user.id
          });

        if (error) throw error;

        toast({
          title: "Artigo criado",
          description: "O artigo foi criado com sucesso."
        });
      }

      navigate("/admin/blog-posts");
    } catch (error: any) {
      console.error("Erro ao salvar artigo:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Não foi possível salvar o artigo."
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Function to auto-generate slug from title
  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-'); // Replace multiple hyphens with single hyphen
    
    form.setValue('slug', slug);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-xl">Carregando...</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath="/admin/blog-posts" />
        <SidebarInset className="overflow-auto">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-2xl font-semibold">
                {isEditMode ? "Editar Artigo" : "Novo Artigo"}
              </h1>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Título do artigo"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                if (!isEditMode && !form.getValues('slug')) {
                                  generateSlug(e.target.value);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL do artigo (slug)</FormLabel>
                          <FormControl>
                            <Input placeholder="url-do-artigo" {...field} />
                          </FormControl>
                          <FormDescription>
                            Este será o endereço do artigo: /blog/{field.value}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resumo</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Breve resumo do artigo" 
                              className="h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Este resumo será exibido na listagem de artigos.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="published"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Publicar</FormLabel>
                            <FormDescription>
                              {field.value ? "O artigo está visível publicamente" : "O artigo está salvo como rascunho"}
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conteúdo</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Conteúdo completo do artigo" 
                            className="h-full min-h-[500px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {isEditMode ? "Atualizar" : "Salvar"} Artigo
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default BlogPostEditor;
