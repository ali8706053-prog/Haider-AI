import React from "react";

export default function StructuredData() {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || "https://ringwellai.com";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${domain}/#website`,
    name: "Ringwell AI",
    url: domain,
    description:
      "Ringwell AI provides AI-powered voice receptionists, appointment scheduling, and business automation services for businesses across the United States.",
    publisher: {
      "@id": `${domain}/#organization`,
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${domain}/#organization`,
    name: "Ringwell AI",
    url: domain,
    logo: `${domain}/icon.svg`,
    description:
      "AI receptionist and business automation agency helping businesses answer calls, capture leads, manage appointments, and streamline communication.",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    knowsAbout: [
      "AI Voice Receptionist",
      "AI Appointment Booking",
      "Phone Automation",
      "CRM and Calendar Integrations",
      "Business Workflow Automation",
    ],
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Service",
        position: 1,
        name: "AI Voice Receptionist",
        description:
          "24/7 autonomous phone call answering, knowledge base querying, and lead capture for businesses.",
        provider: { "@id": `${domain}/#organization` },
      },
      {
        "@type": "Service",
        position: 2,
        name: "AI Appointment Receptionist",
        description:
          "Real-time calendar availability checking, appointment booking, rescheduling, and cancellations.",
        provider: { "@id": `${domain}/#organization` },
      },
      {
        "@type": "Service",
        position: 3,
        name: "AI Front Desk",
        description:
          "Multilingual front-office phone handling, warm call transfers, SMS confirmations, and deep lead qualification.",
        provider: { "@id": `${domain}/#organization` },
      },
      {
        "@type": "Service",
        position: 4,
        name: "Business Workflow Automation",
        description:
          "Two-way CRM synchronization, automated call transcript summaries, and custom webhook automations.",
        provider: { "@id": `${domain}/#organization` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
    </>
  );
}
