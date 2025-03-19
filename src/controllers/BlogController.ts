
import { supabase } from "@/integrations/supabase/client";

export class BlogController {
  static async getAllPosts(includeUnpublished = false) {
    try {
      let query = supabase
        .from("blog_posts")
        .select(`
          *
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
        author_name: "Autor" // Simplified since relation query was causing issues
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
        .select(`*`)
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao buscar post do blog:", error);
        return null;
      }

      return {
        ...data,
        author_name: "Autor" // Simplified since relation query was causing issues
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
        .select(`*`)
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Erro ao buscar post pelo slug:", error);
        return null;
      }

      return {
        ...data,
        author_name: "Autor" // Simplified since relation query was causing issues
      };
    } catch (error) {
      console.error("Erro ao buscar post pelo slug:", error);
      return null;
    }
  }

  static async createPost(postData: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    published: boolean;
    author_id: string;
  }) {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert(postData)
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar post do blog:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Erro ao criar post do blog:", error);
      throw error;
    }
  }
}
