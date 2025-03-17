import { supabase } from "@/integrations/supabase/client";
import { Session, SessionFormData } from "@/types/session";

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

  createSession: async (sessionData: SessionFormData): Promise<Session> => {
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

  // Função corrigida para buscar todos os especialistas
  getAllSpecialists: async (): Promise<{
    id: string, 
    full_name?: string, 
    email?: string, 
    created_at: string, 
    specialty?: string,
    bio?: string,
    experience_years?: number,
    rating?: number,
    details?: {
      short_description?: string,
      long_description?: string,
      education?: string,
      thumbnail_url?: string,
      sessions_completed?: number,
      areas_of_expertise?: string[],
      languages?: string[]
    }
  }[]> => {
    try {
      // 1. Primeiro, buscar todos os perfis que têm role=especialista
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, email, created_at")
        .eq("role", "especialista")
        .order("created_at", { ascending: false });
      
      if (profileError) throw profileError;
      
      if (!profileData || profileData.length === 0) {
        console.log("Nenhum perfil de especialista encontrado");
        return [];
      }
      
      // Extrair IDs dos especialistas para buscar dados adicionais
      const specialistIds = profileData.map(profile => profile.id);
      
      // 2. Buscar dados da tabela specialists
      const { data: specialistsData, error: specialistsError } = await supabase
        .from("specialists")
        .select("id, specialty, bio, experience_years, rating")
        .in("id", specialistIds);
      
      if (specialistsError) throw specialistsError;
      
      // 3. Buscar dados da tabela specialist_details
      const { data: detailsData, error: detailsError } = await supabase
        .from("specialist_details")
        .select("*")
        .in("specialist_id", specialistIds);
      
      if (detailsError) throw detailsError;
      
      // Criar mapas para fácil acesso aos dados
      const specialistsMap = (specialistsData || []).reduce((map, spec) => {
        map[spec.id] = spec;
        return map;
      }, {} as Record<string, any>);
      
      const detailsMap = (detailsData || []).reduce((map, detail) => {
        map[detail.specialist_id] = detail;
        return map;
      }, {} as Record<string, any>);
      
      // 4. Combinar todos os dados
      const combinedData = profileData.map(profile => {
        const specialistInfo = specialistsMap[profile.id] || {};
        const detailsInfo = detailsMap[profile.id];
        
        return {
          id: profile.id,
          full_name: profile.full_name,
          email: profile.email,
          created_at: profile.created_at,
          specialty: specialistInfo.specialty || "Não especificada",
          bio: specialistInfo.bio || "",
          experience_years: specialistInfo.experience_years || 0,
          rating: specialistInfo.rating || 0,
          details: detailsInfo ? {
            short_description: detailsInfo.short_description,
            long_description: detailsInfo.long_description,
            education: detailsInfo.education,
            thumbnail_url: detailsInfo.thumbnail_url,
            sessions_completed: detailsInfo.sessions_completed,
            areas_of_expertise: detailsInfo.areas_of_expertise,
            languages: detailsInfo.languages
          } : undefined
        };
      });
      
      console.log(`Encontrados ${combinedData.length} especialistas`);
      return combinedData;
    } catch (error) {
      console.error("Erro ao buscar especialistas:", error);
      throw error;
    }
  },
  
  searchSpecialists: async (searchTerm: string): Promise<{
    id: string, 
    full_name: string, 
    email: string, 
    created_at: string, 
    specialty?: string, 
    bio?: string,
    experience_years?: number,
    rating?: number,
    details?: {
      short_description?: string,
      long_description?: string,
      education?: string,
      thumbnail_url?: string,
      sessions_completed?: number,
      areas_of_expertise?: string[],
      languages?: string[]
    }
  }[]> => {
    // Primeiro, buscar todos os especialistas da tabela specialists
    const { data: allSpecialistsData, error: specialistsError } = await supabase
      .from("specialists")
      .select("id, specialty, bio, experience_years, rating");
    
    if (specialistsError) throw specialistsError;
    
    // Se temos especialistas na tabela specialists
    if (allSpecialistsData && allSpecialistsData.length > 0) {
      const specialistIds = allSpecialistsData.map(s => s.id);
      
      // Buscar detalhes dos especialistas
      const { data: detailsData, error: detailsError } = await supabase
        .from("specialist_details")
        .select("*")
        .in("specialist_id", specialistIds);
        
      if (detailsError) throw detailsError;
      
      // Mapear detalhes para um objeto indexado por specialist_id
      const detailsMap = (detailsData || []).reduce((map, detail) => {
        map[detail.specialist_id] = detail;
        return map;
      }, {} as Record<string, any>);
      
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
      let combinedData = profilesData?.map(profile => {
        const specialist = allSpecialistsData.find(s => s.id === profile.id);
        const details = detailsMap[profile.id];
        
        return {
          ...profile,
          specialty: specialist?.specialty || "Não especificada",
          bio: specialist?.bio || "",
          experience_years: specialist?.experience_years || 0,
          rating: specialist?.rating || 0,
          details: details ? {
            short_description: details.short_description,
            long_description: details.long_description,
            education: details.education,
            thumbnail_url: details.thumbnail_url,
            sessions_completed: details.sessions_completed,
            areas_of_expertise: details.areas_of_expertise,
            languages: details.languages
          } : undefined
        };
      }) || [];
      
      // Filtrar também por especialidade e detalhes
      if (searchTerm) {
        // Converter para minúsculas para comparação insensível a maiúsculas/minúsculas
        const searchTermLower = searchTerm.toLowerCase();
        
        return combinedData.filter(specialist => 
          // Busca em campos básicos
          specialist.specialty?.toLowerCase().includes(searchTermLower) ||
          specialist.full_name?.toLowerCase().includes(searchTermLower) ||
          specialist.email?.toLowerCase().includes(searchTermLower) ||
          specialist.bio?.toLowerCase().includes(searchTermLower) ||
          
          // Busca em campos de detalhes
          specialist.details?.short_description?.toLowerCase().includes(searchTermLower) ||
          specialist.details?.long_description?.toLowerCase().includes(searchTermLower) ||
          specialist.details?.education?.toLowerCase().includes(searchTermLower) ||
          
          // Busca em áreas de especialização
          specialist.details?.areas_of_expertise?.some(area => 
            area.toLowerCase().includes(searchTermLower)
          ) ||
          
          // Busca em idiomas
          specialist.details?.languages?.some(language => 
            language.toLowerCase().includes(searchTermLower)
          )
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
  registerSpecialist: async (
    userId: string, 
    specialistData: { 
      specialty?: string, 
      bio?: string, 
      experience_years?: number
    }, 
    detailsData?: {
      short_description?: string,
      long_description?: string,
      education?: string,
      thumbnail_url?: string,
      sessions_completed?: number,
      areas_of_expertise?: string[],
      languages?: string[],
      certifications?: string[]
    }
  ): Promise<void> => {
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

    // Atualizar ou inserir detalhes do especialista
    if (detailsData) {
      // Verificar se já existem detalhes para este especialista
      const { data: existingDetails, error: detailsCheckError } = await supabase
        .from("specialist_details")
        .select("id")
        .eq("specialist_id", userId)
        .maybeSingle();

      if (detailsCheckError) throw detailsCheckError;

      if (existingDetails) {
        // Atualizar detalhes existentes
        const { error: updateDetailsError } = await supabase
          .from("specialist_details")
          .update(detailsData)
          .eq("specialist_id", userId);

        if (updateDetailsError) throw updateDetailsError;
      } else {
        // Inserir novos detalhes
        const { error: insertDetailsError } = await supabase
          .from("specialist_details")
          .insert({
            specialist_id: userId,
            ...detailsData
          });

        if (insertDetailsError) throw insertDetailsError;
      }
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
    rating?: number,
    details?: {
      short_description?: string,
      long_description?: string,
      education?: string,
      thumbnail_url?: string,
      sessions_completed?: number,
      areas_of_expertise?: string[],
      languages?: string[],
      certifications?: string[]
    }
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
    
    // Buscar detalhes adicionais
    const { data: detailsData, error: detailsError } = await supabase
      .from("specialist_details")
      .select("*")
      .eq("specialist_id", specialistId)
      .maybeSingle();
      
    if (detailsError) throw detailsError;
    
    // Combinar os dados
    if (specialistData && profileData) {
      return {
        ...profileData,
        specialty: specialistData.specialty,
        bio: specialistData.bio,
        experience_years: specialistData.experience_years,
        rating: specialistData.rating,
        details: detailsData ? {
          short_description: detailsData.short_description,
          long_description: detailsData.long_description,
          education: detailsData.education,
          thumbnail_url: detailsData.thumbnail_url,
          sessions_completed: detailsData.sessions_completed,
          areas_of_expertise: detailsData.areas_of_expertise,
          languages: detailsData.languages,
          certifications: detailsData.certifications
        } : undefined
      };
    } else if (profileData) {
      // Caso não tenha dados na tabela specialists
      return profileData;
    } else {
      throw new Error("Especialista não encontrado");
    }
  },
  
  // Método para atualizar os detalhes de um especialista
  updateSpecialistDetails: async (
    specialistId: string,
    detailsData: {
      short_description?: string,
      long_description?: string,
      education?: string,
      thumbnail_url?: string,
      sessions_completed?: number,
      areas_of_expertise?: string[],
      languages?: string[],
      certifications?: string[]
    }
  ): Promise<void> => {
    // Verificar se o especialista existe
    const { data: existingSpecialist, error: checkError } = await supabase
      .from("specialists")
      .select("id")
      .eq("id", specialistId)
      .maybeSingle();
    
    if (checkError) throw checkError;
    if (!existingSpecialist) throw new Error("Especialista não encontrado");
    
    // Verificar se já existem detalhes para este especialista
    const { data: existingDetails, error: detailsCheckError } = await supabase
      .from("specialist_details")
      .select("id")
      .eq("specialist_id", specialistId)
      .maybeSingle();
      
    if (detailsCheckError) throw detailsCheckError;
    
    if (existingDetails) {
      // Atualizar detalhes existentes
      const { error: updateError } = await supabase
        .from("specialist_details")
        .update(detailsData)
        .eq("specialist_id", specialistId);
        
      if (updateError) throw updateError;
    } else {
      // Inserir novos detalhes
      const { error: insertError } = await supabase
        .from("specialist_details")
        .insert({
          specialist_id: specialistId,
          ...detailsData
        });
        
      if (insertError) throw insertError;
    }
  }
};
