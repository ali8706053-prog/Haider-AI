export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  highlights: string[];
  compatibilityNote?: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "voice-receptionist",
    title: "AI Voice Receptionist",
    subtitle: "24/7 autonomous phone answering and lead capture.",
    description:
      "A human-grade voice agent that picks up inbound calls, answers questions accurately from your business knowledge base, captures caller info, and transfers calls according to configured rules.",
    icon: "PhoneCall",
    badge: "Core Service",
    highlights: [
      "24/7 call answering when configured",
      "Custom business knowledge base & FAQ training",
      "Lead capture with email and SMS staff notifications",
      "After-hours and overflow call answering",
      "Call transfers based on customizable routing logic",
    ],
  },
  {
    id: "appointment-receptionist",
    title: "AI Appointment Receptionist",
    subtitle: "Seamless appointment booking, rescheduling & cancellations.",
    description:
      "Checks live calendar availability, books appointments, handles cancellations, and sends automated confirmations and reminders directly to callers and staff.",
    icon: "CalendarCheck",
    badge: "Recommended",
    highlights: [
      "Real-time availability checking",
      "Direct appointment scheduling on your calendar",
      "Self-service rescheduling and cancellation handling",
      "Automated appointment confirmations & reminders",
      "Deep lead qualification before booking",
    ],
    compatibilityNote: "Requires compatible calendar software with API connectivity (Google Calendar, Cal.com, Calendly, Outlook 365).",
  },
  {
    id: "front-desk",
    title: "AI Front Desk",
    subtitle: "Complete autonomous front-office operations.",
    description:
      "Our most comprehensive reception suite. Features multilingual support, warm transfers, deep lead qualification, verbatim transcripts, and front-desk analytics.",
    icon: "Headset",
    badge: "Enterprise Grade",
    highlights: [
      "Multilingual conversation capabilities",
      "Warm call transfers where telephony provider supports it",
      "SMS appointment confirmations & alerts",
      "Verbatim call transcripts and structured summaries",
      "Front-office conversation analytics & metrics",
    ],
  },
  {
    id: "website-assistant",
    title: "Website Conversational AI Assistant",
    subtitle: "Engage, qualify, and convert website traffic 24/7.",
    description:
      "An intelligent, branded on-site conversational assistant that answers visitor questions, captures lead inquiries, and schedules demos directly inside your web page.",
    icon: "Bot",
    badge: "Omnichannel",
    highlights: [
      "Trained on your website content and product catalog",
      "Instant lead capture with visitor contact verification",
      "Direct calendar booking within chat interface",
      "Seamless handoff to human support when needed",
    ],
  },
  {
    id: "3d-websites",
    title: "3D Animated Website Development",
    subtitle: "High-converting, futuristic web experiences.",
    description:
      "We design and engineer bespoke 3D animated, dark-themed websites built on Next.js and Tailwind CSS that elevate your brand and turn casual visitors into paying clients.",
    icon: "Sparkles",
    badge: "Design & Tech",
    highlights: [
      "Futuristic dark-themed aesthetics with custom 3D accents",
      "Mobile-optimized, high-speed performance architecture",
      "Technical SEO, semantic markup, and metadata optimization",
      "Conversion-rate optimized user journey and sticky CTAs",
    ],
  },
  {
    id: "workflow-automation",
    title: "Business Workflow Automation",
    subtitle: "Connect your front desk to back-office execution.",
    description:
      "Eliminate repetitive manual data entry. We design automated workflows that sync call transcripts, lead details, appointment data, and notifications across your software stack.",
    icon: "Workflow",
    badge: "Efficiency",
    highlights: [
      "Automated lead routing and instant staff alerts",
      "Call summary generation and automatic record tagging",
      "Multi-step trigger workflows via webhooks",
      "Reduced administrative workload for office teams",
    ],
  },
  {
    id: "crm-calendar-integrations",
    title: "CRM & Calendar Integrations",
    subtitle: "Subject to software compatibility & API licensing.",
    description:
      "We connect your AI voice receptionist with your existing tech stack, including HubSpot, GoHighLevel, Salesforce, Google Calendar, and Cal.com, subject to compatibility.",
    icon: "Database",
    badge: "Integrations",
    highlights: [
      "Two-way contact and lead data synchronization",
      "Automated pipeline stage updates and activity logging",
      "Double-booking prevention through real-time calendar queries",
      "Custom webhook endpoints for proprietary systems",
    ],
    compatibilityNote: "Integration depth depends on third-party API tiers, plan levels, and webhook support.",
  },
];
