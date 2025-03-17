
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

  getSpecialistSessions: async (specialistId: string): Promise<Session[]> => {
    const { data, error } = await supabase
      .from("sessoes")
      .select("*")
      .eq("especialista_id", specialistId);

    if (error) throw error;
    return data as Session[];
  },

  getClients: async (): Promise<{id: string, full_name: string, email: string, created_at: string}[]> => {
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
    if (especialistaId && especialistaId !== 'all') {
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
      return SessionController.getClients();
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

  // Method to get all specialists
  getSpecialists: async (): Promise<{
    id: string, 
    full_name?: string, 
    email?: string, 
    created_at: string, 
    specialty?: string,
    bio?: string,
    experience_years?: number,
    rating?: number
  }[]> => {
    // First query profiles table for users with role "especialista"
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("id, full_name, email, created_at")
      .eq("role", "especialista")
      .order("created_at", { ascending: false });
    
    if (profilesError) throw profilesError;
    
    // If we have specialists in the profiles table
    if (profilesData && profilesData.length > 0) {
      const specialistIds = profilesData.map(profile => profile.id);
      
      // Check if there's additional data in the specialists table
      const { data: specialistsData, error: specialistsError } = await supabase
        .from("specialists")
        .select("id, specialty, bio, experience_years, rating")
        .in("id", specialistIds);
        
      if (specialistsError) throw specialistsError;
      
      // Combine the data from both tables
      const specialistsMap = (specialistsData || []).reduce((map, specialist) => {
        map[specialist.id] = specialist;
        return map;
      }, {} as Record<string, any>);
      
      // Map profiles with specialist details
      return profilesData.map(profile => {
        const specialistDetails = specialistsMap[profile.id] || {};
        
        return {
          ...profile,
          specialty: specialistDetails.specialty || "Não especificada",
          bio: specialistDetails.bio || "",
          experience_years: specialistDetails.experience_years || 0,
          rating: specialistDetails.rating || 0
        };
      });
    }
    
    // Return the profile data if no specialist details
    return profilesData || [];
  }
};
