
import { supabase } from "@/integrations/supabase/client";
import { Availability } from "@/types/availability";

export class AvailabilityController {
  static async list() {
    const { data, error } = await supabase
      .from("availability")
      .select("*")
      .order("day_of_week", { ascending: true });

    if (error) throw error;
    return data as Availability[];
  }

  static async update(availability: Availability) {
    const { data, error } = await supabase
      .from("availability")
      .upsert({
        id: availability.id,
        day_of_week: availability.day_of_week,
        start_time: availability.start_time,
        end_time: availability.end_time,
        is_available: availability.is_available,
        interval_minutes: availability.interval_minutes,
        max_concurrent_sessions: availability.max_concurrent_sessions,
        exceptions: availability.exceptions
      })
      .select()
      .single();

    if (error) throw error;
    return data as Availability;
  }

  static async getByDayOfWeek(dayOfWeek: number) {
    const { data, error } = await supabase
      .from("availability")
      .select("*")
      .eq("day_of_week", dayOfWeek)
      .eq("is_available", true);

    if (error) throw error;
    return data as Availability[];
  }
}
