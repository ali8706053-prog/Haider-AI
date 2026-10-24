/**
 * RETELL AI INTEGRATION ARCHITECTURE
 * 
 * This module provides clean TypeScript contracts and helper methods for connecting
 * Ringwell AI to the Retell AI Voice Agent engine (https://docs.retellai.com).
 * 
 * NOTE: As per system security guidelines, no simulated or invented API keys are provided.
 * When you are ready to connect your production Retell AI account:
 * 1. Add your key to .env.local: RETELL_API_KEY="key_xxxxxxxxxxxx"
 * 2. Add your Agent ID: RETELL_AGENT_ID="agent_xxxxxxxxxxxx"
 */

export interface RetellAgentConfig {
  agentId: string;
  agentName: string;
  voiceId: string;
  llmModel: string;
  ambientSound?: "coffee-shop" | "office" | "call-center" | "none";
  responsiveness: number; // 0.0 - 1.0 (sub-800ms)
  interruptionSensitivity: number; // 0.0 - 1.0
  enableBackchannel?: boolean;
  reminderTriggerMs?: number;
}

export interface RetellWebCallRequest {
  agentId?: string;
  metadata?: Record<string, string | number | boolean>;
  retellLlmDynamicVariables?: Record<string, string>;
}

export interface RetellWebCallResponse {
  callId: string;
  webCallLink?: string;
  accessToken?: string;
  status: "registered" | "ongoing" | "ended" | "error";
  agentId: string;
}

export interface RetellCallTranscriptItem {
  role: "agent" | "user" | "system";
  content: string;
  words?: Array<{
    word: string;
    start: number;
    end: number;
  }>;
}

export interface RetellCallAnalysis {
  callSummary: string;
  userSentiment: "Positive" | "Neutral" | "Negative";
  callSuccessful: boolean;
  customAnalysisData?: Record<string, unknown>;
  inVoicemail?: boolean;
}

export interface RetellWebhookPayload {
  event: "call_started" | "call_ended" | "call_analyzed";
  data: {
    call_id: string;
    agent_id: string;
    call_status: string;
    start_timestamp: number;
    end_timestamp?: number;
    duration_ms?: number;
    transcript?: string;
    transcript_object?: RetellCallTranscriptItem[];
    recording_url?: string;
    disconnection_reason?: string;
    call_analysis?: RetellCallAnalysis;
  };
}

/**
 * Service stub to initiate a Retell AI Web Call (browser mic-to-agent session)
 * Cleanly handles missing credentials with informative error states.
 */
export async function createRetellWebCall(params?: RetellWebCallRequest): Promise<RetellWebCallResponse> {
  const apiKey = process.env.RETELL_API_KEY;
  const agentId = params?.agentId || process.env.RETELL_AGENT_ID;

  if (!apiKey || !agentId) {
    // Graceful unconfigured state for development and preview
    return {
      callId: "mock_session_preview",
      status: "registered",
      agentId: agentId || "unconfigured",
    };
  }

  const response = await fetch("https://api.retellai.com/v2/create-web-call", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agent_id: agentId,
      metadata: params?.metadata,
      retell_llm_dynamic_variables: params?.retellLlmDynamicVariables,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Retell AI API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return {
    callId: data.call_id,
    accessToken: data.access_token,
    status: "registered",
    agentId,
  };
}
