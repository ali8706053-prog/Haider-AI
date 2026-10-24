export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      inquiries: {
        Row: {
          id: string;
          name: string;
          business_name: string;
          email: string;
          phone: string;
          monthly_call_volume: string | null;
          primary_service_interest: string | null;
          notes: string | null;
          source: string | null;
          status: string | null;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          business_name: string;
          email: string;
          phone: string;
          monthly_call_volume?: string | null;
          primary_service_interest?: string | null;
          notes?: string | null;
          source?: string | null;
          status?: string | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          business_name?: string;
          email?: string;
          phone?: string;
          monthly_call_volume?: string | null;
          primary_service_interest?: string | null;
          notes?: string | null;
          source?: string | null;
          status?: string | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
