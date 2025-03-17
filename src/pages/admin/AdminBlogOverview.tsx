
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { BlogController } from "@/controllers/BlogController";
import { Eye, Edit, Trash2, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author_id: string;
  author_name?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const AdminBlogOverview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate("/auth", { replace: true });
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role !== "admin") {
        navigate("/client-dashboard", { replace: true });
        return;
      }

      fetchPosts();
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      navigate("/auth", { replace: true });
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const postsData = await BlogController.getAllPosts(true); // incluir não publicados
      setPosts(postsData);
      setFilteredPosts(postsData);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os posts do blog."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(term) || 
      post.excerpt.toLowerCase().includes(term) ||
      post.author_name?.toLowerCase().includes(term)
    );
    
    setFilteredPosts(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este post?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      setFilteredPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      
      toast({
        title: "Post excluído",
        description: "O post do blog foi excluído com sucesso."
      });
    } catch (error: any) {
      console.error("Erro ao excluir post:", error);
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
        .from("blog_posts")
        .update({ published: !currentStatus })
        .eq("id", id);

      if (error) {
        throw error;
      }

      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === id ? { ...post, published: !currentStatus } : post
        )
      );
      
      setFilteredPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === id ? { ...post, published: !currentStatus } : post
        )
      );
      
      toast({
        title: currentStatus ? "Post despublicado" : "Post publicado",
        description: `O post foi ${currentStatus ? "despublicado" : "publicado"} com sucesso.`
      });
    } catch (error: any) {
      console.error("Erro ao atualizar status do post:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o status do post."
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar currentPath="/admin/blog-overview" />
        <SidebarInset className="overflow-auto">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-semibold">Visão Geral do Blog</h1>
                <p className="text-gray-500">Gerencie todos os posts publicados e não publicados</p>
              </div>
              <div className="flex gap-2 flex-wrap w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Pesquisar posts..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-8"
                  />
                </div>
                <Button onClick={() => navigate("/admin/blog-posts/new")}>
                  <Plus className="h-4 w-4 mr-2" /> Novo Post
                </Button>
                <Button variant="outline" onClick={() => navigate("/blog")}>
                  <Eye className="h-4 w-4 mr-2" /> Ver Blog
                </Button>
              </div>
            </div>

            {isLoading ? (
              <Card className="w-full p-6">
                <div className="flex justify-center">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span>Carregando posts...</span>
                  </div>
                </div>
              </Card>
            ) : filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {searchTerm ? (
                    <>
                      <p className="text-lg text-gray-500 mb-4">Nenhum post encontrado para "{searchTerm}"</p>
                      <Button variant="outline" onClick={() => setSearchTerm("")}>
                        Limpar Pesquisa
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-gray-500 mb-4">Nenhum post encontrado</p>
                      <Button onClick={() => navigate("/admin/blog-posts/new")}>
                        <Plus className="h-4 w-4 mr-2" /> Criar Primeiro Post
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Posts do Blog ({filteredPosts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Data de Criação</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.map((post) => (
                        <TableRow key={post.id} className={!post.published ? "opacity-70" : ""}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>
                            <Badge variant={post.published ? "default" : "secondary"}>
                              {post.published ? "Publicado" : "Rascunho"}
                            </Badge>
                          </TableCell>
                          <TableCell>{post.author_name}</TableCell>
                          <TableCell>{format(new Date(post.created_at), "dd/MM/yyyy")}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handlePublishToggle(post.id, post.published)}
                              >
                                {post.published ? "Despublicar" : "Publicar"}
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => navigate(`/blog/${post.slug}`)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => navigate(`/admin/blog-posts/edit/${post.id}`)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 hover:text-red-700" 
                                onClick={() => handleDelete(post.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminBlogOverview;
