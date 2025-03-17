
import { supabase } from "@/integrations/supabase/client";

export class SessionController {
  // Mock database functions for development
  static async getSessions() {
    try {
      // Using 'session_statistics' which is an available table in Supabase
      // Adjust query as needed based on your actual database schema
      const { data, error } = await supabase.from("session_statistics").select("*");
      if (error) {
        console.error("Error fetching sessions:", error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error("Error fetching sessions:", error);
      return [];
    }
  }

  static async getSessionById(id: string) {
    try {
      // Adjust based on your actual database schema
      const { data, error } = await supabase
        .from("session_statistics")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching session:", error);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error fetching session:", error);
      return null;
    }
  }

  static async createSession(sessionData: any) {
    try {
      // Adjust based on your actual database schema
      const { data, error } = await supabase
        .from("session_statistics")
        .insert([sessionData])
        .select();
      if (error) {
        console.error("Error creating session:", error);
        return null;
      }
      return data ? data[0] : null;
    } catch (error) {
      console.error("Error creating session:", error);
      return null;
    }
  }

  static async updateSession(id: string, sessionData: any) {
    try {
      // Adjust based on your actual database schema
      const { data, error } = await supabase
        .from("session_statistics")
        .update(sessionData)
        .eq("id", id)
        .select();
      if (error) {
        console.error("Error updating session:", error);
        return null;
      }
      return data ? data[0] : null;
    } catch (error) {
      console.error("Error updating session:", error);
      return null;
    }
  }

  static async deleteSession(id: string) {
    try {
      // Adjust based on your actual database schema
      const { error } = await supabase
        .from("session_statistics")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("Error deleting session:", error);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error deleting session:", error);
      return false;
    }
  }

  static async getSpecialistDetails(id: string) {
    try {
      // Using profiles table since specialist_profiles may not exist
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .eq("role", "specialist")
        .single();

      if (error) throw error;

      // Transform the data to match the expected structure
      const result = {
        id: data.id,
        full_name: data.full_name || "Unknown",
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
      console.error("Error fetching specialist details:", error);
      throw error;
    }
  }

  // Additional functions needed by AdminClientList and AdminSpecialistList
  static async getAllClients() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "client");
      
      if (error) {
        console.error("Error fetching clients:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error fetching clients:", error);
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
        console.error("Error fetching specialists:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Error fetching specialists:", error);
      return [];
    }
  }

  static async getClientSessionCount(clientId: string) {
    // For now, return a mock count
    return Math.floor(Math.random() * 20);
  }

  static async getSpecialistSessionCount(specialistId: string) {
    // For now, return a mock count
    return Math.floor(Math.random() * 50) + 5;
  }

  static async listSessions() {
    // Return mock session data for demonstration
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
        data_hora: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        tipo_sessao: "casal",
        clientName: "Maria e Pedro",
        status: "scheduled"
      }
    ];
  }

  static async sendSessionInvite(sessionId: string) {
    // Mock function that would normally send an invitation
    console.log(`Invitation sent for session ${sessionId}`);
    return true;
  }
}
