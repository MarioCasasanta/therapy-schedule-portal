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
          {
            foreignKeyName: "access_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      analise_influencia: {
        Row: {
          created_at: string
          evento_gatilho: string | null
          frequencia: string | null
          id: string
          impacto_vida: string | null
          inicio_interferencia: string | null
          intensidade: number | null
          obstaculos: string | null
          oportunidades_perdidas: string | null
          pessoa_influenciada: string | null
          tentativas_mudanca: string | null
          tipo_relacao: string | null
          user_id: string
          visao_futura: string | null
        }
        Insert: {
          created_at?: string
          evento_gatilho?: string | null
          frequencia?: string | null
          id?: string
          impacto_vida?: string | null
          inicio_interferencia?: string | null
          intensidade?: number | null
          obstaculos?: string | null
          oportunidades_perdidas?: string | null
          pessoa_influenciada?: string | null
          tentativas_mudanca?: string | null
          tipo_relacao?: string | null
          user_id: string
          visao_futura?: string | null
        }
        Update: {
          created_at?: string
          evento_gatilho?: string | null
          frequencia?: string | null
          id?: string
          impacto_vida?: string | null
          inicio_interferencia?: string | null
          intensidade?: number | null
          obstaculos?: string | null
          oportunidades_perdidas?: string | null
          pessoa_influenciada?: string | null
          tentativas_mudanca?: string | null
          tipo_relacao?: string | null
          user_id?: string
          visao_futura?: string | null
        }
        Relationships: []
      }
      availability: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          exceptions: Json | null
          id: string
          interval_minutes: number
          is_available: boolean | null
          max_concurrent_sessions: number
          start_time: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          exceptions?: Json | null
          id?: string
          interval_minutes?: number
          is_available?: boolean | null
          max_concurrent_sessions?: number
          start_time: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          exceptions?: Json | null
          id?: string
          interval_minutes?: number
          is_available?: boolean | null
          max_concurrent_sessions?: number
          start_time?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      benefits: {
        Row: {
          audience: string
          created_at: string
          description: string | null
          id: string
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          audience: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          audience?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string
          content: string
          created_at: string
          excerpt: string
          id: string
          published: boolean | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          excerpt: string
          id?: string
          published?: boolean | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      briefing_submissions: {
        Row: {
          additional_notes: string | null
          biography: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          email: string
          facebook: string | null
          full_name: string
          has_logo: string | null
          id: string
          inspiration_sites: string[] | null
          instagram: string | null
          linkedin: string | null
          location: string | null
          phone: string
          preferred_colors: string | null
          professional_name: string | null
          services: string | null
          session_values: string | null
          specializations: string | null
          target_audience: string | null
          wants_about_section: string | null
          wants_ai_description: string | null
          wants_contact_form: string | null
          wants_contact_section: string | null
          wants_differentials_section: string | null
          wants_hero_section: string | null
          wants_services_section: string | null
          wants_testimonials_section: string | null
          wants_whatsapp_button: string | null
        }
        Insert: {
          additional_notes?: string | null
          biography?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          email: string
          facebook?: string | null
          full_name: string
          has_logo?: string | null
          id?: string
          inspiration_sites?: string[] | null
          instagram?: string | null
          linkedin?: string | null
          location?: string | null
          phone: string
          preferred_colors?: string | null
          professional_name?: string | null
          services?: string | null
          session_values?: string | null
          specializations?: string | null
          target_audience?: string | null
          wants_about_section?: string | null
          wants_ai_description?: string | null
          wants_contact_form?: string | null
          wants_contact_section?: string | null
          wants_differentials_section?: string | null
          wants_hero_section?: string | null
          wants_services_section?: string | null
          wants_testimonials_section?: string | null
          wants_whatsapp_button?: string | null
        }
        Update: {
          additional_notes?: string | null
          biography?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          email?: string
          facebook?: string | null
          full_name?: string
          has_logo?: string | null
          id?: string
          inspiration_sites?: string[] | null
          instagram?: string | null
          linkedin?: string | null
          location?: string | null
          phone?: string
          preferred_colors?: string | null
          professional_name?: string | null
          services?: string | null
          session_values?: string | null
          specializations?: string | null
          target_audience?: string | null
          wants_about_section?: string | null
          wants_ai_description?: string | null
          wants_contact_form?: string | null
          wants_contact_section?: string | null
          wants_differentials_section?: string | null
          wants_hero_section?: string | null
          wants_services_section?: string | null
          wants_testimonials_section?: string | null
          wants_whatsapp_button?: string | null
        }
        Relationships: []
      }
      captura: {
        Row: {
          autoriza_notificacoes: boolean | null
          created_at: string
          email: string
          id: string
          nivel_resultado: string | null
          nome: string
          percentual_resultado: number | null
          pontuacao_teste: number | null
          telefone: string
        }
        Insert: {
          autoriza_notificacoes?: boolean | null
          created_at?: string
          email: string
          id?: string
          nivel_resultado?: string | null
          nome: string
          percentual_resultado?: number | null
          pontuacao_teste?: number | null
          telefone: string
        }
        Update: {
          autoriza_notificacoes?: boolean | null
          created_at?: string
          email?: string
          id?: string
          nivel_resultado?: string | null
          nome?: string
          percentual_resultado?: number | null
          pontuacao_teste?: number | null
          telefone?: string
        }
        Relationships: []
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
          {
            foreignKeyName: "checklist_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      client_plan_benefits: {
        Row: {
          benefit_id: string
          created_at: string
          id: string
          plan_id: string
        }
        Insert: {
          benefit_id: string
          created_at?: string
          id?: string
          plan_id: string
        }
        Update: {
          benefit_id?: string
          created_at?: string
          id?: string
          plan_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_plan_benefits_benefit_id_fkey"
            columns: ["benefit_id"]
            isOneToOne: false
            referencedRelation: "benefits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_plan_benefits_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "client_subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      client_subscription_plans: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          plan_type: Database["public"]["Enums"]["plan_type"]
          price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          plan_type: Database["public"]["Enums"]["plan_type"]
          price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          plan_type?: Database["public"]["Enums"]["plan_type"]
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      client_subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          plan_id: string
          start_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          plan_id: string
          start_date?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          plan_id?: string
          start_date?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "client_subscription_plans"
            referencedColumns: ["id"]
          },
        ]
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
      conquistas: {
        Row: {
          data_conquista: string
          descricao: string
          fase_relacionada: number
          icone_url: string | null
          id: string
          nome: string
          user_id: string
        }
        Insert: {
          data_conquista?: string
          descricao: string
          fase_relacionada: number
          icone_url?: string | null
          id?: string
          nome: string
          user_id: string
        }
        Update: {
          data_conquista?: string
          descricao?: string
          fase_relacionada?: number
          icone_url?: string | null
          id?: string
          nome?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conquistas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conquistas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      couple_plans: {
        Row: {
          children_plans: string | null
          communication_goals: string | null
          created_at: string
          creator_id: string
          financial_goals: string | null
          id: string
          living_location: string | null
          mutual_support: string | null
          partner_accepted: boolean | null
          partner_email: string | null
          partner_id: string | null
          religious_practices: string | null
          shared_hobbies: string | null
          shared_with_partner: boolean | null
          timeframe: Database["public"]["Enums"]["timeframe"]
          title: string
          travel_plans: string | null
          updated_at: string
          work_arrangements: string | null
        }
        Insert: {
          children_plans?: string | null
          communication_goals?: string | null
          created_at?: string
          creator_id: string
          financial_goals?: string | null
          id?: string
          living_location?: string | null
          mutual_support?: string | null
          partner_accepted?: boolean | null
          partner_email?: string | null
          partner_id?: string | null
          religious_practices?: string | null
          shared_hobbies?: string | null
          shared_with_partner?: boolean | null
          timeframe: Database["public"]["Enums"]["timeframe"]
          title: string
          travel_plans?: string | null
          updated_at?: string
          work_arrangements?: string | null
        }
        Update: {
          children_plans?: string | null
          communication_goals?: string | null
          created_at?: string
          creator_id?: string
          financial_goals?: string | null
          id?: string
          living_location?: string | null
          mutual_support?: string | null
          partner_accepted?: boolean | null
          partner_email?: string | null
          partner_id?: string | null
          religious_practices?: string | null
          shared_hobbies?: string | null
          shared_with_partner?: boolean | null
          timeframe?: Database["public"]["Enums"]["timeframe"]
          title?: string
          travel_plans?: string | null
          updated_at?: string
          work_arrangements?: string | null
        }
        Relationships: []
      }
      crencas_dinheiro: {
        Row: {
          created_at: string
          id: string
          interpretacao_ia: string | null
          pergunta: string
          resposta: string
          sugestao_ia: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          interpretacao_ia?: string | null
          pergunta: string
          resposta: string
          sugestao_ia?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          interpretacao_ia?: string | null
          pergunta?: string
          resposta?: string
          sugestao_ia?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crencas_dinheiro_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crencas_dinheiro_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
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
      despesas: {
        Row: {
          categoria: string
          created_at: string
          data_gasto: string
          descricao: string | null
          feedback_ia: string | null
          id: string
          input_tipo: string | null
          sentimento: string | null
          user_id: string
          valor: number
        }
        Insert: {
          categoria: string
          created_at?: string
          data_gasto: string
          descricao?: string | null
          feedback_ia?: string | null
          id?: string
          input_tipo?: string | null
          sentimento?: string | null
          user_id: string
          valor: number
        }
        Update: {
          categoria?: string
          created_at?: string
          data_gasto?: string
          descricao?: string | null
          feedback_ia?: string | null
          id?: string
          input_tipo?: string | null
          sentimento?: string | null
          user_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "despesas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "despesas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          description: string | null
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_path: string
          file_size?: number | null
          file_type: string
          id?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
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
          {
            foreignKeyName: "emotional_diary_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      escudo_emocional: {
        Row: {
          analise_contrato: string | null
          causa_insistencia: string | null
          contrato_estabelecido: boolean | null
          created_at: string
          custo_interferencia: string | null
          data_planejada: string | null
          data_reflexao: string
          envolvido: string | null
          expectativa: string | null
          id: string
          mapa_navegacao: string | null
          motivo_nao_realizado: string | null
          padrao_identificado: string | null
          plano_diferente: string | null
          quem_descumpre: string | null
          user_id: string
        }
        Insert: {
          analise_contrato?: string | null
          causa_insistencia?: string | null
          contrato_estabelecido?: boolean | null
          created_at?: string
          custo_interferencia?: string | null
          data_planejada?: string | null
          data_reflexao?: string
          envolvido?: string | null
          expectativa?: string | null
          id?: string
          mapa_navegacao?: string | null
          motivo_nao_realizado?: string | null
          padrao_identificado?: string | null
          plano_diferente?: string | null
          quem_descumpre?: string | null
          user_id: string
        }
        Update: {
          analise_contrato?: string | null
          causa_insistencia?: string | null
          contrato_estabelecido?: boolean | null
          created_at?: string
          custo_interferencia?: string | null
          data_planejada?: string | null
          data_reflexao?: string
          envolvido?: string | null
          expectativa?: string | null
          id?: string
          mapa_navegacao?: string | null
          motivo_nao_realizado?: string | null
          padrao_identificado?: string | null
          plano_diferente?: string | null
          quem_descumpre?: string | null
          user_id?: string
        }
        Relationships: []
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
          {
            foreignKeyName: "event_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      eventos_calendario: {
        Row: {
          created_at: string
          data_evento: string
          descricao: string | null
          id: string
          sincronizado_google: boolean | null
          tipo_evento: string
          titulo: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data_evento: string
          descricao?: string | null
          id?: string
          sincronizado_google?: boolean | null
          tipo_evento: string
          titulo: string
          user_id: string
        }
        Update: {
          created_at?: string
          data_evento?: string
          descricao?: string | null
          id?: string
          sincronizado_google?: boolean | null
          tipo_evento?: string
          titulo?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "eventos_calendario_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eventos_calendario_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
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
      fases_progresso: {
        Row: {
          data_conclusao: string | null
          data_inicio: string
          fase: number
          id: string
          status: string
          user_id: string
        }
        Insert: {
          data_conclusao?: string | null
          data_inicio?: string
          fase: number
          id?: string
          status: string
          user_id: string
        }
        Update: {
          data_conclusao?: string | null
          data_inicio?: string
          fase?: number
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fases_progresso_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fases_progresso_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      financial_reports: {
        Row: {
          cancellations_count: number
          created_at: string
          id: string
          paid_sessions_count: number
          pending_sessions_count: number
          report_date: string
          sessions_count: number
          total_revenue: number
        }
        Insert: {
          cancellations_count?: number
          created_at?: string
          id?: string
          paid_sessions_count?: number
          pending_sessions_count?: number
          report_date: string
          sessions_count?: number
          total_revenue?: number
        }
        Update: {
          cancellations_count?: number
          created_at?: string
          id?: string
          paid_sessions_count?: number
          pending_sessions_count?: number
          report_date?: string
          sessions_count?: number
          total_revenue?: number
        }
        Relationships: []
      }
      google_calendar_sync: {
        Row: {
          created_at: string
          google_event_id: string
          id: string
          last_synced_at: string
          session_id: string
          sync_status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          google_event_id: string
          id?: string
          last_synced_at?: string
          session_id: string
          sync_status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          google_event_id?: string
          id?: string
          last_synced_at?: string
          session_id?: string
          sync_status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "google_calendar_sync_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          created_at: string
          due_date: string
          id: string
          invoice_number: string
          paid_at: string | null
          session_id: string
          status: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          due_date: string
          id?: string
          invoice_number: string
          paid_at?: string | null
          session_id: string
          status?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string
          id?: string
          invoice_number?: string
          paid_at?: string | null
          session_id?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: true
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      jornada_transformacao: {
        Row: {
          acordo: string | null
          alvo: string | null
          como_ajuda: string | null
          created_at: string
          danos_outros: string | null
          danos_proprios: string | null
          data_reflexao: string
          expectativas: string | null
          gravidade: number | null
          id: string
          intencao: string | null
          limite: string | null
          nova_expectativa: string | null
          nova_intencao: string | null
          padrao_controlador: string[] | null
          quem_ajuda: string | null
          quem_apoia: string | null
          reparacao: string | null
          retratacao: string | null
          tem_ajuda: boolean | null
          tem_apoio: boolean | null
          user_id: string
        }
        Insert: {
          acordo?: string | null
          alvo?: string | null
          como_ajuda?: string | null
          created_at?: string
          danos_outros?: string | null
          danos_proprios?: string | null
          data_reflexao?: string
          expectativas?: string | null
          gravidade?: number | null
          id?: string
          intencao?: string | null
          limite?: string | null
          nova_expectativa?: string | null
          nova_intencao?: string | null
          padrao_controlador?: string[] | null
          quem_ajuda?: string | null
          quem_apoia?: string | null
          reparacao?: string | null
          retratacao?: string | null
          tem_ajuda?: boolean | null
          tem_apoio?: boolean | null
          user_id: string
        }
        Update: {
          acordo?: string | null
          alvo?: string | null
          como_ajuda?: string | null
          created_at?: string
          danos_outros?: string | null
          danos_proprios?: string | null
          data_reflexao?: string
          expectativas?: string | null
          gravidade?: number | null
          id?: string
          intencao?: string | null
          limite?: string | null
          nova_expectativa?: string | null
          nova_intencao?: string | null
          padrao_controlador?: string[] | null
          quem_ajuda?: string | null
          quem_apoia?: string | null
          reparacao?: string | null
          retratacao?: string | null
          tem_ajuda?: boolean | null
          tem_apoio?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      lesson_content: {
        Row: {
          content: string
          created_at: string
          id: string
          lesson_id: number
          module_id: number
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          lesson_id: number
          module_id: number
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          lesson_id?: number
          module_id?: number
          updated_at?: string
        }
        Relationships: []
      }
      lesson_quizzes: {
        Row: {
          created_at: string
          id: string
          lesson_id: number
          module_id: number
          questions: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_id: number
          module_id: number
          questions: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          lesson_id?: number
          module_id?: number
          questions?: Json
          updated_at?: string
        }
        Relationships: []
      }
      liberacao_culpa: {
        Row: {
          acontecimento: string | null
          analise_fatos: string | null
          created_at: string
          data_reflexao: string
          id: string
          impacto_outros: string | null
          impacto_proprio: string | null
          momento_culpa: string | null
          motivo_razao: string | null
          origem_informacao: string | null
          pessoa_envolvida: string | null
          responsabilidade_outro: string | null
          responsabilidade_proprio: string | null
          resumo_inicial: string | null
          sentimento_culpa: string | null
          sentimento_passado: string | null
          sentimento_presente: string | null
          tipo_utilidade: string | null
          user_id: string
          utilidade_natureza: string | null
        }
        Insert: {
          acontecimento?: string | null
          analise_fatos?: string | null
          created_at?: string
          data_reflexao?: string
          id?: string
          impacto_outros?: string | null
          impacto_proprio?: string | null
          momento_culpa?: string | null
          motivo_razao?: string | null
          origem_informacao?: string | null
          pessoa_envolvida?: string | null
          responsabilidade_outro?: string | null
          responsabilidade_proprio?: string | null
          resumo_inicial?: string | null
          sentimento_culpa?: string | null
          sentimento_passado?: string | null
          sentimento_presente?: string | null
          tipo_utilidade?: string | null
          user_id: string
          utilidade_natureza?: string | null
        }
        Update: {
          acontecimento?: string | null
          analise_fatos?: string | null
          created_at?: string
          data_reflexao?: string
          id?: string
          impacto_outros?: string | null
          impacto_proprio?: string | null
          momento_culpa?: string | null
          motivo_razao?: string | null
          origem_informacao?: string | null
          pessoa_envolvida?: string | null
          responsabilidade_outro?: string | null
          responsabilidade_proprio?: string | null
          resumo_inicial?: string | null
          sentimento_culpa?: string | null
          sentimento_passado?: string | null
          sentimento_presente?: string | null
          tipo_utilidade?: string | null
          user_id?: string
          utilidade_natureza?: string | null
        }
        Relationships: []
      }
      mapa_transformacao: {
        Row: {
          acoes_abandonar: string | null
          acoes_evitadas: string | null
          acoes_iniciar: string | null
          acoes_sem_sentido: string | null
          compromisso_repeticao: boolean | null
          created_at: string
          data_reflexao: string
          id: string
          lembretes_escolhidos: string[] | null
          nome: string | null
          usa_pausa_reflexiva: boolean | null
          user_id: string
        }
        Insert: {
          acoes_abandonar?: string | null
          acoes_evitadas?: string | null
          acoes_iniciar?: string | null
          acoes_sem_sentido?: string | null
          compromisso_repeticao?: boolean | null
          created_at?: string
          data_reflexao?: string
          id?: string
          lembretes_escolhidos?: string[] | null
          nome?: string | null
          usa_pausa_reflexiva?: boolean | null
          user_id: string
        }
        Update: {
          acoes_abandonar?: string | null
          acoes_evitadas?: string | null
          acoes_iniciar?: string | null
          acoes_sem_sentido?: string | null
          compromisso_repeticao?: boolean | null
          created_at?: string
          data_reflexao?: string
          id?: string
          lembretes_escolhidos?: string[] | null
          nome?: string | null
          usa_pausa_reflexiva?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          related_session_id: string | null
          scheduled_for: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          related_session_id?: string | null
          scheduled_for?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          related_session_id?: string | null
          scheduled_for?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_session_id_fkey"
            columns: ["related_session_id"]
            isOneToOne: false
            referencedRelation: "sessoes"
            referencedColumns: ["id"]
          },
        ]
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
            foreignKeyName: "pagamentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
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
      pontuacoes: {
        Row: {
          data: string
          id: string
          tipo_acao: string
          user_id: string
          valor: number
        }
        Insert: {
          data?: string
          id?: string
          tipo_acao: string
          user_id: string
          valor: number
        }
        Update: {
          data?: string
          id?: string
          tipo_acao?: string
          user_id?: string
          valor?: number
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
          notes: string | null
          phone: string | null
          preferences: Json | null
          role: string | null
          status: string | null
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
          notes?: string | null
          phone?: string | null
          preferences?: Json | null
          role?: string | null
          status?: string | null
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
          notes?: string | null
          phone?: string | null
          preferences?: Json | null
          role?: string | null
          status?: string | null
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
      protocolo_respostas: {
        Row: {
          created_at: string
          id: string
          protocolo_tipo: string
          respostas: Json
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          protocolo_tipo: string
          respostas: Json
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          protocolo_tipo?: string
          respostas?: Json
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "protocolo_respostas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "protocolo_respostas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
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
          {
            foreignKeyName: "questionnaire_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      relacionamento_casal: {
        Row: {
          areas_melhorar: string[] | null
          created_at: string
          data_teste: string
          id: string
          nivel_rapport: number | null
          partner_email: string | null
          partner_name: string | null
          pontos_fortes: string[] | null
          respostas: Json
          user_id: string | null
        }
        Insert: {
          areas_melhorar?: string[] | null
          created_at?: string
          data_teste?: string
          id?: string
          nivel_rapport?: number | null
          partner_email?: string | null
          partner_name?: string | null
          pontos_fortes?: string[] | null
          respostas: Json
          user_id?: string | null
        }
        Update: {
          areas_melhorar?: string[] | null
          created_at?: string
          data_teste?: string
          id?: string
          nivel_rapport?: number | null
          partner_email?: string | null
          partner_name?: string | null
          pontos_fortes?: string[] | null
          respostas?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "relacionamento_casal_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relacionamento_casal_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      renda: {
        Row: {
          created_at: string
          data: string | null
          descricao: string
          id: string
          sugestao_ia: string | null
          tipo: string
          user_id: string
          valor_estimado: number
          viabilidade: string | null
        }
        Insert: {
          created_at?: string
          data?: string | null
          descricao: string
          id?: string
          sugestao_ia?: string | null
          tipo: string
          user_id: string
          valor_estimado: number
          viabilidade?: string | null
        }
        Update: {
          created_at?: string
          data?: string | null
          descricao?: string
          id?: string
          sugestao_ia?: string | null
          tipo?: string
          user_id?: string
          valor_estimado?: number
          viabilidade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "renda_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "renda_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      reserva_financeira: {
        Row: {
          created_at: string
          descricao_meta: string | null
          id: string
          nivel_protecao: string
          user_id: string
          valor_atual: number
          valor_objetivo: number
        }
        Insert: {
          created_at?: string
          descricao_meta?: string | null
          id?: string
          nivel_protecao: string
          user_id: string
          valor_atual: number
          valor_objetivo: number
        }
        Update: {
          created_at?: string
          descricao_meta?: string | null
          id?: string
          nivel_protecao?: string
          user_id?: string
          valor_atual?: number
          valor_objetivo?: number
        }
        Relationships: [
          {
            foreignKeyName: "reserva_financeira_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reserva_financeira_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      rewards: {
        Row: {
          category: string
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          name: string
          points_required: number
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          name: string
          points_required: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          name?: string
          points_required?: number
        }
        Relationships: []
      }
      sessoes: {
        Row: {
          cliente_id: string | null
          created_at: string
          data_hora: string
          data_pagamento: string | null
          feedback: string | null
          google_event_id: string | null
          guest_email: string | null
          id: string
          invitation_sent_at: string | null
          invitation_status: string | null
          notas: string | null
          post_session_notes: string | null
          reminder_sent_at: string | null
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
          feedback?: string | null
          google_event_id?: string | null
          guest_email?: string | null
          id?: string
          invitation_sent_at?: string | null
          invitation_status?: string | null
          notas?: string | null
          post_session_notes?: string | null
          reminder_sent_at?: string | null
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
          feedback?: string | null
          google_event_id?: string | null
          guest_email?: string | null
          id?: string
          invitation_sent_at?: string | null
          invitation_status?: string | null
          notas?: string | null
          post_session_notes?: string | null
          reminder_sent_at?: string | null
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
          {
            foreignKeyName: "sessoes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
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
          {
            foreignKeyName: "smart_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      specialist_details: {
        Row: {
          areas_of_expertise: string[] | null
          booking_system: boolean | null
          certifications: string[] | null
          color_preference: string | null
          competitor_sites: string | null
          content_sections: Json | null
          created_at: string | null
          education: string | null
          existing_site: boolean | null
          existing_site_url: string | null
          id: string
          include_tests: boolean | null
          languages: string[] | null
          long_description: string | null
          other_test_description: string | null
          preferred_style: string | null
          rating: number | null
          services: string | null
          sessions_completed: number | null
          short_description: string | null
          site_goals: string | null
          specialist_id: string
          target_audience: string | null
          techniques_list: string | null
          test_types: Json | null
          thumbnail_url: string | null
          updated_at: string | null
        }
        Insert: {
          areas_of_expertise?: string[] | null
          booking_system?: boolean | null
          certifications?: string[] | null
          color_preference?: string | null
          competitor_sites?: string | null
          content_sections?: Json | null
          created_at?: string | null
          education?: string | null
          existing_site?: boolean | null
          existing_site_url?: string | null
          id?: string
          include_tests?: boolean | null
          languages?: string[] | null
          long_description?: string | null
          other_test_description?: string | null
          preferred_style?: string | null
          rating?: number | null
          services?: string | null
          sessions_completed?: number | null
          short_description?: string | null
          site_goals?: string | null
          specialist_id: string
          target_audience?: string | null
          techniques_list?: string | null
          test_types?: Json | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Update: {
          areas_of_expertise?: string[] | null
          booking_system?: boolean | null
          certifications?: string[] | null
          color_preference?: string | null
          competitor_sites?: string | null
          content_sections?: Json | null
          created_at?: string | null
          education?: string | null
          existing_site?: boolean | null
          existing_site_url?: string | null
          id?: string
          include_tests?: boolean | null
          languages?: string[] | null
          long_description?: string | null
          other_test_description?: string | null
          preferred_style?: string | null
          rating?: number | null
          services?: string | null
          sessions_completed?: number | null
          short_description?: string | null
          site_goals?: string | null
          specialist_id?: string
          target_audience?: string | null
          techniques_list?: string | null
          test_types?: Json | null
          thumbnail_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "specialist_details_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: true
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
        ]
      }
      specialist_registrations: {
        Row: {
          anos_experiencia: string
          areas_especializacao: string | null
          biografia_curta: string | null
          biografia_longa: string | null
          certificacoes: string | null
          created_at: string | null
          email: string
          equipe_criar_copy: boolean | null
          especialidade: string
          formacao: string
          foto_perfil: string | null
          id: string
          idiomas: string | null
          nome_completo: string
          plano_escolhido: string
          preencher_depois: boolean | null
          status: string | null
          telefone: string
          video_apresentacao: string | null
          whatsapp: string | null
        }
        Insert: {
          anos_experiencia: string
          areas_especializacao?: string | null
          biografia_curta?: string | null
          biografia_longa?: string | null
          certificacoes?: string | null
          created_at?: string | null
          email: string
          equipe_criar_copy?: boolean | null
          especialidade: string
          formacao: string
          foto_perfil?: string | null
          id?: string
          idiomas?: string | null
          nome_completo: string
          plano_escolhido: string
          preencher_depois?: boolean | null
          status?: string | null
          telefone: string
          video_apresentacao?: string | null
          whatsapp?: string | null
        }
        Update: {
          anos_experiencia?: string
          areas_especializacao?: string | null
          biografia_curta?: string | null
          biografia_longa?: string | null
          certificacoes?: string | null
          created_at?: string | null
          email?: string
          equipe_criar_copy?: boolean | null
          especialidade?: string
          formacao?: string
          foto_perfil?: string | null
          id?: string
          idiomas?: string | null
          nome_completo?: string
          plano_escolhido?: string
          preencher_depois?: boolean | null
          status?: string | null
          telefone?: string
          video_apresentacao?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      specialists: {
        Row: {
          bio: string | null
          created_at: string
          experience_years: number | null
          id: string
          rating: number | null
          specialty: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          experience_years?: number | null
          id: string
          rating?: number | null
          specialty?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          experience_years?: number | null
          id?: string
          rating?: number | null
          specialty?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      system_config: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string
          id: string
          settings_key: string
          settings_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          settings_key: string
          settings_value?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          settings_key?: string
          settings_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      teste_autismo: {
        Row: {
          data_teste: string
          id: string
          nivel_resultado: string
          percentual: number
          pontuacao: number
          respostas: Json
          user_id: string | null
        }
        Insert: {
          data_teste?: string
          id?: string
          nivel_resultado: string
          percentual: number
          pontuacao: number
          respostas: Json
          user_id?: string | null
        }
        Update: {
          data_teste?: string
          id?: string
          nivel_resultado?: string
          percentual?: number
          pontuacao?: number
          respostas?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teste_autismo_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teste_autismo_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
      teste_tdah: {
        Row: {
          data_teste: string
          id: string
          nivel_resultado: string
          percentual: number
          pontuacao: number
          respostas: Json
          tipo_teste: string
          user_id: string | null
        }
        Insert: {
          data_teste?: string
          id?: string
          nivel_resultado: string
          percentual: number
          pontuacao: number
          respostas: Json
          tipo_teste: string
          user_id?: string | null
        }
        Update: {
          data_teste?: string
          id?: string
          nivel_resultado?: string
          percentual?: number
          pontuacao?: number
          respostas?: Json
          tipo_teste?: string
          user_id?: string | null
        }
        Relationships: []
      }
      therapist_plan_benefits: {
        Row: {
          benefit_id: string
          created_at: string
          id: string
          plan_id: string
        }
        Insert: {
          benefit_id: string
          created_at?: string
          id?: string
          plan_id: string
        }
        Update: {
          benefit_id?: string
          created_at?: string
          id?: string
          plan_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapist_plan_benefits_benefit_id_fkey"
            columns: ["benefit_id"]
            isOneToOne: false
            referencedRelation: "benefits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "therapist_plan_benefits_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "therapist_subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      therapist_subscription_plans: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          plan_type: Database["public"]["Enums"]["plan_type"]
          price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          plan_type: Database["public"]["Enums"]["plan_type"]
          price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          plan_type?: Database["public"]["Enums"]["plan_type"]
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      therapist_subscriptions: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          plan_id: string
          start_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          plan_id: string
          start_date?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          plan_id?: string
          start_date?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapist_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "therapist_subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      trilha_desenvolvimento: {
        Row: {
          acoes_diferentes: string | null
          acoes_imediatas: string | null
          acoes_repetir: string | null
          created_at: string
          fatores_aproximacao: string | null
          fatores_distanciamento: string | null
          id: string
          licoes_aprendidas: string | null
          sonho_grande: string | null
          user_id: string
        }
        Insert: {
          acoes_diferentes?: string | null
          acoes_imediatas?: string | null
          acoes_repetir?: string | null
          created_at?: string
          fatores_aproximacao?: string | null
          fatores_distanciamento?: string | null
          id?: string
          licoes_aprendidas?: string | null
          sonho_grande?: string | null
          user_id: string
        }
        Update: {
          acoes_diferentes?: string | null
          acoes_imediatas?: string | null
          acoes_repetir?: string | null
          created_at?: string
          fatores_aproximacao?: string | null
          fatores_distanciamento?: string | null
          id?: string
          licoes_aprendidas?: string | null
          sonho_grande?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_quiz_attempts: {
        Row: {
          answers: Json
          completed_at: string
          id: string
          quiz_id: string
          score: number
          user_id: string
        }
        Insert: {
          answers: Json
          completed_at?: string
          id?: string
          quiz_id: string
          score: number
          user_id: string
        }
        Update: {
          answers?: Json
          completed_at?: string
          id?: string
          quiz_id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "lesson_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_rewards: {
        Row: {
          earned_at: string
          id: string
          reward_id: string
          user_id: string
        }
        Insert: {
          earned_at?: string
          id?: string
          reward_id: string
          user_id: string
        }
        Update: {
          earned_at?: string
          id?: string
          reward_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_rewards_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
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
      ranking_pontuacao: {
        Row: {
          full_name: string | null
          total_pontos: number | null
          ultima_pontuacao: string | null
          user_id: string | null
        }
        Relationships: []
      }
      session_statistics: {
        Row: {
          cliente_id: string | null
          paid_sessions: number | null
          past_sessions: number | null
          pending_sessions: number | null
          total_paid: number | null
          total_pending: number | null
          total_sessions: number | null
          upcoming_sessions: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sessoes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessoes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "ranking_pontuacao"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Functions: {
      get_complete_schema: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_teste_ansiedade: {
        Args: { user_id_param: string }
        Returns: {
          id: string
          user_id: string
          data_teste: string
          pontuacao: number
          percentual: number
          respostas: Json
          tipo_teste: string
          nivel_resultado: string
        }[]
      }
      get_teste_burnout: {
        Args: { user_id_param: string }
        Returns: {
          id: string
          user_id: string
          data_teste: string
          pontuacao: number
          percentual: number
          respostas: Json
          nivel_resultado: string
        }[]
      }
      get_teste_estresse: {
        Args: { user_id_param: string }
        Returns: {
          id: string
          user_id: string
          data_teste: string
          pontuacao: number
          percentual: number
          respostas: Json
          tipo_teste: string
          nivel_resultado: string
        }[]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      plan_type: "basic" | "professional" | "premium"
      questionnaire_type:
        | "tdah"
        | "iq"
        | "anxiety"
        | "depression"
        | "burnout"
        | "attachment"
        | "saboteurs"
        | "relacionamento"
      timeframe: "short" | "medium" | "long"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      plan_type: ["basic", "professional", "premium"],
      questionnaire_type: [
        "tdah",
        "iq",
        "anxiety",
        "depression",
        "burnout",
        "attachment",
        "saboteurs",
        "relacionamento",
      ],
      timeframe: ["short", "medium", "long"],
    },
  },
} as const
