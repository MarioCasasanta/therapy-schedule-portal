
export interface Availability {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  interval_minutes: number;
  max_concurrent_sessions: number;
  exceptions: string[];
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}
