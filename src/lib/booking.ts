/**
 * APPOINTMENT BOOKING ARCHITECTURE
 * 
 * Supports integration with Cal.com, Calendly, or custom booking engines.
 */

export interface BookingSlotRequest {
  date: string; // YYYY-MM-DD
  timezone: string;
}

export interface BookingAppointmentRequest {
  name: string;
  email: string;
  phone: string;
  startTime: string; // ISO string
  notes?: string;
  source: string;
}

export interface BookingResponse {
  bookingId: string;
  status: "confirmed" | "pending" | "failed";
  calendarEventUrl?: string;
  scheduledTime: string;
}

/**
 * Helper to get the embed URL or direct scheduling link
 * Can be customized with user's Cal.com or Calendly username in .env
 */
export function getDemoBookingLink(): string {
  // If user sets a custom CAL_LINK or CALENDLY_LINK in .env, use that
  const customLink = process.env.NEXT_PUBLIC_BOOKING_URL;
  if (customLink) {
    return customLink;
  }
  // Default to internal high-conversion interactive modal
  return "#book-demo";
}
