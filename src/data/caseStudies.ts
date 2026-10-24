export interface CaseStudy {
  id: string;
  isIllustrative: boolean;
  label: string;
  title: string;
  industry: string;
  businessChallenge: string;
  implementedSolution: string;
  measuredMetric: string;
  metricLabel: string;
  implementationDetails: string[];
  ctaText: string;
}

/**
 * RINGWELL AI — CASE STUDIES & DEPLOYMENT BLUEPRINTS
 * Note: Clearly labeled as illustrative deployment architectures in compliance with
 * transparent commercial standards until verified client case studies are authorized.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "medical-dental-pilot",
    isIllustrative: true,
    label: "Illustrative Deployment Architecture",
    title: "After-Hours Dental Emergency & New Patient Booking Architecture",
    industry: "Healthcare & Dental Clinics",
    businessChallenge:
      "A high-volume family dental practice experienced heavy missed call rates during lunch breaks and after 5:00 PM. Prospective new patients who encountered voicemail routinely booked with competing local practices.",
    implementedSolution:
      "Configured a Ringwell AI Professional voice receptionist integrated with the clinic's calendar. The agent was trained on practice insurance accepted, emergency triage rules, and booking new patient cleanings.",
    measuredMetric: "100%",
    metricLabel: "After-hours call coverage & emergency triage",
    implementationDetails: [
      "Conditional call forwarding activated after 3 rings and during closed hours",
      "Cal.com / Google Calendar two-way synchronization with 15-minute buffer rules",
      "Immediate SMS confirmation dispatched to patients with intake links",
      "Emergency toothache escalation protocol with on-call dentist warm transfer",
    ],
    ctaText: "Review Healthcare Blueprint",
  },
  {
    id: "home-services-hvac",
    isIllustrative: true,
    label: "Illustrative Deployment Architecture",
    title: "Urgent HVAC Dispatch & High-Intent Speed-to-Lead Automation",
    industry: "HVAC & Home Services",
    businessChallenge:
      "During peak weather extremes (summer heat waves and winter freezes), office dispatchers were overwhelmed by concurrent calls. Homeowners calling about broken AC units hung up if placed on hold for more than 45 seconds.",
    implementedSolution:
      "Deployed a Ringwell AI Voice Receptionist capable of answering dozens of incoming calls simultaneously with zero hold queue, collecting diagnostic details, service address, and dispatching calendar slots.",
    measuredMetric: "< 1s",
    metricLabel: "Average answer speed on ring one",
    implementationDetails: [
      "Concurrent call answering eliminates busy signals and hold queues",
      "Pre-qualification of service zip codes, diagnostic fees, and system types",
      "Automated webhook dispatch to dispatch CRM and technician Slack channels",
      "Weekend and holiday coverage with zero overtime payroll costs",
    ],
    ctaText: "Review HVAC Blueprint",
  },
  {
    id: "legal-intake-screening",
    isIllustrative: true,
    label: "Illustrative Deployment Architecture",
    title: "24/7 Legal Consultation Intake & Pre-Qualification Screening",
    industry: "Legal & Law Firms",
    businessChallenge:
      "A personal injury practice invested heavily in digital ads, but leads calling in the evenings or on weekends were greeted by an answering service that only took generic names and phone numbers without qualifying case criteria.",
    implementedSolution:
      "Configured a Ringwell AI Front Desk agent trained on specific case qualification questions (incident date, injury severity, police report existence) to filter retainers and book attorney discovery calls.",
    measuredMetric: "24/7",
    metricLabel: "Consistent legal intake qualification",
    implementationDetails: [
      "Empathetic, professional brand persona calibrated for distressed callers",
      "Structured case qualification questionnaire with conflict screening criteria",
      "Instant calendar booking for managing partner consultations",
      "Verbatim audio transcripts and structured summaries synced to legal CRM",
    ],
    ctaText: "Review Legal Blueprint",
  },
];
