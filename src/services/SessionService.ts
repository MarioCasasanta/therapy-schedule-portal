
import { supabase } from "@/integrations/supabase/client";
import { Session, SessionFormData } from "@/types/session";

export class SessionService {
  static async getSessions(): Promise<Session[]> {
    try {
      const { data, error } = await supabase.from("sessoes").select("*");
      if (error) {
        console.error("Erro ao buscar sessões:", error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error("Erro ao buscar sessões:", error);
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
        console.error("Erro ao buscar sessão:", error);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Erro ao buscar sessão:", error);
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
        console.error("Erro ao criar sessão:", error);
        return null;
      }
      return data ? data[0] : null;
    } catch (error) {
      console.error("Erro ao criar sessão:", error);
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
        console.error("Erro ao atualizar sessão:", error);
        return null;
      }
      return data ? data[0] : null;
    } catch (error) {
      console.error("Erro ao atualizar sessão:", error);
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
        console.error("Erro ao excluir sessão:", error);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Erro ao excluir sessão:", error);
      return false;
    }
  }

  static async listSessions(): Promise<Session[]> {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .select("*")
        .order("data_hora", { ascending: true });
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Erro ao listar sessões:", error);
      return [];
    }
  }

  static async sendSessionInvite(sessionId: string): Promise<boolean> {
    console.log(`Convite enviado para a sessão ${sessionId}`);
    return true;
  }

  static async getSessionsByClient(clientId: string): Promise<Session[]> {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .select("*")
        .eq("cliente_id", clientId);

      if (error) {
        console.error('Error fetching sessions by client:', error);
        throw error;
      }

      return data as Session[] || [];
    } catch (error) {
      console.error('Error in getSessionsByClient:', error);
      return [];
    }
  }
}
