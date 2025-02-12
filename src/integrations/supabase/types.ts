export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      access_logs: {
        Row: {
          accessed_at: string
          component_accessed: string | null
          id: string
          page_accessed: string
          user_id: string | null
        }
        Insert: {
          accessed_at?: string
          component_accessed?: string | null
          id?: string
          page_accessed: string
          user_id?: string | null
        }
        Update: {
          accessed_at?: string
          component_accessed?: string | null
          id?: string
          page_accessed?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "access_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_items: {
        Row: {
          completed: boolean | null
          created_at: string
          description: string | null
          id: string
          is_automated: boolean
          item_type: string
          status: string
          title: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          is_automated?: boolean
          item_type?: string
          status?: string
          title: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          is_automated?: boolean
          item_type?: string
          status?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_area_content: {
        Row: {
          content: string
          content_type: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          is_premium: boolean | null
          order_index: number | null
          section_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          content_type: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_premium?: boolean | null
          order_index?: number | null
          section_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          content_type?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_premium?: boolean | null
          order_index?: number | null
          section_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_area_content_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "client_area_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      client_area_sections: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          order_index: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      configuracoes_site: {
        Row: {
          conteudo: string
          created_at: string
          id: string
          secao: string
          updated_at: string
        }
        Insert: {
          conteudo: string
          created_at?: string
          id?: string
          secao: string
          updated_at?: string
        }
        Update: {
          conteudo?: string
          created_at?: string
          id?: string
          secao?: string
          updated_at?: string
        }
        Relationships: []
      }
      daily_audios: {
        Row: {
          audio_url: string
          created_at: string
          description: string | null
          id: string
          title: string
        }
        Insert: {
          audio_url: string
          created_at?: string
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          audio_url?: string
          created_at?: string
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      emotional_diary: {
        Row: {
          content: string
          created_at: string
          entry_date: string
          id: string
          mood_score: number
          title: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          entry_date?: string
          id?: string
          mood_score: number
          title?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          entry_date?: string
          id?: string
          mood_score?: number
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emotional_diary_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          created_at: string
          event_id: string | null
          id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_time: string
          google_calendar_id: string | null
          id: string
          is_free: boolean | null
          location: string | null
          max_participants: number | null
          start_time: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_time: string
          google_calendar_id?: string | null
          id?: string
          is_free?: boolean | null
          location?: string | null
          max_participants?: number | null
          start_time: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_time?: string
          google_calendar_id?: string | null
          id?: string
          is_free?: boolean | null
          location?: string | null
          max_participants?: number | null
          start_time?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pagamentos: {
        Row: {
          cliente_id: string | null
          created_at: string
          data_pagamento: string | null
          id: string
          metodo_pagamento: string | null
          sessao_id: string | null
          status: string | null
          valor: number
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string
          data_pagamento?: string | null
          id?: string
          metodo_pagamento?: string | null
          sessao_id?: string | null
          status?: string | null
          valor: number
        }
        Update: {
          cliente_id?: string | null
          created_at?: string
          data_pagamento?: string | null
          id?: string
          metodo_pagamento?: string | null
          sessao_id?: string | null
          status?: string | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pagamentos_sessao_id_fkey"
            columns: ["sessao_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      page_content: {
        Row: {
          content: Json
          created_at: string
          id: string
          section_name: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          section_name: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          section_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          data_nascimento: string | null
          email: string | null
          full_name: string | null
          id: string
          name: string | null
          phone: string | null
          preferences: Json | null
          role: string | null
          telefone: string | null
          tipo_usuario: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          data_nascimento?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          name?: string | null
          phone?: string | null
          preferences?: Json | null
          role?: string | null
          telefone?: string | null
          tipo_usuario?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          data_nascimento?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          preferences?: Json | null
          role?: string | null
          telefone?: string | null
          tipo_usuario?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      questionnaire_responses: {
        Row: {
          answers: Json
          completed_at: string | null
          created_at: string | null
          id: string
          questionnaire_type: Database["public"]["Enums"]["questionnaire_type"]
          score: number | null
          user_id: string | null
        }
        Insert: {
          answers: Json
          completed_at?: string | null
          created_at?: string | null
          id?: string
          questionnaire_type: Database["public"]["Enums"]["questionnaire_type"]
          score?: number | null
          user_id?: string | null
        }
        Update: {
          answers?: Json
          completed_at?: string | null
          created_at?: string | null
          id?: string
          questionnaire_type?: Database["public"]["Enums"]["questionnaire_type"]
          score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questionnaire_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sessoes: {
        Row: {
          cliente_id: string | null
          created_at: string
          data_hora: string
          data_pagamento: string | null
          google_event_id: string | null
          guest_email: string | null
          id: string
          invitation_sent_at: string | null
          invitation_status: string | null
          notas: string | null
          status: string | null
          status_pagamento: string | null
          tipo_sessao: string
          updated_at: string
          valor: number | null
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string
          data_hora: string
          data_pagamento?: string | null
          google_event_id?: string | null
          guest_email?: string | null
          id?: string
          invitation_sent_at?: string | null
          invitation_status?: string | null
          notas?: string | null
          status?: string | null
          status_pagamento?: string | null
          tipo_sessao: string
          updated_at?: string
          valor?: number | null
        }
        Update: {
          cliente_id?: string | null
          created_at?: string
          data_hora?: string
          data_pagamento?: string | null
          google_event_id?: string | null
          guest_email?: string | null
          id?: string
          invitation_sent_at?: string | null
          invitation_status?: string | null
          notas?: string | null
          status?: string | null
          status_pagamento?: string | null
          tipo_sessao?: string
          updated_at?: string
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sessoes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sitemap_entries: {
        Row: {
          created_at: string
          id: string
          order_index: number
          parent_id: string | null
          project_id: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_index?: number
          parent_id?: string | null
          project_id: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          order_index?: number
          parent_id?: string | null
          project_id?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "sitemap_entries_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "sitemap_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sitemap_entries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      smart_goals: {
        Row: {
          achievable: string
          completed: boolean | null
          created_at: string
          id: string
          measurable: string
          relevant: string
          specific: string
          time_bound: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          achievable: string
          completed?: boolean | null
          created_at?: string
          id?: string
          measurable: string
          relevant: string
          specific: string
          time_bound: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          achievable?: string
          completed?: boolean | null
          created_at?: string
          id?: string
          measurable?: string
          relevant?: string
          specific?: string
          time_bound?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "smart_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_paid: boolean | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          youtube_url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_paid?: boolean | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          youtube_url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_paid?: boolean | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          youtube_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      questionnaire_type:
        | "tdah"
        | "iq"
        | "anxiety"
        | "depression"
        | "burnout"
        | "attachment"
        | "saboteurs"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
