"use client";

import React from "react";
import { Cpu, PhoneForwarded, TestTubes, Rocket, CheckCircle2, ArrowRight } from "lucide-react";

interface HowItWorksProps {
  onOpenDemo: () => void;
}

export default function HowItWorks({ onOpenDemo }: HowItWorksProps) {
  const steps = [
    {
      step: "01",
      title: "Voice Persona & Knowledge Ingestion",
      icon: Cpu,
      description:
        "We dissect your business services, pricing structure, appointment rules, and FAQs. We configure a tailored voice persona matching your brand's exact tone, speech pacing, and industry vocabulary.",
      specs: ["Custom System Prompts", "Strict Anti-Hallucination Guardrails", "Multi-Language & Accent Tuning"],
    },
    {
      step: "02",
      title: "Calendar, Phone & CRM Wiring",
      icon: PhoneForwarded,
      description:
        "We connect directly with your calendar (Google, Cal.com, Calendly) for real-time booking, link your CRM (HubSpot, GoHighLevel, Zapier), and provision or forward your existing phone numbers seamlessly.",
      specs: ["Zero-Hold Call Forwarding", "Real-Time Slot Verification", "Instant Webhook Automation"],
    },
    {
      step: "03",
      title: "Simulation & Rigorous Stress Testing",
      icon: TestTubes,
      description:
        "Before going live, we run dozens of test calls simulating difficult accents, heavy background noise, mid-sentence interruptions, and emergency edge cases to guarantee bulletproof reliability.",
      specs: ["Full-Duplex Interruption Checks", "Sentiment & Emergency Fallback", "Whisper Transfer Protocols"],
    },
    {
      step: "04",
      title: "24/7 Deployment & Continuous Optimization",
      icon: Rocket,
      description:
        "Your AI receptionist goes live on your phone lines. Our agency monitors call recordings, tunes responses, and optimizes conversion rates every week with zero maintenance required on your end.",
      specs: ["Weekly Quality Audits", "99.99% Uptime Telephony SLA", "Dedicated Account Manager"],
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#040813]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Seamless Deployment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            From First Call to 24/7 Autopilot in 5 Days
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A turn-key white-glove agency service. We handle the voice engineering, integrations, prompt calibration, and phone line routing.
          </p>
        </div>

        {/* 4-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-3xl p-6 sm:p-7 bg-[#090e1b] border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg shadow-black/30"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Specs Pill List */}
                <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                  {item.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-blue-900/30 via-slate-900 to-cyan-950/30 border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Zero Disruption Guarantee
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Your existing phone number never goes down. We test everything in parallel before switching live call forwarding.
            </p>
          </div>
          <button
            onClick={onOpenDemo}
            className="shrink-0 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-600/25 transition-all"
          >
            Start Your Setup
          </button>
        </div>
      </div>
    </section>
  );
}
