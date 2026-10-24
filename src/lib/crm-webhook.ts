/**
 * CRM & AUTOMATION WEBHOOK ARCHITECTURE
 * 
 * Supports forwarding captured leads, call transcripts, and appointment bookings
 * to external automation platforms (Make.com, Zapier, GoHighLevel, HubSpot).
 */

export interface LeadSubmissionPayload {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  monthlyCallVolume: string;
  primaryServiceInterest: string;
  notes?: string;
  submittedAt: string;
  source: "website_hero_cta" | "contact_section" | "demo_modal" | "voice_simulator";
}

export interface WebhookDispatchResult {
  success: boolean;
  message: string;
  dispatchedTo?: string[];
}

/**
 * Dispatches lead data to configured webhook URLs.
 * If no webhook URL is defined in .env, it safely logs the submission in development.
 */
export async function dispatchLeadToCrm(lead: LeadSubmissionPayload): Promise<WebhookDispatchResult> {
  const webhookUrl = process.env.CRM_WEBHOOK_URL; // e.g. Make.com webhook or GoHighLevel trigger

  if (!webhookUrl) {
    // When no external webhook is set up yet, we safely log in development
    console.log("[Ringwell AI Lead Intake - Ready for Webhook Sync]:", {
      leadName: lead.name,
      business: lead.businessName,
      email: lead.email,
      phone: lead.phone,
      callVolume: lead.monthlyCallVolume,
      interest: lead.primaryServiceInterest,
      timestamp: lead.submittedAt,
    });

    return {
      success: true,
      message: "Lead captured locally. Ready to connect to CRM_WEBHOOK_URL.",
      dispatchedTo: ["local_staging_logger"],
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      throw new Error(`Webhook endpoint responded with status ${response.status}`);
    }

    return {
      success: true,
      message: "Lead successfully synced to CRM webhook.",
      dispatchedTo: [webhookUrl],
    };
  } catch (error) {
    console.error("CRM Webhook dispatch failed:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to dispatch lead webhook",
    };
  }
}
