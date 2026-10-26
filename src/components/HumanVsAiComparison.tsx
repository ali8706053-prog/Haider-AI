"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, XCircle, TrendingDown, TrendingUp, Sparkles, ShieldAlert, Users, Bot, Zap, Clock, DollarSign, Globe } from "lucide-react";

interface HumanVsAiComparisonProps {
  onOpenDemo: () => void;
}

export default function HumanVsAiComparison({ onOpenDemo }: HumanVsAiComparisonProps) {
  const [activeTab, setActiveTab] = useState<"graphic" | "breakdown">("graphic");

  const comparisonPoints = [
    {
      feature: "Availability & Coverage",
      human: "9 AM – 5 PM only (40 hrs/week). Misses nights, weekends & lunch breaks.",
      ai: "24/7/365 continuous uptime (168 hrs/week). Zero downtime, vacations or sick days.",
      icon: Clock,
      impact: "+320% more coverage hours",
    },
    {
      feature: "Concurrent Call Capacity",
      human: "1 caller at a time. Second caller gets busy signal or voicemail queue.",
      ai: "Hundreds of calls simultaneously with zero hold times or dropped calls.",
      icon: Zap,
      impact: "Zero callers lost during peak spikes",
    },
    {
      feature: "Monthly Operational Cost",
      human: "$3,500 – $4,800/mo in salary + payroll taxes, health benefits & desk space.",
      ai: "Predictable flat rate from $497/mo. Saves $40,000+ per year in overhead.",
      icon: DollarSign,
      impact: "85% reduction in front-desk overhead",
    },
    {
      feature: "Speed & Consistency",
      human: "Variable (3–6 rings, phone distractions, multi-tasking in office).",
      ai: "Instant sub-800ms response on ring one with 100% consistent brand tone.",
      icon: Sparkles,
      impact: "< 1s response time guarantee",
    },
    {
      feature: "Multilingual Intelligence",
      human: "Limited to native language of the individual staff member on duty.",
      ai: "Fluent in English, Spanish & 20+ languages with automatic accent adaptation.",
      icon: Globe,
      impact: "Captures every demographic seamlessly",
    },
  ];

  return (
    <section id="comparison" className="py-20 md:py-28 relative overflow-hidden bg-[#040813] border-b border-white/[0.06]">
      {/* Dynamic atmospheric radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Pill & Persuasive Headline */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg shadow-cyan-950/50">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            <span>The Economics of AI Reception</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Why Traditional Front Desks Leak Revenue <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
              — And How Voice AI Solves It
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-300/90 leading-relaxed">
            In business, speed to answer is the number one predictor of revenue. When an inbound lead gets sent to voicemail or put on hold, <strong>67% immediately hang up and call your closest competitor</strong>. See how replacing or augmenting your front desk with Ringwell AI multiplies your capacity while cutting overhead.
          </p>

          {/* Toggle between Graphic View and Detailed Economic Breakdown */}
          <div className="mt-8 inline-flex max-w-full flex-col sm:flex-row items-stretch sm:items-center p-1 sm:p-1.5 rounded-2xl sm:rounded-full bg-[#0a0f1d] border border-white/10 shadow-lg gap-1">
            <button
              onClick={() => setActiveTab("graphic")}
              className={`px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-center ${
                activeTab === "graphic"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Visual Comparison Chart
            </button>
            <button
              onClick={() => setActiveTab("breakdown")}
              className={`px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-center ${
                activeTab === "breakdown"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Feature &amp; Cost Breakdown
            </button>
          </div>
        </div>

        {/* Tab 1: Integrated Visual Graphic Showcase */}
        {activeTab === "graphic" && (
          <div className="space-y-10">
            {/* High-Tech Frame for the Comparison Image */}
            <div className="relative group max-w-5xl mx-auto rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-cyan-500/30 via-blue-600/15 to-transparent border border-cyan-400/30 shadow-[0_0_50px_-10px_rgba(6,182,212,0.25)] backdrop-blur-xl">
              {/* Inner glowing wrapper */}
              <div className="relative rounded-[22px] overflow-hidden bg-[#060a15] border border-white/10">
                <img
                  src="/images/human-vs-ai-receptionist.jpg"
                  alt="Feature Comparison chart between Human and AI Voice Receptionist covering 5 critical features: 24/7/365 availability, concurrent call capacity, predictable cost structure, sub-second response speed, and multilingual support"
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                  width={1200}
                  height={675}
                />

                {/* Subtle glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/40 via-transparent to-white/[0.03] pointer-events-none"></div>
              </div>

              {/* Decorative Corner Glows */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl pointer-events-none"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl pointer-events-none"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl pointer-events-none"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-xl pointer-events-none"></div>
            </div>

            {/* Persuasive Callout Banner Below the Graphic */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-cyan-400/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-300 mb-3">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">Save $42,000+ Annually</h4>
                <p className="text-xs text-slate-300/80 leading-relaxed">
                  Eliminate recruiting costs, sick leave, overtime, and benefits. Pay only a fraction of one staff member's monthly salary.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-cyan-400/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">Never Put Anyone On Hold</h4>
                <p className="text-xs text-slate-300/80 leading-relaxed">
                  Ringwell AI scales effortlessly during sudden call rushes. 50 callers dialing at the exact same moment are all answered simultaneously on ring one.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-cyan-400/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 mb-3">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">Capture High-Ticket Nights &amp; Weekends</h4>
                <p className="text-xs text-slate-300/80 leading-relaxed">
                  Over 40% of emergency appointments and service requests call after 5:00 PM or on weekends. Capture them while your competitors sleep.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Detailed Interactive Feature Breakdown Grid */}
        {activeTab === "breakdown" && (
          <div className="max-w-5xl mx-auto space-y-4">
            {comparisonPoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#080d1a] border border-white/[0.08] p-6 hover:border-cyan-400/40 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-white">{item.feature}</h4>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 w-fit">
                      {item.impact}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Human Column */}
                    <div className="p-4 rounded-xl bg-red-950/15 border border-red-500/20">
                      <div className="flex items-center gap-2 text-xs font-bold text-red-300 mb-1.5">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span>Human In-House Receptionist</span>
                      </div>
                      <p className="text-xs text-slate-300/80 leading-relaxed">
                        {item.human}
                      </p>
                    </div>

                    {/* AI Column */}
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Ringwell AI Voice Receptionist</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {item.ai}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Conversion Action Bar */}
        <div className="mt-10 sm:mt-14 max-w-3xl mx-auto text-center p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-900/40 via-[#0a1226] to-cyan-900/30 border border-cyan-400/30 shadow-2xl shadow-blue-950/50">
          <h3 className="text-lg sm:text-2xl font-bold text-white mb-2">
            Ready to give your front desk superhuman capabilities?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-5 sm:mb-6 max-w-xl mx-auto leading-relaxed">
            Book a 15-minute live demo. We'll set up a prototype agent for your business phone number and let you test call it yourself.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Book Front-Desk Upgrade Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#voice-demo"
              className="w-full sm:w-auto text-center px-5 sm:px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-all"
            >
              Hear Audio Samples First
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
