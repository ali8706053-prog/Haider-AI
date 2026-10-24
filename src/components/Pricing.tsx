"use client";

import React from "react";
import { Check, Sparkles, ArrowRight, ShieldCheck, Gift, Info } from "lucide-react";
import { PRICING_TIERS, PricingTier } from "@/data/pricing";
import { trackEvent } from "@/lib/analytics";

interface PricingProps {
  onOpenDemo: (planId?: string) => void;
}

export default function Pricing({ onOpenDemo }: PricingProps) {
  const handlePlanClick = (tierId: string) => {
    trackEvent("pricing_plan_click", { plan_id: tierId });
    onOpenDemo(tierId);
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background glow accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <span>Transparent Packages &amp; Investment</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Predictable Packages. Measurable Impact.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Engineered for U.S. businesses. No hidden retainers, no invented fees, and transparent minute allowances on every tier.
          </p>

          {/* Complimentary First Month Signing Bonus Banner */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium shadow-lg">
            <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Current Signing Offer:</strong> First month's maintenance included as a complimentary bonus. (Setup fee applies to all tiers).
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_TIERS.map((tier) => {
            const isRecommended = tier.popular;

            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isRecommended
                    ? "bg-gradient-to-b from-[#0e172e] via-[#091024] to-[#050b18] border-2 border-cyan-400/70 shadow-2xl shadow-cyan-500/20 lg:-translate-y-2 z-10"
                    : "bg-[#080d19]/90 border border-white/[0.08] hover:border-white/20 shadow-xl shadow-black/40"
                }`}
              >
                {/* Recommended Badge */}
                {isRecommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-400/30 flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>Recommended for Appointments</span>
                  </div>
                )}

                <div>
                  {/* Tier Title & Tagline */}
                  <div className="mb-5">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                      {tier.badge}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <p className="text-xs text-slate-400 min-h-[34px] leading-relaxed">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mb-6 pb-6 border-b border-white/[0.08]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-white">
                        ${tier.monthlyMaintenance}
                      </span>
                      <span className="text-sm font-medium text-slate-400">/ month</span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-xs">
                      <span className="text-cyan-300 font-semibold">
                        Setup: ${tier.setupFee} (Required)
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px]">
                        1st Mo. Maint. Free
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                      <span>Allowance: <strong>{tier.minutesIncluded} mins/mo</strong></span>
                      <span>{tier.languages}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6">
                    <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-2">
                      Included Capabilities:
                    </div>
                    {tier.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Promotional Bonuses (Premium Tier) */}
                  {tier.promotionalBonuses && tier.promotionalBonuses.length > 0 && (
                    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-b from-cyan-950/40 to-blue-950/20 border border-cyan-400/30 space-y-3">
                      <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Promotional Bonuses Included:</span>
                      </div>
                      {tier.promotionalBonuses.map((bonus, bIdx) => (
                        <div key={bIdx} className="text-xs">
                          <div className="font-semibold text-white flex items-center justify-between">
                            <span>{bonus.title}</span>
                            <span className="text-emerald-400 font-bold">{bonus.advertisedValue}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">{bonus.eligibilityNote}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card CTA & Disclosures */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <button
                    onClick={() => handlePlanClick(tier.id)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                      isRecommended
                        ? "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white shadow-xl shadow-cyan-500/30 hover:scale-[1.02]"
                        : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10"
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-[10px] text-slate-500 text-center mt-2.5 space-y-1">
                    {tier.commercialNotes.map((note, nIdx) => (
                      <p key={nIdx}>{note}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial Transparency Note Banner */}
        <div className="mt-14 max-w-3xl mx-auto rounded-2xl bg-white/[0.02] border border-white/10 p-5 flex items-start gap-3 text-xs text-slate-400">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-slate-300">Commercial Terms &amp; Scope:</strong>
            <p>
              Telephony connectivity, carrier minutes, and CRM integrations are subject to software compatibility, API licensing, and agreed scope. Promotional bonuses (Website Conversational AI Assistant and 3D Animated Website) are available for eligible accounts in good standing and subject to mutually agreed specifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
