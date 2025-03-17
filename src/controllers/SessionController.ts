
import { supabase } from '@/integrations/supabase/client';

export class SessionController {
  static async getSessions() {
    try {
      const { data, error } = await supabase
        .from('sessoes')
        .select('*');

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching sessions:', error);
      return [];
    }
  }

  static async getSessionsByClient(clientId: string) {
    try {
      const { data, error } = await supabase
        .from('sessoes')
        .select('*')
        .eq('cliente_id', clientId);

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching client sessions:', error);
      return [];
    }
  }

  static async getSessionsBySpecialist(specialistId: string) {
    try {
      const { data, error } = await supabase
        .from('sessoes')
        .select('*')
        .eq('especialista_id', specialistId);

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching specialist sessions:', error);
      return [];
    }
  }

  static async createSession(sessionData: any) {
    try {
      const { data, error } = await supabase
        .from('sessoes')
        .insert([sessionData])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error creating session:', error);
      return null;
    }
  }

  static async updateSession(id: string, sessionData: any) {
    try {
      const { data, error } = await supabase
        .from('sessoes')
        .update(sessionData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error updating session:', error);
      return null;
    }
  }

  static async deleteSession(id: string) {
    try {
      const { error } = await supabase
        .from('sessoes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error deleting session:', error);
      return false;
    }
  }

  // Additional methods needed for components
  static async getAllSpecialists() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'especialista');

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching specialists:', error);
      return [];
    }
  }

  static async getAllClients() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'cliente');

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  }
  
  static async listClients() {
    return this.getAllClients();
  }

  static async listSessions() {
    return this.getSessions();
  }

  static async getClientSessionCount(clientId: string) {
    try {
      const { count, error } = await supabase
        .from('sessoes')
        .select('*', { count: 'exact', head: true })
        .eq('cliente_id', clientId);

      if (error) throw error;

      return count || 0;
    } catch (error) {
      console.error('Error counting client sessions:', error);
      return 0;
    }
  }

  static async getSpecialistSessionCount(specialistId: string) {
    try {
      const { count, error } = await supabase
        .from('sessoes')
        .select('*', { count: 'exact', head: true })
        .eq('especialista_id', specialistId);

      if (error) throw error;

      return count || 0;
    } catch (error) {
      console.error('Error counting specialist sessions:', error);
      return 0;
    }
  }

  static async getSpecialistDetails(specialistId: string) {
    try {
      const { data, error } = await supabase
        .from('specialist_details')
        .select('*, specialists(*)')
        .eq('specialist_id', specialistId)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error fetching specialist details:', error);
      return null;
    }
  }

  static async sendSessionInvite(sessionId: string) {
    try {
      // Placeholder for sending session invite
      console.log(`Sending invite for session ${sessionId}`);
      return true;
    } catch (error) {
      console.error('Error sending session invite:', error);
      return false;
    }
  }
}
