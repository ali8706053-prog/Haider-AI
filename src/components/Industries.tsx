"use client";

import React from "react";
import { Stethoscope, Scale, Wrench, Building2, Car, Briefcase, CheckCircle, ArrowRight } from "lucide-react";
import { INDUSTRIES_DATA, IndustryItem } from "@/data/industries";

interface IndustriesProps {
  onOpenDemo: () => void;
}

export default function Industries({ onOpenDemo }: IndustriesProps) {
  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case "Stethoscope":
        return <Stethoscope className="w-6 h-6" />;
      case "Scale":
        return <Scale className="w-6 h-6" />;
      case "Wrench":
        return <Wrench className="w-6 h-6" />;
      case "Building2":
        return <Building2 className="w-6 h-6" />;
      case "Car":
        return <Car className="w-6 h-6" />;
      case "Briefcase":
        return <Briefcase className="w-6 h-6" />;
      default:
        return <Building2 className="w-6 h-6" />;
    }
  };

  return (
    <section id="industries" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Specialized Workflows</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for High-Value Service Industries
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Every business vertical has unique compliance requirements, emergency triage protocols, and booking rules. We build industry-customized logic.
          </p>
        </div>

        {/* 6 Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INDUSTRIES_DATA.map((ind) => (
            <div
              key={ind.id}
              className="group rounded-3xl p-7 bg-[#080d19] border border-white/[0.08] hover:border-cyan-400/40 hover:bg-[#0c1324] transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/40 hover:-translate-y-1"
            >
              <div>
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                    {getIndustryIcon(ind.icon)}
                  </div>
                  <div className="text-right">
                    <span className="block text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {ind.stat}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                      {ind.statLabel}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-2">{ind.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-6 font-normal">
                  {ind.description}
                </p>

                {/* Industry Use Cases */}
                <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.06]">
                  {ind.useCases.map((useCase, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <button
                onClick={onOpenDemo}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 hover:bg-cyan-500 hover:text-slate-950 transition-all duration-200"
              >
                <span>View {ind.badge} Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
