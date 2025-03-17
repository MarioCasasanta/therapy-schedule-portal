
import { supabase } from '@/integrations/supabase/client';
import { SessionType } from '@/types/session';

export class SessionController {
  static async getSessions(): Promise<SessionType[]> {
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

  static async getSessionsByClient(clientId: string): Promise<SessionType[]> {
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

  static async getSessionsBySpecialist(specialistId: string): Promise<SessionType[]> {
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

  static async createSession(sessionData: Partial<SessionType>): Promise<SessionType | null> {
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

  static async updateSession(id: string, sessionData: Partial<SessionType>): Promise<SessionType | null> {
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

  static async deleteSession(id: string): Promise<boolean> {
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
}
