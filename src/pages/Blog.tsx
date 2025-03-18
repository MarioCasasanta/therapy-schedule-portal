
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlogController } from "@/controllers/BlogController";
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

// Helper function to get image based on post index
const getBlogImage = (index: number) => {
  const images = [
    "photo-1488590528505-98d2b5aba04b",
    "photo-1581091226825-a6a2a5aee158", 
    "photo-1649972904349-6e44c42644a7",
    "photo-1497316730643-415fac54a2af",
    "photo-1507842217343-583bb7270b66"
  ];
  return `https://images.unsplash.com/${images[index % images.length]}?auto=format&fit=crop&w=800&h=400&q=80`;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await BlogController.getPublishedPosts();
        setPosts(postsData);
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
      
      {/* Featured Posts Section */}
      <div className="py-16 relative overflow-hidden bg-gray-100">
        {/* Colorful watercolor-like background effect */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend mode='multiply' in2='SourceGraphic' result='monoNoise'/%3E%3CfeBlend mode='soft-light' in='SourceGraphic' in2='monoNoise' result='softNoise'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
               backgroundBlendMode: 'soft-light',
               mixBlendMode: 'overlay'
             }}>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Artigos em Destaque</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Confira nossos artigos mais recentes sobre saúde mental e bem-estar emocional
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum artigo em destaque disponível no momento.</p>
            </div>
          ) : (
            <>
              {/* Featured post (first post) */}
              {posts.length > 0 && (
                <div className="mb-12">
                  <Link to={`/blog/${posts[0].slug}`}>
                    <Card className="overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm transition-all hover:shadow-xl">
                      <div className="md:flex">
                        <div className="md:w-1/2 lg:w-3/5">
                          <div className="aspect-[16/9] h-full">
                            <img 
                              src={getBlogImage(0)} 
                              alt={posts[0].title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="md:w-1/2 lg:w-2/5 p-6 md:p-8 flex flex-col justify-center">
                          <CardTitle className="text-2xl md:text-3xl mb-4">{posts[0].title}</CardTitle>
                          <p className="text-sm text-gray-500 mb-4">
                            {format(new Date(posts[0].created_at), 'dd/MM/yyyy')}
                          </p>
                          <p className="text-gray-700 mb-6 line-clamp-4">{posts[0].excerpt}</p>
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
              
              {/* Grid of smaller posts */}
              {posts.length > 1 && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {posts.slice(1, 5).map((post, index) => (
                    <Link to={`/blog/${post.slug}`} key={post.id}>
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
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="pt-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Todos os Artigos</h1>
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
            {posts.map((post, index) => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="h-full">
                <Card className="h-full transition-shadow hover:shadow-md overflow-hidden">
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <img 
                      src={getBlogImage(index)} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2">
                      {format(new Date(post.created_at), 'dd/MM/yyyy')}
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
