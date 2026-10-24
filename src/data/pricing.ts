export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  setupFee: number;
  monthlyMaintenance: number;
  complimentaryFirstMonthBonus: boolean;
  minutesIncluded: number | string;
  languages: string;
  popular?: boolean;
  features: string[];
  promotionalBonuses?: {
    title: string;
    advertisedValue: string;
    eligibilityNote: string;
  }[];
  commercialNotes: string[];
  ctaText: string;
}

/**
 * RINGWELL AI — OFFICIAL PACKAGES & PRICING
 * Configured according to verified commercial terms.
 * Setup fee applies to all tiers. First month maintenance included as signing bonus.
 */
export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter — AI Receptionist",
    badge: "Essential Answering",
    tagline: "Essential 24/7 call answering and lead capture for businesses that need reliable phone coverage.",
    setupFee: 349,
    monthlyMaintenance: 299,
    complimentaryFirstMonthBonus: true,
    minutesIncluded: 200,
    languages: "One Language (English or Spanish)",
    popular: false,
    features: [
      "200 included minutes per month",
      "One language configured",
      "24/7 call answering when configured",
      "Business FAQs and knowledge base",
      "Inbound lead capture & contact intake",
      "Call transfers according to configured rules",
      "After-hours & overflow answering",
    ],
    commercialNotes: [
      "Setup fee of $349 is required and not waived.",
      "First month's maintenance ($299) provided as a complimentary signing bonus.",
      "Telephony carrier line charges apply; additional minutes billed according to agreed usage schedule.",
    ],
    ctaText: "Choose Starter",
  },
  {
    id: "professional",
    name: "Professional — AI Appointment Receptionist",
    badge: "Recommended for Appointment Businesses",
    tagline: "Full-service appointment scheduling, calendar integration, and lead qualification.",
    setupFee: 499,
    monthlyMaintenance: 449,
    complimentaryFirstMonthBonus: true,
    minutesIncluded: 300,
    languages: "Two Languages (e.g. English + Spanish)",
    popular: true,
    features: [
      "Everything in Starter, plus:",
      "300 included minutes per month",
      "Two languages supported",
      "Real-time calendar availability checking",
      "Direct appointment booking & self-service rescheduling",
      "Appointment cancellations & slot reopening",
      "Calendar integration (Google, Cal.com, Calendly, Outlook)",
      "Automated appointment confirmations & reminders",
      "Custom lead qualification questionnaires",
      "Direct email and staff notifications",
    ],
    commercialNotes: [
      "Setup fee of $499 is required and not waived.",
      "First month's maintenance ($449) provided as a complimentary signing bonus.",
      "Calendar sync requires compatible calendar software with API access.",
    ],
    ctaText: "Choose Professional",
  },
  {
    id: "premium",
    name: "Premium — AI Front Desk",
    badge: "Full Autonomous Front Desk",
    tagline: "Complete front desk automation with CRM integration, warm transfers, and high-value promotional bonuses.",
    setupFee: 749,
    monthlyMaintenance: 599,
    complimentaryFirstMonthBonus: true,
    minutesIncluded: "400 (expandable by agreement)",
    languages: "Multilingual Capabilities",
    popular: false,
    features: [
      "Everything in Professional, plus:",
      "400 included minutes per month (custom volume upon request)",
      "Multilingual capabilities for diverse demographics",
      "Advanced CRM integration (HubSpot, GoHighLevel, Salesforce, etc., subject to compatibility)",
      "Warm call transfers where telephony provider supports it",
      "Automated SMS appointment confirmations",
      "Deep lead qualification scoring",
      "Detailed call summaries and verbatim transcripts",
      "Advanced front-desk analytics dashboard",
    ],
    promotionalBonuses: [
      {
        title: "Website Conversational AI Assistant",
        advertisedValue: "$700 Value",
        eligibilityNote: "Included as promotional bonus for eligible active accounts; subject to scope.",
      },
      {
        title: "3D Animated Website Development",
        advertisedValue: "$3,000 Value",
        eligibilityNote: "Promotional bonus for eligible sign-ups; subject to agreement and asset readiness.",
      },
    ],
    commercialNotes: [
      "Setup fee of $749 is required and not waived.",
      "First month's maintenance ($599) provided as a complimentary signing bonus.",
      "CRM integration subject to platform API compatibility and licensing.",
      "Promotional bonuses subject to eligibility, agreed scope, and technical compatibility.",
    ],
    ctaText: "Choose Premium",
  },
];
