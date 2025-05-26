
import { supabase } from "@/integrations/supabase/client";

export class ClientService {
  static async getAllClients() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .or("role.eq.cliente,role.eq.client,tipo_usuario.eq.cliente");
      
      if (error) {
        console.error("Erro ao buscar clientes:", error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      return [];
    }
  }

  static async getClientSessionCount(clientId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from("sessoes")
        .select("id")
        .eq("cliente_id", clientId);
        
      if (error) throw error;
      return data?.length || 0;
    } catch (error) {
      console.error("Erro ao contar sessões do cliente:", error);
      return 0;
    }
  }
}
