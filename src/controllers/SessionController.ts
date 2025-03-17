
import { supabase } from "@/integrations/supabase/client";
import { Session, SessionFeedback } from "@/types/session";

export const SessionController = {
  async getSession(sessionId: string) {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .select("*")
        .eq("id", sessionId)
        .single();

      if (error) throw error;
      return data as Session;
    } catch (error: any) {
      throw new Error(`Error retrieving session: ${error.message}`);
    }
  },

  async listSessions(userId?: string, role?: string) {
    try {
      let query = supabase.from("sessoes").select("*");

      if (userId && role === "cliente") {
        query = query.eq("cliente_id", userId);
      } else if (userId && role === "especialista") {
        query = query.eq("especialista_id", userId);
      }

      const { data, error } = await query.order("data", { ascending: false });

      if (error) throw error;
      return data as Session[];
    } catch (error: any) {
      throw new Error(`Error listing sessions: ${error.message}`);
    }
  },

  async createSession(sessionData: Partial<Session>) {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .insert([sessionData])
        .select()
        .single();

      if (error) throw error;
      return data as Session;
    } catch (error: any) {
      throw new Error(`Error creating session: ${error.message}`);
    }
  },

  async updateSession(sessionId: string, updates: Partial<Session>) {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .update(updates)
        .eq("id", sessionId)
        .select()
        .single();

      if (error) throw error;
      return data as Session;
    } catch (error: any) {
      throw new Error(`Error updating session: ${error.message}`);
    }
  },

  async deleteSession(sessionId: string) {
    try {
      const { error } = await supabase
        .from("sessoes")
        .delete()
        .eq("id", sessionId);

      if (error) throw error;
      return true;
    } catch (error: any) {
      throw new Error(`Error deleting session: ${error.message}`);
    }
  },

  async submitFeedback(sessionId: string, feedback: SessionFeedback) {
    try {
      // First update the session with feedback
      const { data: updatedSession, error: sessionError } = await supabase
        .from("sessoes")
        .update({
          feedback: feedback,
          status: "completed"
        })
        .eq("id", sessionId)
        .select()
        .single();

      if (sessionError) throw sessionError;

      // Then create a record in the feedback table
      const { data: feedbackData, error: feedbackError } = await supabase
        .from("session_feedback")
        .insert([
          {
            session_id: sessionId,
            rating: feedback.rating,
            comments: feedback.comments,
            submitted_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (feedbackError) throw feedbackError;

      return {
        session: updatedSession,
        feedback: feedbackData
      };
    } catch (error: any) {
      throw new Error(`Error submitting feedback: ${error.message}`);
    }
  },

  async getClients(especialistaId?: string) {
    try {
      let query = supabase.from("sessoes").select(`
        cliente_id
      `).eq("status", "completed");

      if (especialistaId) {
        query = query.eq("especialista_id", especialistaId);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Extract unique client IDs
      const clientIds = [...new Set(data.map(session => session.cliente_id))];

      // Get client details for each unique ID
      const clientsPromises = clientIds.map(async (id) => {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, email, created_at")
          .eq("id", id)
          .single();

        if (error) throw error;
        return data;
      });

      return await Promise.all(clientsPromises);
    } catch (error: any) {
      throw new Error(`Error getting clients: ${error.message}`);
    }
  },

  async getAllClients() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, created_at, tipo_usuario")
        .eq("role", "cliente");

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw new Error(`Error getting all clients: ${error.message}`);
    }
  },

  async getAllSpecialists() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .eq("role", "especialista");

      if (error) throw error;
      return data;
    } catch (error: any) {
      throw new Error(`Error getting specialists: ${error.message}`);
    }
  },

  async getClientSessionCount(clientId: string) {
    try {
      const { count, error } = await supabase
        .from("sessoes")
        .select("*", { count: 'exact', head: true })
        .eq("cliente_id", clientId)
        .eq("status", "completed");

      if (error) throw error;
      return count;
    } catch (error: any) {
      throw new Error(`Error getting client session count: ${error.message}`);
    }
  },

  async listClients(especialistaId?: string) {
    try {
      if (especialistaId) {
        // Get all sessions for this specialist
        const { data: sessions, error: sessionsError } = await supabase
          .from("sessoes")
          .select("cliente_id")
          .eq("especialista_id", especialistaId);

        if (sessionsError) throw sessionsError;

        // Extract unique client IDs
        const clientIds = [...new Set(sessions.map(session => session.cliente_id))];

        if (clientIds.length === 0) {
          return [];
        }

        // Get client information
        const { data: clients, error: clientsError } = await supabase
          .from("profiles")
          .select("id, full_name, name, email, created_at")
          .in("id", clientIds);

        if (clientsError) throw clientsError;
        return clients;
      } else {
        // Return all clients if no specialist ID is provided
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, name, email, created_at")
          .eq("role", "cliente");

        if (error) throw error;
        return data;
      }
    } catch (error: any) {
      throw new Error(`Error listing clients: ${error.message}`);
    }
  }
};
