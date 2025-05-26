
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

  // Direct database operations
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
