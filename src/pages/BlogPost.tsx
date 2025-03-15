
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { format } from "date-fns";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostDetail {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) {
          throw new Error("Slug inválido");
        }

        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          throw new Error("Artigo não encontrado");
        }

        setPost(data);
      } catch (error: any) {
        console.error("Erro ao buscar post do blog:", error);
        setError(error.message || "Não foi possível carregar o artigo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Function to render content with paragraph breaks
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-32 pb-16 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-32 pb-16 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
          <p className="text-gray-600 mb-8">{error || "O artigo que você está procurando não existe ou não está disponível."}</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para o Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
        <Button variant="outline" size="sm" className="mb-8" onClick={() => navigate('/blog')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para o Blog
        </Button>
        
        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="text-gray-600">
              <time dateTime={post.created_at}>
                {format(new Date(post.created_at), 'dd MMMM, yyyy')}
              </time>
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            {renderContent(post.content)}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
