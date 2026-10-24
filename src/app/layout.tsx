import type { Metadata, Viewport } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ringwellai.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030712",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ringwell AI | AI Receptionists and Business Automation",
    template: "%s | Ringwell AI",
  },
  description:
    "We help businesses answer calls, capture leads, manage appointments, and improve customer communication with AI-powered receptionists and automation.",
  keywords: [
    "AI Voice Receptionist",
    "AI Appointment Receptionist",
    "AI Front Desk",
    "Business Automation Agency",
    "Call Answering AI",
    "Calendar Integration",
    "CRM Automation",
    "United States AI Receptionist",
  ],
  authors: [{ name: "Ringwell AI", url: siteUrl }],
  creator: "Ringwell AI",
  publisher: "Ringwell AI",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Ringwell AI | AI Receptionists and Business Automation",
    description:
      "We help businesses answer calls, capture leads, manage appointments, and improve customer communication with AI-powered receptionists and automation.",
    url: siteUrl,
    siteName: "Ringwell AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/human-vs-ai-receptionist.jpg",
        width: 1200,
        height: 630,
        alt: "Ringwell AI — Never Miss Another Opportunity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ringwell AI | AI Receptionists and Business Automation",
    description:
      "We help businesses answer calls, capture leads, manage appointments, and improve customer communication with AI-powered receptionists and automation.",
    images: ["/images/human-vs-ai-receptionist.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen bg-[#030712] text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
