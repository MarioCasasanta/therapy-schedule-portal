
import { supabase } from "@/integrations/supabase/client";
import { Session, SessionFormData } from "@/types/session";

export class SessionController {
  // Database functions for development
  static async getSessions(): Promise<Session[]> {
    try {
      console.log("🔍 Buscando sessões do banco de dados...");
      const { data, error } = await supabase.from("sessoes").select("*");
      if (error) {
        console.error("❌ Erro ao buscar sessões:", error);
        return [];
      }
      console.log("✅ Sessões encontradas:", data?.length || 0);
      return data || [];
    } catch (error) {
      console.error("❌ Erro ao buscar sessões:", error);
      return [];
    }
  }

  static async getSessionById(id: string): Promise<Session | null> {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("❌ Erro ao buscar sessão:", error);
        return null;
      }
      return data;
    } catch (error) {
      console.error("❌ Erro ao buscar sessão:", error);
      return null;
    }
  }

  static async createSession(sessionData: SessionFormData): Promise<Session | null> {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .insert(sessionData)
        .select();
      if (error) {
        console.error("❌ Erro ao criar sessão:", error);
        return null;
      }
      return data ? data[0] : null;
    } catch (error) {
      console.error("❌ Erro ao criar sessão:", error);
      return null;
    }
  }

  static async updateSession(id: string, sessionData: Partial<SessionFormData>): Promise<Session | null> {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .update(sessionData)
        .eq("id", id)
        .select();
      if (error) {
        console.error("❌ Erro ao atualizar sessão:", error);
        return null;
      }
      return data ? data[0] : null;
    } catch (error) {
      console.error("❌ Erro ao atualizar sessão:", error);
      return null;
    }
  }

  static async deleteSession(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("sessoes")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("❌ Erro ao excluir sessão:", error);
        return false;
      }
      return true;
    } catch (error) {
      console.error("❌ Erro ao excluir sessão:", error);
      return false;
    }
  }

  static async getAllClients() {
    try {
      console.log("🔍 Buscando clientes do banco de dados...");
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "cliente");
      
      if (error) {
        console.error("❌ Erro ao buscar clientes:", error);
        return [];
      }
      
      console.log("✅ Clientes encontrados:", data?.length || 0);
      return data || [];
    } catch (error) {
      console.error("❌ Erro ao buscar clientes:", error);
      return [];
    }
  }

  static async getAllSpecialists() {
    try {
      console.log("🔍 Buscando especialistas do banco de dados...");
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "especialista");
      
      if (error) {
        console.error("❌ Erro ao buscar especialistas:", error);
        return [];
      }
      
      console.log("✅ Especialistas encontrados:", data?.length || 0);
      return data || [];
    } catch (error) {
      console.error("❌ Erro ao buscar especialistas:", error);
      return [];
    }
  }

  static async getSessionsByClient(clientId: string): Promise<Session[]> {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .select("*")
        .eq("cliente_id", clientId);

      if (error) {
        console.error('❌ Error fetching sessions by client:', error);
        throw error;
      }

      return data as Session[] || [];
    } catch (error) {
      console.error('❌ Error in getSessionsByClient:', error);
      return [];
    }
  }

  static async getSpecialistSessionCount(specialistId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .select("id", { count: 'exact' })
        .eq("cliente_id", specialistId);

      if (error) {
        console.error('❌ Error fetching specialist session count:', error);
        return 0;
      }

      return data?.length || 0;
    } catch (error) {
      console.error('❌ Error in getSpecialistSessionCount:', error);
      return 0;
    }
  }

  static async getSpecialistDetails(specialistId: string) {
    try {
      console.log("🔍 Buscando detalhes completos do especialista:", specialistId);
      
      // Buscar dados do perfil do especialista
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", specialistId)
        .eq("role", "especialista")
        .single();

      if (profileError) {
        console.error('❌ Erro ao buscar perfil do especialista:', profileError);
        throw profileError;
      }

      // Buscar dados detalhados do especialista
      const { data: detailsData, error: detailsError } = await supabase
        .from("specialist_details")
        .select("*")
        .eq("specialist_id", specialistId)
        .single();

      if (detailsError && detailsError.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('❌ Erro ao buscar detalhes do especialista:', detailsError);
        throw detailsError;
      }

      // Buscar dados da tabela specialists
      const { data: specialistData, error: specialistError } = await supabase
        .from("specialists")
        .select("*")
        .eq("id", specialistId)
        .single();

      if (specialistError && specialistError.code !== 'PGRST116') {
        console.error('❌ Erro ao buscar dados do specialist:', specialistError);
      }

      // Combinar todos os dados
      const combinedData = {
        id: specialistId,
        full_name: profileData?.full_name,
        email: profileData?.email,
        phone: profileData?.phone,
        avatar_url: profileData?.avatar_url,
        bio: specialistData?.bio,
        specialty: specialistData?.specialty,
        rating: detailsData?.rating || specialistData?.rating || 4.8,
        experience_years: specialistData?.experience_years || 5,
        details: detailsData || {}
      };

      console.log("✅ Dados completos do especialista encontrados:", combinedData);
      return combinedData;
    } catch (error) {
      console.error('❌ Erro em getSpecialistDetails:', error);
      return null;
    }
  }
}
