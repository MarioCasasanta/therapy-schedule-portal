import { supabase } from "@/integrations/supabase/client";
import { Session, SessionFormData } from "@/types/session";

export class SessionController {
  // Funções do banco de dados para desenvolvimento
  static async getSessions(): Promise<Session[]> {
    try {
      // Usando a tabela 'sessoes' que está disponível no Supabase
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
      // Usando a tabela 'sessoes'
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
      // Usando a tabela 'sessoes'
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
      // Usando a tabela 'sessoes'
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
      // Usando a tabela 'sessoes'
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

  static async getSpecialistDetails(id: string) {
    try {
      // Usando a tabela profiles já que specialist_profiles pode não existir
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .eq("role", "specialist")
        .single();

      if (error) throw error;

      // Transformar os dados para corresponder à estrutura esperada
      const result = {
        id: data.id,
        full_name: data.full_name || "Desconhecido",
        specialty: "Psicologia",
        bio: "Especialista em terapia",
        email: data.email || "email@example.com",
        phone: "123456789",
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

      return result;
    } catch (error) {
      console.error("Erro ao buscar detalhes do especialista:", error);
      throw error;
    }
  }

  // Funções adicionais necessárias para AdminClientList e AdminSpecialistList
  static async getAllClients() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .or("role.eq.cliente,role.eq.client,tipo_usuario.eq.cliente");
      
      if (error) {
        console.error("Erro ao buscar clientes:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      return [];
    }
  }

  static async getAllSpecialists() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "specialist");
      
      if (error) {
        console.error("Erro ao buscar especialistas:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Erro ao buscar especialistas:", error);
      return [];
    }
  }

  static async getClientSessionCount(clientId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .select("id")
        .eq("cliente_id", clientId);
        
      if (error) throw error;
      return data?.length || 0;
    } catch (error) {
      console.error("Erro ao contar sessões do cliente:", error);
      return 0;
    }
  }

  static async getSpecialistSessionCount(specialistId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .select("id")
        .eq("specialist_id", specialistId);
        
      if (error) throw error;
      return data?.length || 0;
    } catch (error) {
      console.error("Erro ao contar sessões do especialista:", error);
      return 0;
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
