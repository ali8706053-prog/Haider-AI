export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "overview" | "features" | "pricing" | "technical" | "promotions";
}

export const FAQS_DATA: FaqItem[] = [
  {
    id: "what-is-ai-receptionist",
    category: "overview",
    question: "What is an AI receptionist?",
    answer:
      "An AI receptionist is an automated, voice-enabled intelligence system engineered to answer incoming phone calls naturally. Unlike outdated touch-tone phone menus (IVRs), Ringwell AI listens, understands caller inquiries in real time, answers business questions based on your verified knowledge base, captures lead details, and books appointments into your calendar.",
  },
  {
    id: "how-does-it-handle-calls",
    category: "features",
    question: "How does it handle calls?",
    answer:
      "When a caller dials your phone number, the AI answers on the first ring, introduces itself with your brand persona, and conducts a conversational dialogue. It understands natural pauses and interruptions, provides concise answers to questions, gathers required contact and qualifying details, and can initiate transfers or calendar bookings according to configured rules.",
  },
  {
    id: "can-it-answer-after-hours",
    category: "features",
    question: "Can it answer calls after hours?",
    answer:
      "Yes. Ringwell AI can be configured to answer calls 24/7/365, solely after hours, or on overflow when your human staff is on another call. This ensures prospective clients who call during evenings, weekends, or lunch breaks never reach a dead-end voicemail.",
  },
  {
    id: "can-it-book-reschedule-cancel",
    category: "features",
    question: "Can it book, reschedule, and cancel appointments?",
    answer:
      "Yes. On our Professional and Premium tiers, the AI checks live calendar availability, offers available slots, books appointments with verified contact information, and allows callers to cancel or reschedule existing appointments without staff intervention.",
  },
  {
    id: "which-calendars-and-crms",
    category: "technical",
    question: "Which calendars and CRMs are supported?",
    answer:
      "We support standard modern calendar systems including Google Calendar, Cal.com, Calendly, and Outlook 365. For CRMs, we support HubSpot, GoHighLevel, Salesforce, and custom endpoints via webhooks on our Premium tier, subject to third-party API availability, compatibility, and licensing.",
  },
  {
    id: "what-are-packages-and-prices",
    category: "pricing",
    question: "What are the three packages and their prices?",
    answer:
      "We offer three structured plans: 1) Starter ($349 setup, $299/month maintenance), 2) Professional ($499 setup, $449/month maintenance), and 3) Premium ($749 setup, $599/month maintenance). Our current signing offer includes the first month's maintenance as a complimentary bonus on all tiers; setup fees apply to all plans.",
  },
  {
    id: "what-are-included-minutes",
    category: "pricing",
    question: "What are the included call minutes?",
    answer:
      "Starter includes 200 minutes per month; Professional includes 300 minutes per month; Premium includes 400 minutes per month (custom volume allowances are available upon request). Included minutes reset each billing period.",
  },
  {
    id: "exceeded-minutes",
    category: "pricing",
    question: "What happens when included minutes are exceeded?",
    answer:
      "Your service is never abruptly cut off. When your business approaches or exceeds its monthly minute allowance, additional minutes are billed according to your agreed usage schedule, or you may upgrade to a higher monthly tier.",
  },
  {
    id: "telephony-sms-integration-costs",
    category: "pricing",
    question: "Are SMS, telephony, or third-party integration costs extra?",
    answer:
      "Standard included minutes cover AI voice processing. Dedicated phone number leasing, inbound/outbound carrier telephony charges (typically via Twilio), SMS messaging carrier fees, and third-party software subscriptions (such as your CRM or calendar plan) are billed directly by their respective providers or passed through at transparent standard usage rates.",
  },
  {
    id: "can-it-transfer-calls",
    category: "features",
    question: "Can it transfer calls to a human?",
    answer:
      "Yes. The AI can execute live call transfers to designated on-call staff, technicians, or emergency lines based on configured routing rules, caller keywords, or specific requests. On our Premium tier, warm transfers with whisper context are supported where your telephony provider allows.",
  },
  {
    id: "which-languages-supported",
    category: "features",
    question: "Which languages are supported?",
    answer:
      "Starter supports one language (English or Spanish); Professional supports two languages simultaneously (e.g., English and Spanish); and Premium provides multilingual capabilities across dozens of languages with automatic caller language detection.",
  },
  {
    id: "how-does-onboarding-work",
    category: "overview",
    question: "How does onboarding work?",
    answer:
      "Onboarding is a collaborative white-glove process: 1) We collect your business services, pricing, FAQs, and booking rules; 2) We configure and calibrate your AI voice persona; 3) We integrate your calendar and phone line routing; 4) We conduct test simulation calls to verify accuracy; and 5) We take the system live.",
  },
  {
    id: "website-ai-assistant-details",
    category: "promotions",
    question: "What is included in the website AI assistant?",
    answer:
      "The Website Conversational AI Assistant (advertised $700 value, included as a promotional bonus for eligible Premium tier accounts) is an interactive on-page widget that answers visitor questions 24/7, captures qualified leads, and books demos directly on your website.",
  },
  {
    id: "terms-3d-website-promotion",
    category: "promotions",
    question: "What are the terms of the 3D website promotion?",
    answer:
      "Our 3D animated website promotional bonus (advertised $3,000 value) is available for eligible sign-ups on our Premium tier. This includes a custom-designed, dark-themed, mobile-responsive Next.js website. Eligibility is subject to agreed scope, client asset readiness, and active account standing.",
  },
  {
    id: "how-to-request-demo",
    category: "overview",
    question: "How can customers request a demo?",
    answer:
      "You can request a demo by clicking any 'Book a Demo' button on our website or submitting the contact form below. We will confirm the expected follow-up time when you submit your inquiry, configure a tailored voice simulation, and conduct a live 1-on-1 walkthrough.",
  },
];
