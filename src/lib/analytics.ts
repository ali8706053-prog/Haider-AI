/**
 * GOOGLE ANALYTICS 4 (GA4) EVENT TRACKING UTILITY
 * 
 * Safely reads NEXT_PUBLIC_GA_MEASUREMENT_ID from environment.
 * If the measurement ID is not provided, events are logged cleanly in development
 * without throwing errors or breaking user experience.
 * 
 * PII SANITIZATION: Never transmits names, emails, phone numbers, or form input values.
 */

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | "book_demo_click"
  | "contact_form_start"
  | "generate_lead"
  | "pricing_plan_click"
  | "phone_click"
  | "email_click";

export interface AnalyticsEventParams {
  category?: string;
  label?: string;
  value?: number;
  plan_id?: string;
  source_location?: string;
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(name: AnalyticsEventName, params?: AnalyticsEventParams): void {
  if (typeof window === "undefined") return;

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (window.gtag && gaId) {
    window.gtag("event", name, {
      ...params,
      send_to: gaId,
    });
  } else if (process.env.NODE_ENV === "development") {
    console.log(`[GA4 Event (Disabled/Dev)]: ${name}`, params || {});
  }
}
