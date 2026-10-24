export interface IndustryItem {
  id: string;
  title: string;
  icon: string;
  badge: string;
  stat: string;
  statLabel: string;
  description: string;
  useCases: string[];
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: "dental-medical",
    title: "Dental & Medical Clinics",
    icon: "Stethoscope",
    badge: "Healthcare",
    stat: "100%",
    statLabel: "After-hours calls answered",
    description:
      "Triage emergency dental calls, answer insurance and procedure queries, and book patient appointments directly into your clinic management software.",
    useCases: [
      "Emergency toothache & trauma triage",
      "New patient appointment bookings",
      "Insurance acceptance & pre-op FAQ guidance",
      "Automated appointment recall & reminders",
    ],
  },
  {
    id: "legal",
    title: "Law Firms & Attorneys",
    icon: "Scale",
    badge: "Legal",
    stat: "3.8x",
    statLabel: "More qualified retainers",
    description:
      "Screen inbound case inquiries, qualify case criteria immediately, collect case facts empathetically, and schedule consultations for your attorneys.",
    useCases: [
      "24/7 accident & injury intake qualification",
      "Conflict of interest pre-screening",
      "Consultation calendar scheduling",
      "Instant SMS notifications to managing partners",
    ],
  },
  {
    id: "home-services",
    title: "HVAC, Plumbing & Roofing",
    icon: "Wrench",
    badge: "Home Services",
    stat: "< 60s",
    statLabel: "Lead response time",
    description:
      "Home service leads call three competitors and hire the first one who answers. Ringwell AI guarantees you answer immediately and dispatch emergency techs.",
    useCases: [
      "24/7 emergency dispatch call routing",
      "Diagnostic fee & service radius explanation",
      "Jobber / ServiceTitan booking sync",
      "Automated weather emergency spike handling",
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate & Property Management",
    icon: "Building2",
    badge: "Property",
    stat: "24/7",
    statLabel: "Tenant & buyer coverage",
    description:
      "Capture prospective home buyers, answer property specs and availability questions, schedule walkthrough viewings, and log tenant maintenance tickets.",
    useCases: [
      "Listing inquiry & showing tour booking",
      "Urgent tenant maintenance ticket escalation",
      "Buyer budget and pre-approval pre-qualification",
      "Rental application FAQ guidance",
    ],
  },
  {
    id: "automotive",
    title: "Auto Dealerships & Service Centers",
    icon: "Car",
    badge: "Automotive",
    stat: "+34%",
    statLabel: "Service lane bookings",
    description:
      "Never miss a high-ticket service repair call or test drive inquiry. Handle recall checks, maintenance scheduling, and vehicle status updates effortlessly.",
    useCases: [
      "Service bay & oil change appointment booking",
      "New & used inventory availability questions",
      "Parts department routing & order status",
      "Outbound 6-month service reminder calls",
    ],
  },
  {
    id: "financial",
    title: "Financial Advisors & CPAs",
    icon: "Briefcase",
    badge: "Finance & Accounting",
    stat: "Zero",
    statLabel: "Interruptive calls during meetings",
    description:
      "Protect your focus during client meetings and tax season while presenting an ultra-polished, professional corporate persona to high-net-worth prospects.",
    useCases: [
      "Discovery call qualification & calendar scheduling",
      "Tax season document submission FAQs",
      "Secure client message taking with audio notes",
      "VIP client direct warm line pass-through",
    ],
  },
];
