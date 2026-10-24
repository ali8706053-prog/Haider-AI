"use client";

import React from "react";
import {
  Sparkles,
  Layers,
  Coins,
  Scale,
  Mic,
  FolderGit2,
  Workflow,
  HelpCircle,
  PhoneCall,
  ArrowUpRight,
  ShieldCheck,
  Bot,
  Zap,
} from "lucide-react";

interface MarqueeItem {
  name: string;
  href: string;
  tag: string;
  icon: React.ElementType;
}

const SECTION_ITEMS: MarqueeItem[] = [
  {
    name: "Services",
    href: "#services",
    tag: "AI Suite",
    icon: Layers,
  },
  {
    name: "Pricing",
    href: "#pricing",
    tag: "Packages",
    icon: Coins,
  },
  {
    name: "Human vs AI",
    href: "#comparison",
    tag: "Comparison",
    icon: Scale,
  },
  {
    name: "Voice Demo",
    href: "#voice-demo",
    tag: "Interactive",
    icon: Mic,
  },
  {
    name: "Case Studies",
    href: "#case-studies",
    tag: "Blueprints",
    icon: FolderGit2,
  },
  {
    name: "How It Works",
    href: "#how-it-works",
    tag: "Roadmap",
    icon: Workflow,
  },
  {
    name: "FAQs",
    href: "#faqs",
    tag: "Knowledge",
    icon: HelpCircle,
  },
  {
    name: "Contact",
    href: "#contact",
    tag: "Book Consultation",
    icon: PhoneCall,
  },
];

export default function InfiniteLogoCarousel() {
  // Multiply sets to ensure a perfectly seamless loop without gaps on ultrawide monitors
  const rowOneItems = [...SECTION_ITEMS, ...SECTION_ITEMS, ...SECTION_ITEMS, ...SECTION_ITEMS];
  
  // Re-order slightly for row 2 to give staggered, organic visual motion
  const staggeredItems = [
    SECTION_ITEMS[4],
    SECTION_ITEMS[5],
    SECTION_ITEMS[6],
    SECTION_ITEMS[7],
    SECTION_ITEMS[0],
    SECTION_ITEMS[1],
    SECTION_ITEMS[2],
    SECTION_ITEMS[3],
  ];
  const rowTwoItems = [...staggeredItems, ...staggeredItems, ...staggeredItems, ...staggeredItems];

  return (
    <section className="relative py-14 overflow-hidden bg-transparent border-y border-white/[0.06] select-none">
      {/* Subtle radial ambience glow behind marquee */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[180px] bg-blue-600/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Left and Right Fade Masking for Seamless Edge Blend */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-20 pointer-events-none bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-20 pointer-events-none bg-gradient-to-l from-[#030712] via-[#030712]/80 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 mb-6 flex items-center justify-between text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="uppercase tracking-widest text-[11px] text-slate-300 font-semibold">
            Explore Architecture &amp; System Navigation
          </span>
        </div>
        <span className="hidden sm:inline-block text-[11px] text-slate-500 uppercase tracking-wider">
          Hover to pause • Click to inspect
        </span>
      </div>

      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Row 1: Right → Left (move left) */}
        <div className="relative w-full overflow-hidden flex">
          <div className="animate-marquee-left flex items-center gap-4 sm:gap-6 py-1">
            {rowOneItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={`r1-${idx}`}
                  href={item.href}
                  className="group relative inline-flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 shadow-lg shadow-black/40 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-600/15 border border-blue-500/25 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors flex items-center gap-1.5">
                      {item.name}
                      <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                      {item.tag}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Row 2: Left → Right (move right) */}
        <div className="relative w-full overflow-hidden flex">
          <div className="animate-marquee-right flex items-center gap-4 sm:gap-6 py-1">
            {rowTwoItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={`r2-${idx}`}
                  href={item.href}
                  className="group relative inline-flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.07] border border-white/[0.06] hover:border-cyan-400/40 transition-all duration-300 shadow-md shadow-black/30 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-600/15 border border-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:text-white transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-sm font-semibold text-slate-300 group-hover:text-white transition-colors flex items-center gap-1.5">
                      {item.name}
                      <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-300 transition-colors" />
                    </span>
                    <span className="text-[10px] text-slate-500 group-hover:text-slate-400 font-medium tracking-wide transition-colors">
                      {item.tag}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
