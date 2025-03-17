
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@/types/session";

export const SessionController = {
  getSession: async (sessionId: string): Promise<Session> => {
    const { data, error } = await supabase
      .from("sessoes")
      .select("*, profiles:cliente_id(*)")
      .eq("id", sessionId)
      .single();

    if (error) throw error;
    return data as Session;
  },

  listSessions: async (userId?: string, role?: string): Promise<Session[]> => {
    let query = supabase.from("sessoes").select("*, profiles:cliente_id(*)");

    if (userId && role) {
      if (role === "especialista") {
        query = query.eq("especialista_id", userId);
      } else if (role === "cliente") {
        query = query.eq("cliente_id", userId);
      }
    }

    const { data, error } = await query.order("data_hora", { ascending: false });

    if (error) throw error;
    return data as Session[];
  },

  createSession: async (sessionData: any): Promise<Session> => {
    // Make sure data_hora is provided as required by the database
    if (!sessionData.data_hora) {
      throw new Error("data_hora is required");
    }
    
    const { data, error } = await supabase.from("sessoes").insert(sessionData).select().single();

    if (error) throw error;
    return data as Session;
  },

  updateSession: async (sessionId: string, sessionData: Partial<Session>): Promise<Session> => {
    const { data, error } = await supabase
      .from("sessoes")
      .update(sessionData)
      .eq("id", sessionId)
      .select()
      .single();

    if (error) throw error;
    return data as Session;
  },

  deleteSession: async (sessionId: string): Promise<void> => {
    const { error } = await supabase.from("sessoes").delete().eq("id", sessionId);

    if (error) throw error;
  },

  sendSessionInvite: async (sessionId: string): Promise<void> => {
    const { error } = await supabase
      .from("sessoes")
      .update({
        invitation_sent_at: new Date().toISOString(),
        invitation_status: "enviado",
      })
      .eq("id", sessionId);

    if (error) throw error;
  },

  submitFeedback: async (
    sessionId: string,
    rating: number,
    comments: string
  ): Promise<void> => {
    const { error } = await supabase
      .from("sessoes")
      .update({
        feedback: comments,
        feedback_rating: rating,
        feedback_submitted_at: new Date().toISOString(),
      })
      .eq("id", sessionId);

    if (error) throw error;
  },

  getClientSessionCount: async (clientId: string): Promise<number> => {
    const { count, error } = await supabase
      .from("sessoes")
      .select("*", { count: "exact", head: true })
      .eq("cliente_id", clientId);

    if (error) throw error;
    return count || 0;
  },

  getAllClients: async (): Promise<{id: string, full_name: string, email: string, created_at: string}[]> => {
    // Get all clients regardless of association with a specialist
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, created_at")
      .eq("role", "cliente")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  listClients: async (especialistaId?: string): Promise<{id: string, full_name: string, email: string, created_at: string}[]> => {
    if (especialistaId) {
      // Get clients assigned to this specialist
      const { data: sessionData, error: sessionError } = await supabase
        .from("sessoes")
        .select("cliente_id")
        .eq("especialista_id", especialistaId)
        .order("data_hora", { ascending: false });

      if (sessionError) throw sessionError;

      if (sessionData && sessionData.length > 0) {
        const clientIds = [...new Set(sessionData.map((session) => session.cliente_id))];
        
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, email, created_at")
          .in("id", clientIds)
          .eq("role", "cliente");

        if (error) throw error;
        return data || [];
      } else {
        // No clients found for this specialist
        return [];
      }
    } else {
      // If no especialistaId provided, return all clients
      return SessionController.getAllClients();
    }
  },

  // Alias for backward compatibility
  list: async (): Promise<Session[]> => {
    return SessionController.listSessions();
  },

  delete: async (sessionId: string): Promise<void> => {
    return SessionController.deleteSession(sessionId);
  },

  sendInvite: async (sessionId: string): Promise<void> => {
    return SessionController.sendSessionInvite(sessionId);
  },

  getAllSpecialists: async (): Promise<{id: string, full_name: string, email: string, created_at: string, bio?: string, specialty?: string}[]> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, created_at, bio, specialty")
      .eq("role", "especialista")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },
  
  searchSpecialists: async (searchTerm: string): Promise<{id: string, full_name: string, email: string, created_at: string, bio?: string, specialty?: string}[]> => {
    let query = supabase
      .from("profiles")
      .select("id, full_name, email, created_at, bio, specialty")
      .eq("role", "especialista");
      
    if (searchTerm) {
      query = query.or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,specialty.ilike.%${searchTerm}%`);
    }
    
    const { data, error } = await query.order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  },
  
  getSpecialistSessionCount: async (specialistId: string): Promise<number> => {
    const { count, error } = await supabase
      .from("sessoes")
      .select("*", { count: "exact", head: true })
      .eq("especialista_id", specialistId);

    if (error) throw error;
    return count || 0;
  }
};
