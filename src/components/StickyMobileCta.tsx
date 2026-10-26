"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface StickyMobileCtaProps {
  onOpenDemo: () => void;
}

export default function StickyMobileCta({ onOpenDemo }: StickyMobileCtaProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past initial hero (e.g. 250px)
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const handleClick = () => {
    trackEvent("book_demo_click", { source_location: "sticky_mobile_bottom_bar" });
    onOpenDemo();
  };

  return (
    <aside
      aria-label="Mobile Call to Action"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#030712]/95 backdrop-blur-lg border-t border-cyan-500/20 shadow-2xl transition-all duration-300 animate-fade-in"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Ringwell AI</span>
          </span>
          <span className="text-[10px] text-slate-400">24/7 AI Receptionist</span>
        </div>

        <button
          onClick={handleClick}
          className="flex-1 max-w-[220px] min-h-[44px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <span>Book a Demo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
