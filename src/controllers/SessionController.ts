
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

  getAllSpecialists: async (): Promise<{id: string, full_name: string, email: string, created_at: string, specialty?: string}[]> => {
    // Primeiro, obter dados da tabela de especialistas
    const { data: specialistsData, error: specialistsError } = await supabase
      .from("specialists")
      .select("id, specialty")
      .order("created_at", { ascending: false });
    
    if (specialistsError) throw specialistsError;
    
    // Em seguida, obter os dados complementares da tabela profiles
    if (specialistsData && specialistsData.length > 0) {
      const specialistIds = specialistsData.map(spec => spec.id);
      
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name, email, created_at")
        .in("id", specialistIds)
        .eq("role", "especialista");
      
      if (profilesError) throw profilesError;
      
      // Combinar os dados das duas tabelas
      const combinedData = profilesData?.map(profile => {
        const specialist = specialistsData.find(s => s.id === profile.id);
        return {
          ...profile,
          specialty: specialist?.specialty || "Não especificada"
        };
      }) || [];
      
      return combinedData;
    }
    
    // Caso não encontre especialistas na nova tabela, busca da tabela de profiles como fallback
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, created_at")
      .eq("role", "especialista")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },
  
  searchSpecialists: async (searchTerm: string): Promise<{id: string, full_name: string, email: string, created_at: string, specialty?: string}[]> => {
    // Primeiro, buscar todos os especialistas da nova tabela
    const { data: allSpecialistsData, error: specialistsError } = await supabase
      .from("specialists")
      .select("id, specialty");
    
    if (specialistsError) throw specialistsError;
    
    // Se temos especialistas na nova tabela
    if (allSpecialistsData && allSpecialistsData.length > 0) {
      const specialistIds = allSpecialistsData.map(s => s.id);
      
      // Buscar profiles correspondentes, filtrando pela busca
      let query = supabase
        .from("profiles")
        .select("id, full_name, email, created_at")
        .in("id", specialistIds);
      
      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }
      
      const { data: profilesData, error: profilesError } = await query.order("created_at", { ascending: false });
      
      if (profilesError) throw profilesError;
      
      // Combinar os dados
      const combinedData = profilesData?.map(profile => {
        const specialist = allSpecialistsData.find(s => s.id === profile.id);
        return {
          ...profile,
          specialty: specialist?.specialty || "Não especificada"
        };
      }) || [];
      
      // Filtrar também por especialidade
      if (searchTerm) {
        return combinedData.filter(specialist => 
          specialist.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          specialist.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          specialist.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      return combinedData;
    }
    
    // Fallback para a versão antiga usando apenas profiles
    let query = supabase
      .from("profiles")
      .select("id, full_name, email, created_at")
      .eq("role", "especialista");
      
    if (searchTerm) {
      query = query.or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
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
  },
  
  // Método para cadastrar um especialista
  registerSpecialist: async (userId: string, specialistData: { specialty?: string, bio?: string, experience_years?: number }): Promise<void> => {
    // Primeiro, verificar se o usuário já existe na tabela de especialistas
    const { data: existingSpecialist, error: checkError } = await supabase
      .from("specialists")
      .select("id")
      .eq("id", userId)
      .maybeSingle();
    
    if (checkError) throw checkError;
    
    // Se já existe, atualizar
    if (existingSpecialist) {
      const { error: updateError } = await supabase
        .from("specialists")
        .update(specialistData)
        .eq("id", userId);
      
      if (updateError) throw updateError;
    } else {
      // Se não existe, inserir
      const { error: insertError } = await supabase
        .from("specialists")
        .insert({
          id: userId,
          ...specialistData
        });
      
      if (insertError) throw insertError;
      
      // Também atualizar o role na tabela profiles
      const { error: profileUpdateError } = await supabase
        .from("profiles")
        .update({ role: "especialista" })
        .eq("id", userId);
      
      if (profileUpdateError) throw profileUpdateError;
    }
  },
  
  // Método para obter detalhes de um especialista
  getSpecialistDetails: async (specialistId: string): Promise<{
    id: string, 
    full_name?: string, 
    email?: string, 
    created_at: string, 
    specialty?: string,
    bio?: string,
    experience_years?: number,
    rating?: number
  }> => {
    // Buscar dados da tabela specialists
    const { data: specialistData, error: specialistError } = await supabase
      .from("specialists")
      .select("*")
      .eq("id", specialistId)
      .maybeSingle();
    
    if (specialistError) throw specialistError;
    
    // Buscar dados da tabela profiles
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name, email, created_at")
      .eq("id", specialistId)
      .maybeSingle();
    
    if (profileError) throw profileError;
    
    // Combinar os dados
    if (specialistData && profileData) {
      return {
        ...profileData,
        specialty: specialistData.specialty,
        bio: specialistData.bio,
        experience_years: specialistData.experience_years,
        rating: specialistData.rating
      };
    } else if (profileData) {
      // Caso não tenha dados na tabela specialists
      return profileData;
    } else {
      throw new Error("Especialista não encontrado");
    }
  }
};
