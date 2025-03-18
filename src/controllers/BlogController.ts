
import { supabase } from "@/integrations/supabase/client";

export class BlogController {
  static async getAllPosts(includeUnpublished = false) {
    try {
      let query = supabase
        .from("blog_posts")
        .select(`
          *,
          profiles(name, full_name, email)
        `)
        .order("created_at", { ascending: false });

      if (!includeUnpublished) {
        query = query.eq("published", true);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Erro ao buscar posts do blog:", error);
        throw error;
      }

      return data.map((post: any) => ({
        ...post,
        author_name: post.profiles?.full_name || post.profiles?.name || "Autor Desconhecido",
      }));
    } catch (error) {
      console.error("Erro ao buscar posts do blog:", error);
      return [];
    }
  }

  static async getPublishedPosts() {
    return this.getAllPosts(false);
  }

  static async getPostById(id: string) {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          profiles(name, full_name, email)
        `)
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao buscar post do blog:", error);
        return null;
      }

      return {
        ...data,
        author_name: data.profiles?.full_name || data.profiles?.name || "Autor Desconhecido",
      };
    } catch (error) {
      console.error("Erro ao buscar post do blog:", error);
      return null;
    }
  }

  static async getPostBySlug(slug: string) {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          profiles(name, full_name, email)
        `)
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Erro ao buscar post pelo slug:", error);
        return null;
      }

      return {
        ...data,
        author_name: data.profiles?.full_name || data.profiles?.name || "Autor Desconhecido",
      };
    } catch (error) {
      console.error("Erro ao buscar post pelo slug:", error);
      return null;
    }
  }
}
