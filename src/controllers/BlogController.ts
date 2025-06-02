
import { supabase } from "@/integrations/supabase/client";

/**
 * Controlador para gerenciar operações relacionadas aos posts do blog
 * Centraliza todas as operações de CRUD para posts do blog
 */
export class BlogController {
  /**
   * Busca todos os posts do blog
   * @param includeUnpublished - Se true, inclui posts não publicados (apenas para admins)
   * @returns Array de posts do blog
   */
  static async getAllPosts(includeUnpublished = false) {
    try {
      console.log("🔍 BlogController.getAllPosts - Iniciando busca de posts", { includeUnpublished });
      
      // Verificar sessão atual
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      console.log("🔑 BlogController.getAllPosts - Sessão atual:", { 
        hasSession: !!session, 
        userId: session?.user?.id,
        userEmail: session?.user?.email,
        error: sessionError 
      });
      
      let query = supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      // Se não incluir não publicados, filtra apenas os publicados
      if (!includeUnpublished) {
        query = query.eq("published", true);
        console.log("📊 BlogController.getAllPosts - Filtrando apenas posts publicados");
      } else {
        console.log("📊 BlogController.getAllPosts - Incluindo posts não publicados (admin)");
      }

      console.log("📊 BlogController.getAllPosts - Executando query...");
      const { data, error } = await query;

      if (error) {
        console.error("❌ BlogController.getAllPosts - Erro na query:", error);
        console.error("❌ BlogController.getAllPosts - Detalhes do erro:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      console.log("✅ BlogController.getAllPosts - Posts encontrados:", data?.length || 0);
      console.log("📋 BlogController.getAllPosts - Dados retornados:", data);
      return data || [];
    } catch (error) {
      console.error("❌ BlogController.getAllPosts - Erro geral:", error);
      return [];
    }
  }

  /**
   * Busca apenas posts publicados (wrapper para getAllPosts)
   * @returns Array de posts publicados
   */
  static async getPublishedPosts() {
    console.log("🔍 BlogController.getPublishedPosts - Chamando getAllPosts(false)");
    return this.getAllPosts(false);
  }

  /**
   * Busca um post específico pelo ID
   * @param id - ID do post
   * @returns Post encontrado ou null
   */
  static async getPostById(id: string) {
    try {
      console.log("🔍 BlogController.getPostById - Buscando post por ID:", id);
      
      // Verificar sessão atual
      const { data: { session } } = await supabase.auth.getSession();
      console.log("🔑 BlogController.getPostById - Sessão:", { hasSession: !!session });
      
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ BlogController.getPostById - Erro na query:", error);
        console.error("❌ BlogController.getPostById - Detalhes:", {
          message: error.message,
          code: error.code
        });
        return null;
      }

      console.log("✅ BlogController.getPostById - Post encontrado:", data?.title);
      return data;
    } catch (error) {
      console.error("❌ BlogController.getPostById - Erro geral:", error);
      return null;
    }
  }

  /**
   * Busca um post específico pelo slug
   * @param slug - Slug do post (usado na URL)
   * @returns Post encontrado ou null
   */
  static async getPostBySlug(slug: string) {
    try {
      console.log("🔍 BlogController.getPostBySlug - Buscando post por slug:", slug);
      
      // Verificar sessão atual
      const { data: { session } } = await supabase.auth.getSession();
      console.log("🔑 BlogController.getPostBySlug - Sessão:", { hasSession: !!session });
      
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("❌ BlogController.getPostBySlug - Erro na query:", error);
        console.error("❌ BlogController.getPostBySlug - Detalhes:", {
          message: error.message,
          code: error.code
        });
        return null;
      }

      console.log("✅ BlogController.getPostBySlug - Post encontrado:", data?.title);
      return data;
    } catch (error) {
      console.error("❌ BlogController.getPostBySlug - Erro geral:", error);
      return null;
    }
  }
}
