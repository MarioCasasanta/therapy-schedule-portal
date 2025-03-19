
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

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
    "photo-1649972904349-6e44c42644a7",
    "photo-1497316730643-415fac54a2af",
    "photo-1507842217343-583bb7270b66"
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
          .limit(5);

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

  const featuredPost = posts[0];

  return (
    <div className="py-16 relative overflow-hidden" 
         style={{ 
           background: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)"
         }}>
      {/* Colorful watercolor-like background effect */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend mode='multiply' in2='SourceGraphic' result='monoNoise'/%3E%3CfeBlend mode='soft-light' in='SourceGraphic' in2='monoNoise' result='softNoise'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
             backgroundBlendMode: 'soft-light',
             mixBlendMode: 'overlay'
           }}>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {featuredPost && (
          <div>
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
      </div>
    </div>
  );
};

export default FeaturedBlogCarousel;
