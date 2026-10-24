"use client";

import React from "react";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface HeroProps {
  onOpenDemo: () => void;
  onScrollToVoice: () => void;
}

export default function Hero({ onOpenDemo, onScrollToVoice }: HeroProps) {
  const handlePrimaryClick = () => {
    trackEvent("book_demo_click", { source_location: "hero_primary_button" });
    onOpenDemo();
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-28 overflow-hidden">
      {/* Dynamic atmospheric radial background glow (matching reference visual aura) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[560px] pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/15 via-cyan-500/10 to-transparent blur-3xl opacity-70 transform -translate-y-24"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/15 rounded-full blur-[110px] animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Subtle background mesh dot texture */}
      <div className="absolute inset-0 bg-mesh-dots opacity-35 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-lg shadow-blue-950/40">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-white/95 font-semibold">⚡ AI Voice Receptionists &amp; Automation Agency</span>
        </div>

        {/* Hero Top Grid: Headline on left, Supporting Message & CTAs on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 md:mb-20">
          {/* Left Column: Big Headline */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Never Miss <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                Another
              </span>{" "}
              <br className="hidden sm:inline" />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]">
                  Opportunity.
                </span>
                <span className="block h-1.5 w-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-1.5 opacity-80"></span>
              </span>
            </h1>
          </div>

          {/* Right Column: Supporting Description & Above-the-fold Dual CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-1 lg:pt-3">
            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed font-normal mb-8">
              We help businesses answer calls, capture leads, manage appointments, and improve customer communication with AI-powered receptionists and automation.
            </p>

            {/* Above-the-fold CTAs (Requirement 1) */}
            <div className="flex flex-wrap items-center gap-3.5">
              {/* Primary CTA: Book a Demo */}
              <button
                onClick={handlePrimaryClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-600/35 hover:shadow-cyan-400/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA: Explore Our Services */}
              <a
                href="#services"
                className="glass-button inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-base font-medium text-slate-200 hover:text-white"
              >
                <span>Explore Our Services</span>
              </a>
            </div>

            {/* Sub-CTAs / Quick Highlights */}
            <div className="mt-7 pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Zero Hold Times</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Calendar Sync</span>
              </div>
              <button
                onClick={onScrollToVoice}
                className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Hear Voice Samples</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
