
import { supabase } from "@/integrations/supabase/client";

export class SpecialistService {
  static async getSpecialistDetails(id: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .eq("role", "specialist")
        .single();

      if (error) throw error;

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

  static async getSpecialistSessionCount(specialistId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from("sessoes")
        .select("*", { count: 'exact', head: true })
        .eq("specialist_id", specialistId);
        
      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("Erro ao contar sessões do especialista:", error);
      return 0;
    }
  }
}
