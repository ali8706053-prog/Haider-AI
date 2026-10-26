"use client";

import React, { useState } from "react";
import { Briefcase, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { CASE_STUDIES, CaseStudy } from "@/data/caseStudies";

interface CaseStudiesProps {
  onOpenDemo: (studyTitle?: string) => void;
}

export default function CaseStudies({ onOpenDemo }: CaseStudiesProps) {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy>(CASE_STUDIES[0]);

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden bg-transparent border-b border-white/[0.06]">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <Briefcase className="w-3.5 h-3.5 text-cyan-300" />
            <span>Deployment Architectures</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How Ringwell AI Solves Inbound Bottlenecks
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Explore our structured deployment blueprints across high-volume service verticals. Built for zero hold times, verified qualification, and calendar accuracy.
          </p>

          <div className="mt-3 text-xs text-slate-500 italic">
            * Clearly labeled illustrative blueprints based on standard agency workflow architectures.
          </div>
        </div>

        {/* Tab Selector - swipeable on mobile */}
        <div className="flex overflow-x-auto sm:flex-wrap items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          {CASE_STUDIES.map((study) => {
            const isSelected = study.id === selectedStudy.id;
            return (
              <button
                key={study.id}
                onClick={() => setSelectedStudy(study)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 scale-[1.02]"
                    : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/5 active:bg-white/10"
                }`}
              >
                <span>{study.industry}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>}
              </button>
            );
          })}
        </div>

        {/* Active Case Study Detail Card */}
        <div className="max-w-5xl mx-auto glass-panel-glow rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-cyan-400/30 shadow-2xl">
          {/* Top Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 inline-block mb-2">
                {selectedStudy.label}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {selectedStudy.title}
              </h3>
            </div>

            {/* Measured Metric Pill */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-right shrink-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white block">
                {selectedStudy.measuredMetric}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {selectedStudy.metricLabel}
              </span>
            </div>
          </div>

          {/* Dual Column: Challenge vs. Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className="p-6 rounded-2xl bg-red-950/15 border border-red-500/20">
              <h4 className="text-sm font-bold text-red-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span>The Business Challenge</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                {selectedStudy.businessChallenge}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/25">
              <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>The Implemented Solution</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedStudy.implementedSolution}
              </p>
            </div>
          </div>

          {/* Implementation Details List */}
          <div className="mb-8 pt-4 border-t border-white/[0.06]">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Implementation Details &amp; Technical Highlights:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedStudy.implementationDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Card Action */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <span className="text-xs text-slate-400 text-center sm:text-left">
              Want a customized blueprint engineered for your business lines?
            </span>
            <button
              onClick={() => onOpenDemo(selectedStudy.title)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>{selectedStudy.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
