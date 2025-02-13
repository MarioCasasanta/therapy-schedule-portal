
import { supabase } from "@/integrations/supabase/client";
import type { SystemConfig } from "@/types/system-config";

export class SystemConfigController {
  static async get(key: string) {
    const { data, error } = await supabase
      .from("system_config")
      .select("*")
      .eq("key", key)
      .single();

    if (error) throw error;
    return data as SystemConfig;
  }

  static async update(key: string, value: any) {
    const { data, error } = await supabase
      .from("system_config")
      .update({ value })
      .eq("key", key)
      .select()
      .single();

    if (error) throw error;
    return data as SystemConfig;
  }
}
