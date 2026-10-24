import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://zpcbzyqbxbkpocikncwa.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwY2J6eXFieGJrcG9jaWtuY3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4MjAzMjAsImV4cCI6MjEwODM5NjMyMH0.c48nPq0BFMaTvFr7zLTcDHMnYRvaVmzQmIgfdzoNBcg";

// Client for public / server routes
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export interface InquiryRecordInput {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  monthlyCallVolume?: string;
  primaryServiceInterest?: string;
  notes?: string;
  source?: string;
  metadata?: Record<string, any>;
}

export async function saveInquiryToSupabase(payload: InquiryRecordInput) {
  try {
    // 1. Try secure RPC function (bypasses RLS SELECT restriction and returns ID safely)
    const { data: rpcId, error: rpcError } = await (supabase.rpc as any)(
      "submit_inquiry",
      {
        p_name: payload.name,
        p_business_name: payload.businessName,
        p_email: payload.email,
        p_phone: payload.phone,
        p_monthly_call_volume: payload.monthlyCallVolume || null,
        p_primary_service_interest: payload.primaryServiceInterest || null,
        p_notes: payload.notes || null,
        p_source: payload.source || "website",
        p_metadata: payload.metadata || {},
      }
    );

    if (!rpcError && rpcId) {
      return {
        success: true,
        inquiry: {
          id: rpcId,
          ...payload,
        },
      };
    }

    // 2. Fallback to direct INSERT without .select()
    const { error: insertError } = await supabase.from("inquiries").insert({
      name: payload.name,
      business_name: payload.businessName,
      email: payload.email,
      phone: payload.phone,
      monthly_call_volume: payload.monthlyCallVolume || null,
      primary_service_interest: payload.primaryServiceInterest || null,
      notes: payload.notes || null,
      source: payload.source || "website",
      metadata: payload.metadata || {},
      status: "new",
    });

    if (insertError) {
      console.error("[Supabase Error] Failed to insert inquiry:", insertError);
      return { success: false, error: insertError.message };
    }

    return { success: true, inquiry: { id: "inserted", ...payload } };
  } catch (err: any) {
    console.error("[Supabase Exception] Failed to save inquiry:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
}
