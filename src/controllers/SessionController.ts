
import { supabase } from "@/integrations/supabase/client";
import type { Session, NewSession } from "@/types/session";

interface Specialist {
  id: string;
  full_name?: string;
  email?: string;
  created_at: string;
  specialty?: string;
  bio?: string;
  experience_years?: number;
  rating?: number;
  details?: {
    short_description?: string;
    long_description?: string;
    education?: string;
    thumbnail_url?: string;
    rating?: number;
    sessions_completed?: number;
    areas_of_expertise?: string[];
    languages?: string[];
    certifications?: string[];
  };
}

export class SessionController {
  static async getSessions() {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .order("start_time", { ascending: true });

      if (error) throw error;
      return data as Session[];
    } catch (error) {
      console.error("Error fetching sessions:", error);
      throw error;
    }
  }

  static async getSession(id: string) {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Session;
    } catch (error) {
      console.error("Error fetching session:", error);
      throw error;
    }
  }

  static async createSession(session: NewSession) {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .insert(session)
        .select()
        .single();

      if (error) throw error;
      return data as Session;
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    }
  }

  static async updateSession(id: string, updates: Partial<Session>) {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Session;
    } catch (error) {
      console.error("Error updating session:", error);
      throw error;
    }
  }

  static async deleteSession(id: string) {
    try {
      const { error } = await supabase.from("sessions").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting session:", error);
      throw error;
    }
  }

  static async getSpecialists() {
    try {
      // Buscar todos os perfis que são especialistas
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "especialista");

      if (profilesError) throw profilesError;

      if (!profilesData || profilesData.length === 0) {
        return [];
      }

      // Extrair IDs dos especialistas para buscar informações adicionais
      const specialistIds = profilesData.map((profile) => profile.id);

      // Buscar informações específicas de especialistas
      const { data: specialistsData, error: specialistsError } = await supabase
        .from("specialists")
        .select("*")
        .in("id", specialistIds);

      if (specialistsError) throw specialistsError;

      // Buscar detalhes adicionais dos especialistas
      const { data: detailsData, error: detailsError } = await supabase
        .from("specialist_details")
        .select("*")
        .in("specialist_id", specialistIds);

      if (detailsError) throw detailsError;

      // Combinar os dados
      const specialists = profilesData.map((profile) => {
        const specialist = specialistsData?.find((s) => s.id === profile.id) || {};
        const details = detailsData?.find((d) => d.specialist_id === profile.id) || {};

        return {
          ...profile,
          ...specialist,
          details: details || undefined,
        };
      });

      return specialists as Specialist[];
    } catch (error) {
      console.error("Error fetching specialists:", error);
      throw error;
    }
  }

  static async getSpecialistById(id: string) {
    try {
      // Buscar perfil do especialista
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .eq("role", "especialista")
        .single();

      if (profileError) throw profileError;

      // Buscar informações específicas do especialista
      const { data: specialist, error: specialistError } = await supabase
        .from("specialists")
        .select("*")
        .eq("id", id)
        .single();

      if (specialistError) throw specialistError;

      // Buscar detalhes adicionais do especialista
      const { data: details, error: detailsError } = await supabase
        .from("specialist_details")
        .select("*")
        .eq("specialist_id", id)
        .single();

      if (detailsError && detailsError.code !== "PGRST116") {
        // PGRST116 é o código para "nenhum resultado encontrado"
        throw detailsError;
      }

      // Combinar os dados
      return {
        ...profile,
        ...specialist,
        details: details || undefined,
      } as Specialist;
    } catch (error) {
      console.error("Error fetching specialist:", error);
      throw error;
    }
  }

  static async registerSpecialist(
    specialistId: string, 
    specialistData: { 
      specialty?: string; 
      bio?: string; 
      experience_years?: number; 
      rating?: number;
    },
    detailsData?: {
      short_description?: string;
      long_description?: string;
      education?: string;
      thumbnail_url?: string;
      rating?: number;
      sessions_completed?: number;
      areas_of_expertise?: string[];
      languages?: string[];
      certifications?: string[];
    }
  ) {
    const { data: existingSpecialist, error: checkError } = await supabase
      .from("specialists")
      .select("id")
      .eq("id", specialistId)
      .single();

    // Inserir ou atualizar dados do especialista
    if (!existingSpecialist) {
      const { error: specialistError } = await supabase
        .from("specialists")
        .insert({
          id: specialistId,
          ...specialistData
        });

      if (specialistError) throw specialistError;
    } else {
      const { error: updateError } = await supabase
        .from("specialists")
        .update(specialistData)
        .eq("id", specialistId);

      if (updateError) throw updateError;
    }

    // Se houver detalhes para adicionar/atualizar
    if (detailsData) {
      const { data: existingDetails, error: checkDetailsError } = await supabase
        .from("specialist_details")
        .select("id")
        .eq("specialist_id", specialistId)
        .single();

      if (!existingDetails) {
        const { error: detailsError } = await supabase
          .from("specialist_details")
          .insert({
            specialist_id: specialistId,
            ...detailsData
          });

        if (detailsError) throw detailsError;
      } else {
        const { error: updateDetailsError } = await supabase
          .from("specialist_details")
          .update(detailsData)
          .eq("specialist_id", specialistId);

        if (updateDetailsError) throw updateDetailsError;
      }
    }

    return this.getSpecialistById(specialistId);
  }
}
