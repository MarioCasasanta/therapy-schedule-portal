import { supabase } from "@/integrations/supabase/client";

export class SessionController {
  static async getSessions() {
    try {
      const { data, error } = await supabase.from("sessions").select("*");
      if (error) {
        console.error("Error fetching sessions:", error);
        return [];
      }
      return data;
    } catch (error) {
      console.error("Error fetching sessions:", error);
      return [];
    }
  }

  static async getSessionById(id: string) {
    try {
      const { data, error } = await supabase
        .from("sessions")
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
      const { data, error } = await supabase
        .from("sessions")
        .insert([sessionData])
        .select()
        .single();
      if (error) {
        console.error("Error creating session:", error);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error creating session:", error);
      return null;
    }
  }

  static async updateSession(id: string, sessionData: any) {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .update(sessionData)
        .eq("id", id)
        .select()
        .single();
      if (error) {
        console.error("Error updating session:", error);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error updating session:", error);
      return null;
    }
  }

  static async deleteSession(id: string) {
    try {
      const { data, error } = await supabase
        .from("sessions")
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
      const { data, error } = await supabase
        .from("specialist_profiles")
        .select(`
        *,
        profiles:user_id (*)
      `)
        .eq("id", id)
        .single();

      if (error) throw error;

      // Transform the data to match the expected structure
      const result = {
        id: data.id,
        full_name: data.profiles?.full_name,
        specialty: data.specialty,
        bio: data.bio,
        email: data.profiles?.email,
        phone: data.phone,
        rating: data.rating || 4.8,
        experience_years: data.experience_years || 5,
        details: {
          thumbnail_url: data.thumbnail_url,
          short_description: data.short_description,
          long_description: data.long_description,
          education: data.education,
          areas_of_expertise: data.areas_of_expertise,
          languages: data.languages,
          certifications: data.certifications,
          sessions_completed: data.sessions_completed,
        },
      };

      return result;
    } catch (error) {
      console.error("Error fetching specialist details:", error);
      throw error;
    }
  }
}
