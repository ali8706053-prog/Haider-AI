import { NextResponse } from "next/server";
import { dispatchLeadToCrm, LeadSubmissionPayload } from "@/lib/crm-webhook";
import { saveInquiryToSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch (parseError) {
    return NextResponse.json(
      { error: "Invalid JSON payload provided." },
      { status: 400 }
    );
  }

  try {
    const {
      name,
      businessName,
      email,
      phone,
      monthlyCallVolume,
      primaryServiceInterest,
      notes,
      website_hp,
      source = "contact_section",
    } = body || {};

    // 1. Honeypot Anti-Spam Check
    if (website_hp) {
      // If honeypot is filled out by a bot, silently return success without dispatching
      return NextResponse.json(
        { success: true, message: "Inquiry received." },
        { status: 200 }
      );
    }

    // 2. Server-side Field Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!businessName || typeof businessName !== "string" || businessName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your company or practice name." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid work email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      return NextResponse.json(
        { error: "Please enter a valid phone number for demo confirmation." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedBusiness = businessName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();
    const cleanVolume = monthlyCallVolume || "100-300 calls/mo";
    const cleanInterest = primaryServiceInterest || "AI Appointment Receptionist";
    const cleanNotes = notes?.trim() || "";

    // 3. Extract request metadata
    const userAgent = request.headers.get("user-agent") || undefined;
    const referer = request.headers.get("referer") || undefined;
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined;

    // 4. Save to Supabase inquiries backend
    const supabaseResult = await saveInquiryToSupabase({
      name: trimmedName,
      businessName: trimmedBusiness,
      email: trimmedEmail,
      phone: trimmedPhone,
      monthlyCallVolume: cleanVolume,
      primaryServiceInterest: cleanInterest,
      notes: cleanNotes,
      source,
      metadata: {
        userAgent,
        referer,
        ip,
        receivedAt: new Date().toISOString(),
      },
    });

    if (!supabaseResult.success) {
      console.warn(
        "[Contact API] Warning: Supabase storage returned non-fatal error:",
        supabaseResult.error
      );
    }

    // 5. CRM Webhook sync (if configured)
    const payload: LeadSubmissionPayload = {
      name: trimmedName,
      businessName: trimmedBusiness,
      email: trimmedEmail,
      phone: trimmedPhone,
      monthlyCallVolume: cleanVolume,
      primaryServiceInterest: cleanInterest,
      notes: cleanNotes,
      submittedAt: new Date().toISOString(),
      source,
    };

    const dispatchResult = await dispatchLeadToCrm(payload);

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your demo request has been received. We'll confirm the expected follow-up time when we review your inquiry.",
        lead: {
          id: supabaseResult.inquiry?.id,
          name: payload.name,
          businessName: payload.businessName,
          email: payload.email,
        },
        supabaseSaved: supabaseResult.success,
        integrationStatus: dispatchResult.message,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: "Internal server error while processing your request. Please try again." },
      { status: 500 }
    );
  }
}
