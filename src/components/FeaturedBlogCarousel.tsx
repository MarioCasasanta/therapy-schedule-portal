
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Interface para definir a estrutura de um post do blog
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  created_at: string;
}

/**
 * Função para gerar URLs de imagens do Unsplash baseadas no índice
 * Usa um array rotativo de IDs de imagens para variedade visual
 * @param index - Índice do post para determinar qual imagem usar
 * @returns URL da imagem do Unsplash
 */
const getBlogImage = (index: number) => {
  const images = [
    "photo-1488590528505-98d2b5aba04b", // Imagem de tecnologia/código
    "photo-1581091226825-a6a2a5aee158",  // Imagem de desenvolvimento
    "photo-1649972904349-6e44c42644a7", // Imagem de design
    "photo-1497316730643-415fac54a2af", // Imagem de workspace
    "photo-1507842217343-583bb7270b66"  // Imagem de tecnologia
  ];
  return `https://images.unsplash.com/${images[index % images.length]}?auto=format&fit=crop&w=800&h=500&q=80`;
};

/**
 * Componente que exibe um carrossel de posts em destaque do blog
 * Busca posts do banco de dados ou usa dados fictícios como fallback
 * Exibe o primeiro post em destaque maior e os demais em carrossel
 */
const FeaturedBlogCarousel = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /**
     * Função para buscar posts em destaque do banco de dados
     * Implementa fallback para dados fictícios em caso de erro ou dados vazios
     */
    const fetchFeaturedPosts = async () => {
      try {
        console.log("🔍 FeaturedBlogCarousel - Iniciando busca de posts em destaque");
        
        // Query direta sem usar o BlogController para evitar dependências circulares
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, created_at')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) {
          console.error("❌ FeaturedBlogCarousel - Erro na busca:", error);
          // Em caso de erro, usar posts fictícios
          setPosts(getFallbackPosts());
        } else {
          console.log("✅ FeaturedBlogCarousel - Posts encontrados:", data?.length || 0);
          
          // Se não há posts no banco, usar dados fictícios
          if (!data || data.length === 0) {
            console.log("📝 FeaturedBlogCarousel - Usando posts fictícios (banco vazio)");
            setPosts(getFallbackPosts());
          } else {
            setPosts(data);
          }
        }
      } catch (error) {
        console.error("❌ FeaturedBlogCarousel - Erro geral:", error);
        // Fallback para dados fictícios
        setPosts(getFallbackPosts());
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  /**
   * Função para gerar posts fictícios como fallback
   * Usada quando não há posts no banco ou em caso de erro
   * @returns Array de posts fictícios
   */
  const getFallbackPosts = (): BlogPost[] => {
    return [
      {
        id: "demo-1",
        title: "Como Superar a Ansiedade no Dia a Dia",
        slug: "como-superar-ansiedade",
        excerpt: "Descubra técnicas práticas para lidar com a ansiedade e viver com mais tranquilidade.",
        created_at: new Date().toISOString()
      },
      {
        id: "demo-2", 
        title: "5 Passos para Construir Relacionamentos Saudáveis",
        slug: "relacionamentos-saudaveis",
        excerpt: "Aprenda a desenvolver vínculos mais profundos e significativos com as pessoas ao seu redor.",
        created_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: "demo-3",
        title: "Mindfulness: Uma Jornada de Autoconhecimento",
        slug: "mindfulness-autoconhecimento",
        excerpt: "Explore como a prática de mindfulness pode transformar sua relação consigo mesmo.",
        created_at: new Date(Date.now() - 172800000).toISOString()
      }
    ];
  };

  // Estado de carregamento
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Se não há posts, não renderiza nada
  if (posts.length === 0) {
    console.log("⚠️ FeaturedBlogCarousel - Nenhum post disponível para exibir");
    return null;
  }

  // Separa o primeiro post (destaque) dos demais (carrossel)
  const featuredPost = posts[0];
  const smallerPosts = posts.slice(1);

  return (
    <div className="py-16 relative overflow-hidden" 
         style={{ 
           background: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)"
         }}>
      {/* Efeito de fundo decorativo */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend mode='multiply' in2='SourceGraphic' result='monoNoise'/%3E%3CfeBlend mode='soft-light' in='SourceGraphic' in2='monoNoise' result='softNoise'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
             backgroundBlendMode: 'soft-light',
             mixBlendMode: 'overlay'
           }}>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Post em destaque (grande) */}
        {featuredPost && (
          <div className="mb-12">
            <Link to={`/blog/${featuredPost.slug}`}>
              <Card className="overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all hover:shadow-xl">
                <div className="md:flex">
                  <div className="md:w-1/2 lg:w-3/5">
                    <div className="aspect-[16/9] h-full">
                      <img 
                        src={getBlogImage(0)} 
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 lg:w-2/5 p-6 md:p-8 flex flex-col justify-center">
                    <CardTitle className="text-2xl md:text-3xl mb-4">{featuredPost.title}</CardTitle>
                    <p className="text-sm text-gray-500 mb-4">
                      {format(new Date(featuredPost.created_at), 'dd/MM/yyyy')}
                    </p>
                    <p className="text-gray-700 mb-6 line-clamp-4">{featuredPost.excerpt}</p>
                    <div className="mt-auto">
                      <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        Leia o artigo completo
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}
        
        {/* Carrossel com posts menores */}
        {smallerPosts.length > 0 && (
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {smallerPosts.map((post, index) => (
                <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="h-full border overflow-hidden hover:shadow-md transition-shadow bg-white/90 backdrop-blur-sm">
                      <div className="aspect-[16/9] w-full overflow-hidden">
                        <img 
                          src={getBlogImage(index + 1)} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <CardContent className="p-5">
                        <CardTitle className="text-lg mb-2 line-clamp-2">{post.title}</CardTitle>
                        <p className="text-sm text-gray-500 mb-2">
                          {format(new Date(post.created_at), 'dd/MM/yyyy')}
                        </p>
                        <p className="line-clamp-2 text-gray-600 text-sm">{post.excerpt}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="static mr-4 translate-y-0 bg-white/90 hover:bg-white" />
              <CarouselNext className="static ml-4 translate-y-0 bg-white/90 hover:bg-white" />
            </div>
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default FeaturedBlogCarousel;
