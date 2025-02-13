
export interface Availability {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}
