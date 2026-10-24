import { NextResponse } from "next/server";
import { supabase, saveInquiryToSupabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);

    let inquiries: any[] = [];

    // Query through secure RPC function
    const { data, error } = await (supabase.rpc as any)("get_all_inquiries", {
      p_limit: limit,
    });

    if (error) {
      // Fallback to direct select
      const { data: directData, error: directError } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (directError) {
        console.error("[Inquiries API Error]:", directError);
        return NextResponse.json({ error: directError.message }, { status: 500 });
      }
      inquiries = directData || [];
    } else {
      inquiries = data || [];
    }

    if (status && status !== "all") {
      inquiries = inquiries.filter((item) => item.status === status);
    }

    return NextResponse.json({ inquiries }, { status: 200 });
  } catch (err: any) {
    console.error("[Inquiries API Exception]:", err);
    return NextResponse.json(
      { error: "Internal server error fetching inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, businessName, email, phone, monthlyCallVolume, primaryServiceInterest, notes, source } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "name, email, and phone are required fields." },
        { status: 400 }
      );
    }

    const result = await saveInquiryToSupabase({
      name,
      businessName: businessName || "Not Specified",
      email,
      phone,
      monthlyCallVolume,
      primaryServiceInterest,
      notes,
      source: source || "api",
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, inquiry: result.inquiry }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
