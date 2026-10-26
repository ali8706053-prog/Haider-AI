"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, Shield, ArrowUp, Mail, MapPin, CheckCircle2, Database } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-transparent border-t border-white/[0.08] pt-12 sm:pt-16 pb-28 md:pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-12 sm:mb-14">
          {/* Brand Info (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#070b14] rounded-[11px] flex items-center justify-center">
                  <PhoneCall className="w-4 h-4 text-cyan-300" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Ringwell<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-extrabold">AI</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              We help businesses answer calls, capture leads, manage appointments, and improve customer communication with AI-powered receptionists and automation.
            </p>

            <div className="flex flex-col gap-2 pt-1 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Primary Market: Serving Businesses Across the United States</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a
                  href="mailto:hello@ringwellai.com"
                  onClick={() => trackEvent("email_click", { source_location: "footer" })}
                  className="hover:text-cyan-300 transition-colors"
                >
                  hello@ringwellai.com
                </a>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">
                  AI Voice Receptionist
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">
                  AI Appointment Receptionist
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">
                  AI Front Desk
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">
                  Website AI Assistant
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">
                  3D Animated Websites
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">
                  Workflow Automation
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation & Case Studies */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Explore &amp; Compare
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#pricing" className="hover:text-cyan-300 transition-colors">
                  Packages &amp; Pricing
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-cyan-300 transition-colors">
                  Human vs. AI Receptionist
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-cyan-300 transition-colors">
                  Deployment Architectures
                </a>
              </li>
              <li>
                <a href="#voice-demo" className="hover:text-cyan-300 transition-colors">
                  Voice Audio Simulator
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-cyan-300 transition-colors">
                  How Onboarding Works
                </a>
              </li>
              <li>
                <a href="#roi-calculator" className="hover:text-cyan-300 transition-colors">
                  Missed Call ROI Tool
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Assistance */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-cyan-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="#faqs" className="hover:text-cyan-300 transition-colors">
                  Agency FAQs
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-300 transition-colors">
                  Contact &amp; Demo
                </a>
              </li>
              <li>
                <Link href="/admin/inquiries" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-slate-400">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  Inquiries Portal
                </Link>
              </li>
              <li>
                <Link href="/thank-you" className="hover:text-cyan-300 transition-colors text-xs text-slate-500">
                  Confirmation Page
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Commercial Disclaimer Notice */}
        <div className="py-6 border-t border-b border-white/[0.06] text-xs text-slate-500 space-y-1.5">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              Telephony connectivity, CRM integrations, and calendar sync are subject to third-party API compatibility, licensing, and agreed scope. Promotional bonuses (Website Conversational AI Assistant and 3D Animated Website) are available for eligible accounts in good standing.
            </p>
          </div>
        </div>

        {/* Bottom Credits & Scroll Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Ringwell AI. All rights reserved. Operating under United States commercial frameworks.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
