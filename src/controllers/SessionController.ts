
import { Session, SessionFormData } from "@/types/session";
import { SessionService } from "@/services/SessionService";
import { supabase } from "@/integrations/supabase/client";

export class SessionController {
  // Session CRUD operations
  static async getSessions(): Promise<Session[]> {
    return SessionService.getSessions();
  }

  static async getSessionById(id: string): Promise<Session | null> {
    return SessionService.getSessionById(id);
  }

  static async createSession(sessionData: SessionFormData): Promise<Session | null> {
    return SessionService.createSession(sessionData);
  }

  static async updateSession(id: string, sessionData: Partial<SessionFormData>): Promise<Session | null> {
    return SessionService.updateSession(id, sessionData);
  }

  static async deleteSession(id: string): Promise<boolean> {
    return SessionService.deleteSession(id);
  }

  static async listSessions(): Promise<Session[]> {
    return SessionService.listSessions();
  }

  static async sendSessionInvite(sessionId: string): Promise<boolean> {
    return SessionService.sendSessionInvite(sessionId);
  }

  static async getSessionsByClient(clientId: string): Promise<Session[]> {
    return SessionService.getSessionsByClient(clientId);
  }

  // Direct database operations without circular dependencies
  static async getSpecialistDetails(id: string) {
    try {
      console.log("🔍 Buscando detalhes do especialista:", id);
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .eq("role", "especialista")
        .single();

      if (error) {
        console.error("❌ Erro ao buscar especialista:", error);
        throw error;
      }

      console.log("✅ Especialista encontrado:", data);

      return {
        id: data.id,
        full_name: data.full_name || "Desconhecido",
        specialty: "Psicologia",
        bio: "Especialista em terapia",
        email: data.email || "email@example.com",
        phone: data.phone || "123456789",
        rating: 4.8,
        experience_years: 5,
        details: {
          thumbnail_url: "https://via.placeholder.com/150",
          short_description: "Terapeuta experiente",
          long_description: "Especialista com vários anos de experiência",
          education: "Universidade de São Paulo",
          areas_of_expertise: ["Terapia de casal", "Ansiedade", "Depressão"],
          languages: ["Português", "Inglês"],
          certifications: ["Psicologia Clínica"],
          sessions_completed: 100,
        },
      };
    } catch (error) {
      console.error("❌ Erro ao buscar detalhes do especialista:", error);
      throw error;
    }
  }

  static async getAllSpecialists() {
    try {
      console.log("🔍 Buscando todos os especialistas...");
      
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

  static async getAllClients() {
    try {
      console.log("🔍 Buscando todos os clientes...");
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .or("role.eq.cliente,role.eq.client,tipo_usuario.eq.cliente");
      
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

  static async getSpecialistSessionCount(specialistId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from("sessoes")
        .select("*", { count: 'exact', head: true })
        .eq("specialist_id", specialistId);
        
      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("❌ Erro ao contar sessões do especialista:", error);
      return 0;
    }
  }

  static async getClientSessionCount(clientId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from("sessoes")
        .select("*", { count: 'exact', head: true })
        .eq("cliente_id", clientId);
        
      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("❌ Erro ao contar sessões do cliente:", error);
      return 0;
    }
  }
}
