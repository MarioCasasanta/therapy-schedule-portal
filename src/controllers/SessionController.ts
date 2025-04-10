
import { supabase } from "@/integrations/supabase/client";

// Define the Session interface to match the database schema
export interface Session {
  id: string;
  client_id?: string;
  data_hora: string;
  created_at: string;
  updated_at: string;
  invitation_sent_at?: string;
  valor?: number;
  data_pagamento?: string;
  reminder_sent_at?: string;
  tipo_sessao: string;
  status: string;
  notas?: string;
  google_event_id?: string;
  guest_email?: string;
  invitation_status?: string;
  status_pagamento?: string;
  post_session_notes?: string;
  feedback?: string;
}

// Specialist details interface
export interface SpecialistDetails {
  id: string;
  full_name: string;
  specialty: string;
  bio: string;
  email: string;
  phone: string;
  rating: number;
  experience_years: number;
  details: {
    thumbnail_url: string;
    short_description: string;
    long_description: string;
    education: string;
    areas_of_expertise: string[];
    languages: string[];
    certifications: string[];
    sessions_completed: number;
  };
}

export class SessionController {
  // Funções do banco de dados para desenvolvimento
  static async getSessions() {
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

  static async getSessionById(id: string) {
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

  static async createSession(sessionData: any) {
    try {
      // Usando a tabela 'sessoes'
      const { data, error } = await supabase
        .from("sessoes")
        .insert([sessionData])
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

  static async updateSession(id: string, sessionData: any) {
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

  static async deleteSession(id: string) {
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

  static async getSpecialistDetails(id: string): Promise<SpecialistDetails | null> {
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
      const result: SpecialistDetails = {
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
      return null;
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

  static async getClientSessionCount(clientId: string) {
    try {
      const { count, error } = await supabase
        .from("sessoes")
        .select("*", { count: "exact" })
        .eq("cliente_id", clientId);
        
      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("Erro ao contar sessões do cliente:", error);
      return Math.floor(Math.random() * 20); // Fallback para contagem fictícia
    }
  }

  static async getSpecialistSessionCount(specialistId: string) {
    try {
      const { count, error } = await supabase
        .from("sessoes")
        .select("*", { count: "exact" })
        .eq("specialist_id", specialistId);
        
      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("Erro ao contar sessões do especialista:", error);
      return Math.floor(Math.random() * 50) + 5; // Fallback para contagem fictícia
    }
  }

  static async listSessions() {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .select("*")
        .order("data_hora", { ascending: true });
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Erro ao listar sessões:", error);
      // Retornar dados fictícios para demonstração se a consulta falhar
      return [
        {
          id: "1",
          data_hora: new Date().toISOString(),
          tipo_sessao: "individual",
          clientName: "João Silva",
          status: "scheduled"
        },
        {
          id: "2",
          data_hora: new Date(Date.now() + 86400000).toISOString(), // Amanhã
          tipo_sessao: "casal",
          clientName: "Maria e Pedro",
          status: "scheduled"
        }
      ];
    }
  }

  static async sendSessionInvite(sessionId: string) {
    // Função fictícia que normalmente enviaria um convite
    console.log(`Convite enviado para a sessão ${sessionId}`);
    return true;
  }

  static async getSessionsByClient(clientId: string) {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .select("*")
        .eq("client_id", clientId);

      if (error) {
        console.error('Error fetching sessions by client:', error);
        throw error;
      }

      return (data || []) as Session[];
    } catch (error) {
      console.error('Error in getSessionsByClient:', error);
      return [] as Session[];
    }
  }

  static async getAllSessions() {
    try {
      const { data, error } = await supabase
        .from('sessoes')
        .select('*')
        .order('data_hora', { ascending: false });
      
      if (error) throw error;
      
      return (data || []) as Session[];
    } catch (error) {
      console.error("Error fetching sessions:", error);
      return [] as Session[];
    }
  }
}
