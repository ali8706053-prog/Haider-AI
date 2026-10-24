import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, FileText, AlertTriangle, ArrowLeft } from "lucide-react";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | Ringwell AI",
  description:
    "Review the privacy policy and data protection practices of Ringwell AI for website visitors and demo inquiries.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <NavbarWrapper />

      <div className="flex-1 pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        {/* Legal Review Advisory Notice */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-3 text-xs text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Legal Review Advisory:</strong> This document outlines current privacy practices for Ringwell AI website inquiries and AI voice interaction services. Placeholders such as <code>[Ringwell AI Legal Entity Name]</code> indicate business details to be finalized. Please have qualified legal counsel review this policy prior to public production launch.
          </div>
        </div>

        <div className="mt-8 mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Last Updated: October 19, 2026 • Operates under United States commercial privacy frameworks
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          {/* Section 1 */}
          <section className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400">1.</span> Introduction and Entity Scope
            </h2>
            <p>
              This Privacy Policy describes how Ringwell AI (referred to herein as "Ringwell AI", "we", "us", or "our", legally operating under <code>[Ringwell AI Legal Entity Name, LLC/Inc.]</code>) collects, uses, stores, and protects information gathered through our website (<a href="https://ringwellai.com" className="text-cyan-400 underline">ringwellai.com</a>), demo request forms, and conversational AI services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400">2.</span> Information We Collect
            </h2>
            <p className="mb-2">We collect information directly from you when you interact with our website or submit inquiries:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong>Contact &amp; Identification Data:</strong> Full name, professional email address, business telephone number, and company/practice name provided via demo or contact forms.</li>
              <li><strong>Inquiry &amp; Operational Data:</strong> Estimated monthly call volumes, primary service interest, calendar scheduling preferences, and notes submitted in inquiry forms.</li>
              <li><strong>Technical &amp; Device Information:</strong> Internet Protocol (IP) addresses, browser type, operating system, and diagnostic interaction logs.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400">3.</span> AI Voice Interactions &amp; Call Recording Disclosures
            </h2>
            <p className="mb-2">
              As part of providing voice receptionist demonstrations and operational deployments:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong>Voice Demonstration Calls:</strong> During live test calls, audio streams and verbatim speech transcripts are processed by our conversational voice engine (e.g., Retell AI and telephony carrier networks) to execute conversational responses and demonstrate booking capabilities.</li>
              <li><strong>Call Recording Notice:</strong> Calls placed to our demonstration or client lines may be recorded and transcribed for quality assurance, model calibration, and confirmation purposes, in compliance with applicable two-party and one-party U.S. state recording laws.</li>
              <li><strong>Caller Consent:</strong> Automated voice agents announce the recorded nature of calls where required by jurisdictional regulations.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400">4.</span> How Information Is Used
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>To prepare, configure, and conduct requested 1-on-1 AI receptionist demonstrations.</li>
              <li>To communicate follow-up scheduling details, answer commercial inquiries, and provide service proposals.</li>
              <li>To evaluate technical integration compatibility with prospective clients' calendar and CRM software.</li>
              <li>To maintain website security, prevent spam abuse, and improve site performance.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400">5.</span> Third-Party Service Providers
            </h2>
            <p className="mb-2">
              We work with verified third-party technical vendors to operate our infrastructure, strictly bound by data handling agreements:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong>Telephony &amp; Voice Infrastructure:</strong> Retell AI and carrier providers (such as Twilio) for processing voice streams and phone line connectivity.</li>
              <li><strong>Hosting &amp; Analytics:</strong> Cloud infrastructure (e.g., Vercel) and privacy-configured Google Analytics 4 (with IP anonymization enabled and no PII transmitted).</li>
              <li><strong>Workflow Integrations:</strong> Webhook dispatchers (Make.com, Zapier, GoHighLevel, HubSpot) solely upon client authorization.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400">6.</span> Data Retention &amp; Security Practices
            </h2>
            <p>
              We implement reasonable administrative, technical, and organizational measures to safeguard lead information from unauthorized access, loss, or disclosure. We retain inquiry information only as long as necessary to fulfill business consultation purposes or comply with legal obligations. We do not sell or rent personal information to data brokers.
            </p>
          </section>

          {/* Section 7 */}
          <section className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400">7.</span> Privacy Rights for U.S. Residents
            </h2>
            <p>
              Depending on your state of residence (including California, Virginia, Colorado, and others), you may hold rights to request access to, correction of, or deletion of personal information held about you. You may also opt out of direct promotional communications at any time by following instructions in our messages or contacting us directly.
            </p>
          </section>

          {/* Section 8 */}
          <section className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400">8.</span> Privacy Questions &amp; Contact Information
            </h2>
            <p className="mb-3">
              If you have any questions or wish to exercise data rights regarding this policy, please reach out to our privacy administration:
            </p>
            <div className="p-4 rounded-xl bg-[#080d19] border border-white/10 text-xs text-slate-300 space-y-1">
              <div><strong>Entity:</strong> Ringwell AI — Privacy Administration</div>
              <div><strong>Email:</strong> <a href="mailto:privacy@ringwellai.com" className="text-cyan-400">privacy@ringwellai.com</a></div>
              <div><strong>Physical Jurisdiction:</strong> <code>[Business Address / State of Formation, United States]</code></div>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
