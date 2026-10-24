"use client";

import React, { useState } from "react";
import { PhoneCall, CalendarCheck, Workflow, Headset, Bot, Sparkles, Database, ArrowRight, Check, Info } from "lucide-react";
import { SERVICES_DATA, ServiceItem } from "@/data/services";

interface ServicesProps {
  onOpenDemo: () => void;
}

export default function Services({ onOpenDemo }: ServicesProps) {
  const [activeService, setActiveService] = useState<string>(SERVICES_DATA[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "PhoneCall":
        return <PhoneCall className="w-6 h-6" />;
      case "CalendarCheck":
        return <CalendarCheck className="w-6 h-6" />;
      case "Headset":
        return <Headset className="w-6 h-6" />;
      case "Bot":
        return <Bot className="w-6 h-6" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6" />;
      case "Workflow":
        return <Workflow className="w-6 h-6" />;
      case "Database":
        return <Database className="w-6 h-6" />;
      default:
        return <PhoneCall className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background glow spot */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
              <span>Agency Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              AI-Powered Reception &amp; Workflow Solutions
            </h2>
          </div>
          <p className="text-slate-400 text-base max-w-md">
            We help businesses answer calls, capture leads, manage appointments, and improve customer communication with AI-powered receptionists and automation.
          </p>
        </div>

        {/* Services Grid (All 7 required services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {SERVICES_DATA.map((service) => {
            const isHovered = activeService === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveService(service.id)}
                className={`group relative rounded-3xl p-7 sm:p-8 transition-all duration-300 flex flex-col justify-between ${
                  isHovered
                    ? "bg-gradient-to-b from-blue-900/30 via-[#0c1222] to-[#080d1a] border border-cyan-400/40 shadow-2xl shadow-blue-900/20 -translate-y-1.5"
                    : "bg-[#090d18]/80 border border-white/[0.07] hover:border-white/20"
                }`}
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/15 border border-blue-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all p-3">
                      {getIcon(service.icon)}
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-slate-300">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-cyan-200 transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-400 mb-3">
                    {service.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Compatibility note if present */}
                  {service.compatibilityNote && (
                    <div className="mb-4 p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/25 flex items-start gap-2 text-[11px] text-blue-300">
                      <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{service.compatibilityNote}</span>
                    </div>
                  )}

                  {/* Feature Checklist */}
                  <ul className="space-y-2 mb-6 border-t border-white/[0.06] pt-4">
                    {service.highlights.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Button */}
                <button
                  onClick={onOpenDemo}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.04] border border-white/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white hover:border-transparent transition-all duration-200"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
