
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  author_name?: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            profiles:author_id (name)
          `)
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Transform data to match the BlogPost interface with author name
        const postsWithAuthorName = data.map((post: any) => ({
          ...post,
          author_name: post.profiles?.name || 'Autor Desconhecido'
        }));

        setPosts(postsWithAuthorName);
      } catch (error) {
        console.error("Erro ao buscar posts do blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Artigos, notícias e dicas para ajudar você na sua jornada de cuidado emocional.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl text-gray-600">Nenhum artigo publicado ainda.</h2>
            <p className="text-gray-500 mt-2">Volte em breve para novos conteúdos.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="h-full">
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2">
                      Por {post.author_name} • {format(new Date(post.created_at), 'dd/MM/yyyy')}
                    </p>
                    <p className="line-clamp-4 text-gray-700">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-primary font-medium">Ler mais</p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
