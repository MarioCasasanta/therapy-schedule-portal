
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { format } from "date-fns";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Interface para definir a estrutura detalhada de um post
interface BlogPostDetail {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

/**
 * Função para mapear slugs para imagens específicas
 * Permite personalizar imagens por post específico ou usar padrão
 * @param slug - Slug do post
 * @returns URL da imagem do Unsplash
 */
const getBlogDetailImage = (slug: string) => {
  // Mapeamento de slugs para imagens específicas
  const imageMap: Record<string, string> = {
    "como-lidar-com-ansiedade-dia-a-dia": "photo-1488590528505-98d2b5aba04b",
    "beneficios-terapia-saude-mental": "photo-1581091226825-a6a2a5aee158",
    "alimentacao-saude-mental-relacao": "photo-1649972904349-6e44c42644a7",
    "como-superar-ansiedade": "photo-1488590528505-98d2b5aba04b",
    "relacionamentos-saudaveis": "photo-1581091226825-a6a2a5aee158",
    "mindfulness-autoconhecimento": "photo-1649972904349-6e44c42644a7"
  };
  
  const imageId = imageMap[slug] || "photo-1488590528505-98d2b5aba04b";
  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=1200&h=600&q=80`;
};

/**
 * Página individual de um post do blog
 * Busca o post pelo slug na URL e exibe o conteúdo completo
 */
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Função para buscar um post específico pelo slug
     * Valida o slug e busca apenas posts publicados
     */
    const fetchPost = async () => {
      try {
        console.log("🔍 BlogPost.fetchPost - Buscando post pelo slug:", slug);
        
        if (!slug) {
          throw new Error("Slug inválido");
        }

        // Verificar estado da autenticação
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log("🔑 BlogPost.fetchPost - Estado da sessão:", { 
          hasSession: !!session, 
          userId: session?.user?.id,
          sessionError 
        });

        console.log("📊 BlogPost.fetchPost - Executando query...");
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) {
          console.error("❌ BlogPost.fetchPost - Erro na query:", error);
          console.error("❌ BlogPost.fetchPost - Detalhes do erro:", {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
          });
          throw error;
        }

        if (!data) {
          console.error("❌ BlogPost.fetchPost - Post não encontrado para slug:", slug);
          throw new Error("Artigo não encontrado");
        }

        console.log("✅ BlogPost.fetchPost - Post encontrado:", data.title);
        console.log("📋 BlogPost.fetchPost - Dados do post:", data);
        setPost(data);
      } catch (error: any) {
        console.error("❌ BlogPost.fetchPost - Erro geral:", error);
        setError(error.message || "Não foi possível carregar o artigo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  /**
   * Função para renderizar conteúdo com quebras de parágrafo
   * Converte quebras de linha duplas em parágrafos separados
   * @param content - Conteúdo do post em texto
   * @returns Array de elementos JSX com parágrafos
   */
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  // Estado de carregamento
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

  // Estado de erro ou post não encontrado
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

  // Renderização do post completo
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Botão de voltar */}
        <Button variant="outline" size="sm" className="mb-8" onClick={() => navigate('/blog')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para o Blog
        </Button>
        
        <article>
          <header className="mb-8">
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src={getBlogDetailImage(slug || '')} 
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
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
