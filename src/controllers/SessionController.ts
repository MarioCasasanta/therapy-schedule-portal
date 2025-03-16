import { supabase } from "@/integrations/supabase/client";
import { Session, SessionFormData } from "@/types/session";

export class SessionController {
  static async list(userId?: string, role?: string) {
    let query = supabase
      .from("sessoes")
      .select(`
        *,
        profiles:cliente_id (*)
      `)
      .order("data_hora", { ascending: true });
    
    // If user is a specialist, only return their sessions
    if (role === 'especialista' && userId) {
      query = query.eq("especialista_id", userId);
    }
    
    const { data, error } = await query;

    if (error) throw error;
    return data as Session[];
  }

  static async listClients(especialistaId?: string) {
    // If especialistaId is provided, only fetch clients that have sessions with this specialist
    // Otherwise fetch all clients
    let query = supabase
      .from("sessoes")
      .select(`
        cliente_id,
        profiles:cliente_id (*)
      `);
      
    if (especialistaId) {
      query = query.eq("especialista_id", especialistaId);
    }

    const { data, error } = await query;

    if (error) throw error;
    
    // Transform the data to return only unique client profiles
    const clientProfiles: Record<string, any> = {};
    
    if (data && data.length > 0) {
      data.forEach(item => {
        if (item.profiles && !clientProfiles[item.profiles.id]) {
          clientProfiles[item.profiles.id] = item.profiles;
        }
      });
    }
    
    return Object.values(clientProfiles);
  }

  static async getAllClients() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("tipo_usuario", "cliente")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getAllSpecialists() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("tipo_usuario", "especialista")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getClientSessionCount(clientId: string) {
    const { count, error } = await supabase
      .from("sessoes")
      .select("*", { count: 'exact', head: true })
      .eq("cliente_id", clientId);

    if (error) throw error;
    return count || 0;
  }

  static async get(id: string) {
    const { data, error } = await supabase
      .from("sessoes")
      .select(`
        *,
        profiles:cliente_id (*)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Session;
  }

  static async create(formData: SessionFormData) {
    const { data, error } = await supabase
      .from("sessoes")
      .insert(formData)
      .select()
      .single();

    if (error) throw error;
    return data as Session;
  }

  static async update(id: string, formData: SessionFormData) {
    const { data, error } = await supabase
      .from("sessoes")
      .update(formData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Session;
  }

  static async delete(id: string) {
    const { error } = await supabase
      .from("sessoes")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }

  static async sendInvite(id: string) {
    const { error } = await supabase.functions.invoke('send-invite', {
      body: { session_id: id }
    });

    if (error) throw error;
  }
}
