
import { supabase } from "@/integrations/supabase/client";

export class BlogController {
  static async getAllPosts(includeUnpublished = false) {
    try {
      console.log("🔍 Buscando posts do blog...", { includeUnpublished });
      
      let query = supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!includeUnpublished) {
        query = query.eq("published", true);
      }

      const { data, error } = await query;

      if (error) {
        console.error("❌ Erro ao buscar posts do blog:", error);
        throw error;
      }

      console.log("✅ Posts encontrados:", data?.length || 0);
      return data || [];
    } catch (error) {
      console.error("❌ Erro ao buscar posts do blog:", error);
      return [];
    }
  }

  static async getPublishedPosts() {
    return this.getAllPosts(false);
  }

  static async getPostById(id: string) {
    try {
      console.log("🔍 Buscando post por ID:", id);
      
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ Erro ao buscar post do blog:", error);
        return null;
      }

      console.log("✅ Post encontrado:", data?.title);
      return data;
    } catch (error) {
      console.error("❌ Erro ao buscar post do blog:", error);
      return null;
    }
  }

  static async getPostBySlug(slug: string) {
    try {
      console.log("🔍 Buscando post por slug:", slug);
      
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("❌ Erro ao buscar post pelo slug:", error);
        return null;
      }

      console.log("✅ Post encontrado por slug:", data?.title);
      return data;
    } catch (error) {
      console.error("❌ Erro ao buscar post pelo slug:", error);
      return null;
    }
  }
}
