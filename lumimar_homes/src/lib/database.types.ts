export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
  lumimar: {
    Tables: {
      lead_inquiries: {
        Row: {
          assigned_to: string | null;
          created_at: string;
          current_earnings_band: string | null;
          email: string;
          id: string;
          location: string;
          message: string | null;
          metadata: Json;
          name: string;
          phone: string;
          service: string;
          source: string;
          stage: Database['lumimar']['Enums']['lead_stage'];
          updated_at: string;
        };
        Insert: {
          assigned_to?: string | null;
          created_at?: string;
          current_earnings_band?: string | null;
          email: string;
          id?: string;
          location: string;
          message?: string | null;
          metadata?: Json;
          name: string;
          phone: string;
          service: string;
          source?: string;
          stage?: Database['lumimar']['Enums']['lead_stage'];
          updated_at?: string;
        };
        Update: {
          assigned_to?: string | null;
          created_at?: string;
          current_earnings_band?: string | null;
          email?: string;
          id?: string;
          location?: string;
          message?: string | null;
          metadata?: Json;
          name?: string;
          phone?: string;
          service?: string;
          source?: string;
          stage?: Database['lumimar']['Enums']['lead_stage'];
          updated_at?: string;
        };
        Relationships: [];
      };
      owners: {
        Row: {
          created_at: string;
          display_name: string;
          email: string | null;
          id: string;
          legal_name: string | null;
          notes: string | null;
          payout_method: string | null;
          payout_reference: string | null;
          phone: string | null;
          primary_contact_user_id: string | null;
          primary_residence: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          display_name: string;
          email?: string | null;
          id?: string;
          legal_name?: string | null;
          notes?: string | null;
          payout_method?: string | null;
          payout_reference?: string | null;
          phone?: string | null;
          primary_contact_user_id?: string | null;
          primary_residence?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          display_name?: string;
          email?: string | null;
          id?: string;
          legal_name?: string | null;
          notes?: string | null;
          payout_method?: string | null;
          payout_reference?: string | null;
          phone?: string | null;
          primary_contact_user_id?: string | null;
          primary_residence?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          full_name: string | null;
          id: string;
          is_active: boolean;
          phone: string | null;
          role: Database['lumimar']['Enums']['app_role'];
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id: string;
          is_active?: boolean;
          phone?: string | null;
          role?: Database['lumimar']['Enums']['app_role'];
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
          is_active?: boolean;
          phone?: string | null;
          role?: Database['lumimar']['Enums']['app_role'];
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      lead_pipeline_summary: {
        Row: {
          stage: Database['lumimar']['Enums']['lead_stage'] | null;
          total: number | null;
        };
      };
      owner_dashboard_summary: {
        Row: {
          active_properties: number | null;
          month_gross_revenue: number | null;
          month_net_payouts: number | null;
          open_maintenance_tickets: number | null;
          owner_id: string | null;
          upcoming_bookings: number | null;
        };
      };
    };
    Functions: {
      current_app_role: {
        Args: Record<PropertyKey, never>;
        Returns: Database['lumimar']['Enums']['app_role'];
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_staff: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      owns_owner: {
        Args: { target_owner_id: string };
        Returns: boolean;
      };
      owns_property: {
        Args: { target_property_id: string };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: 'owner' | 'staff' | 'admin';
      lead_stage: 'new' | 'discovery' | 'site_visit' | 'proposal' | 'closing' | 'won' | 'lost';
    };
    CompositeTypes: Record<string, never>;
  };
};

export type AppRole = Database['lumimar']['Enums']['app_role'];
export type Profile = Database['lumimar']['Tables']['profiles']['Row'];
