
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  created_at: string;
}

const getBlogImage = (index: number) => {
  const images = [
    "photo-1488590528505-98d2b5aba04b",
    "photo-1581091226825-a6a2a5aee158", 
    "photo-1649972904349-6e44c42644a7"
  ];
  return `https://images.unsplash.com/${images[index % images.length]}?auto=format&fit=crop&w=800&h=500&q=80`;
};

const FeaturedBlogCarousel = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, created_at')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) {
          throw error;
        }

        setPosts(data || []);
      } catch (error) {
        console.error("Erro ao buscar posts em destaque:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Artigos em Destaque</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conteúdo selecionado para ajudar na sua jornada terapêutica
          </p>
        </div>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {posts.map((post, index) => (
              <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                <Link to={`/blog/${post.slug}`}>
                  <Card className="h-full border overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <img 
                        src={getBlogImage(index)} 
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
            <CarouselPrevious className="static mr-4 translate-y-0" />
            <CarouselNext className="static ml-4 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedBlogCarousel;
