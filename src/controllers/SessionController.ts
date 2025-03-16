
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

  static async listClients(especialistaId: string) {
    // Only fetch clients that have sessions with this specialist
    const { data, error } = await supabase
      .from("sessoes")
      .select(`
        cliente_id,
        profiles:cliente_id (*)
      `)
      .eq("especialista_id", especialistaId);

    if (error) throw error;
    
    // Transform the data to return only unique client profiles
    const clientProfiles: any[] = [];
    const clientIds = new Set();
    
    if (data && data.length > 0) {
      data.forEach(item => {
        if (item.profiles && !clientIds.has(item.profiles.id)) {
          clientIds.add(item.profiles.id);
          clientProfiles.push(item.profiles);
        }
      });
    }
    
    return clientProfiles;
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
