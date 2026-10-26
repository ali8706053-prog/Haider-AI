"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { FAQS_DATA, FaqItem } from "@/data/faqs";

interface FaqProps {
  onOpenDemo: () => void;
}

export default function Faq({ onOpenDemo }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Questions (15)" },
    { id: "overview", label: "Overview & Onboarding" },
    { id: "features", label: "Call Handling & Features" },
    { id: "pricing", label: "Pricing & Minutes" },
    { id: "technical", label: "Calendars & CRMs" },
    { id: "promotions", label: "Promotional Bonuses" },
  ];

  const filteredFaqs =
    selectedCategory === "all"
      ? FAQS_DATA
      : FAQS_DATA.filter((item) => item.category === selectedCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-300" />
            <span>Comprehensive Agency FAQs</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Clear, transparent answers about Ringwell AI packages, voice technology, telephony integrations, and promotional terms.
          </p>
        </div>

        {/* Category Filter Pills - swipeable on mobile */}
        <div className="flex overflow-x-auto sm:flex-wrap items-center justify-start sm:justify-center gap-2 mb-8 sm:mb-10 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                  : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/5 active:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? "bg-[#090f20] border-cyan-400/40 shadow-lg shadow-blue-950/40"
                    : "bg-[#080d19] border-white/[0.08] hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-4 sm:py-5 px-4 sm:px-7 text-left flex items-center justify-between gap-3 sm:gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-cyan-300 bg-cyan-950/60 border-cyan-400/40" : ""
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-7 pb-5 sm:pb-6 pt-1 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed border-t border-white/[0.04] animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA Card */}
        <div className="mt-10 sm:mt-12 text-center p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 max-w-xl mx-auto">
          <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 mx-auto mb-2.5 sm:mb-3" />
          <h3 className="text-base sm:text-lg font-bold text-white">
            Have a Specific Business Inquiry?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-5 sm:mb-6 max-w-md mx-auto">
            We'll confirm the expected follow-up time when you submit your inquiry and walk you through integration options.
          </p>
          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
          >
            <span>Request a Custom Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
