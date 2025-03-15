
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_id: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  author_name?: string;
}

const BlogPosts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const fetchBlogPosts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles:author_id (name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform data to match the BlogPost interface with author name
      const postsWithAuthorName = data.map((post: any) => ({
        ...post,
        author_name: post.profiles?.name || 'Autor Desconhecido'
      }));

      setBlogPosts(postsWithAuthorName);
    } catch (error: any) {
      console.error("Erro ao buscar posts do blog:", error.message);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os posts do blog."
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setBlogPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
      
      toast({
        title: "Post excluído",
        description: "O post do blog foi excluído com sucesso."
      });
    } catch (error: any) {
      console.error("Erro ao excluir post:", error.message);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível excluir o post do blog."
      });
    }
  };

  const handlePublishToggle = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !currentStatus })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setBlogPosts((prevPosts) => 
        prevPosts.map(post => 
          post.id === id ? { ...post, published: !currentStatus } : post
        )
      );
      
      toast({
        title: currentStatus ? "Post despublicado" : "Post publicado",
        description: `O post foi ${currentStatus ? "despublicado" : "publicado"} com sucesso.`
      });
    } catch (error: any) {
      console.error("Erro ao atualizar status do post:", error.message);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o status do post."
      });
    }
  };

  useEffect(() => {
    let isAuthenticated = false;

    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("❌ Erro ao obter sessão:", sessionError);
          setIsLoading(false);
          return;
        }

        if (!session?.user) {
          console.warn("⚠️ Nenhum usuário autenticado. Redirecionando...");
          navigate("/auth", { replace: true });
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError || !profile) {
          console.error("❌ Erro ao buscar perfil do usuário:", profileError);
          navigate("/auth", { replace: true });
          return;
        }

        if (profile.role !== 'admin') {
          console.warn("⚠️ Usuário não é admin. Redirecionando...");
          navigate("/client-dashboard", { replace: true });
          return;
        }

        fetchBlogPosts();
      } catch (error) {
        console.error("❌ Erro inesperado:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, fetchBlogPosts]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-xl">Carregando...</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath="/admin/blog-posts" />
        <SidebarInset className="overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Gerenciar Artigos do Blog</h1>
              <Button onClick={() => navigate("/admin/blog-posts/new")}>
                <Plus className="h-4 w-4 mr-2" /> Novo Artigo
              </Button>
            </div>

            {blogPosts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <p className="text-lg text-gray-500 mb-4">Nenhum artigo encontrado</p>
                  <Button onClick={() => navigate("/admin/blog-posts/new")}>
                    <Plus className="h-4 w-4 mr-2" /> Criar Primeiro Artigo
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {blogPosts.map((post) => (
                  <Card key={post.id} className={post.published ? "" : "opacity-70"}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => navigate(`/blog/${post.slug}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => navigate(`/admin/blog-posts/edit/${post.id}`)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(post.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-2">
                        Por {post.author_name} • {format(new Date(post.created_at), 'dd/MM/yyyy')}
                      </p>
                      <p className="line-clamp-2 text-gray-700 mb-3">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {post.published ? 'Publicado' : 'Rascunho'}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handlePublishToggle(post.id, post.published)}
                        >
                          {post.published ? 'Despublicar' : 'Publicar'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default BlogPosts;
