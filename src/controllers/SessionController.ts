
import { supabase } from "@/integrations/supabase/client";
import { Session, SessionFormData } from "@/types/session";

export class SessionController {
  static async list() {
    const { data, error } = await supabase
      .from("sessoes")
      .select(`
        *,
        profiles:cliente_id (*)
      `)
      .order("data_hora", { ascending: true });

    if (error) throw error;
    return data as Session[];
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
