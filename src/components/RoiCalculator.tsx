"use client";

import React, { useState } from "react";
import { Calculator, DollarSign, TrendingUp, ArrowRight, Sparkles } from "lucide-react";

interface RoiCalculatorProps {
  onOpenDemo: () => void;
}

export default function RoiCalculator({ onOpenDemo }: RoiCalculatorProps) {
  const [monthlyCalls, setMonthlyCalls] = useState<number>(350);
  const [missedRate, setMissedRate] = useState<number>(28);
  const [avgClientValue, setAvgClientValue] = useState<number>(750);
  const [closingRate, setClosingRate] = useState<number>(35);

  // Math calculations
  const missedCallsPerMonth = Math.round(monthlyCalls * (missedRate / 100));
  const lostDealsPerMonth = Math.round(missedCallsPerMonth * (closingRate / 100));
  const monthlyLostRevenue = lostDealsPerMonth * avgClientValue;
  const annualLostRevenue = monthlyLostRevenue * 12;

  // Approximate Ringwell AI Growth plan cost: $997/mo
  const ringwellMonthlyCost = 997;
  const netMonthlyGain = Math.max(0, monthlyLostRevenue - ringwellMonthlyCost);
  const estimatedRoiMultiplier =
    ringwellMonthlyCost > 0 ? (monthlyLostRevenue / ringwellMonthlyCost).toFixed(1) : "0";

  return (
    <section id="roi-calculator" className="py-24 relative overflow-hidden bg-[#040711]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5 text-cyan-300" />
            <span>Interactive ROI Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How Much Is Your Voicemail Costing You?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            67% of callers hang up and call the next competitor on Google when sent to voicemail. See how much lost revenue Ringwell AI can recover for you every year.
          </p>
        </div>

        {/* Dual-Card Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Controls Card */}
          <div className="lg:col-span-7 glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 border border-white/10">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-between">
              <span>Your Business Numbers</span>
              <span className="text-[11px] sm:text-xs font-normal text-slate-400">Drag sliders to adjust</span>
            </h3>

            {/* Slider 1: Monthly Calls */}
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-2">
                <span className="text-slate-300 font-medium">Monthly Inbound Calls</span>
                <span className="text-cyan-400 font-bold">{monthlyCalls} calls/mo</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="25"
                value={monthlyCalls}
                onChange={(e) => setMonthlyCalls(Number(e.target.value))}
                className="w-full h-3 sm:h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 py-1"
                aria-label="Monthly inbound calls"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>50</span>
                <span>1,000</span>
                <span>2,000+</span>
              </div>
            </div>

            {/* Slider 2: Missed Call Rate */}
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-2">
                <span className="text-slate-300 font-medium">Estimated Missed Call Rate</span>
                <span className="text-amber-400 font-bold">{missedRate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="1"
                value={missedRate}
                onChange={(e) => setMissedRate(Number(e.target.value))}
                className="w-full h-3 sm:h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 py-1"
                aria-label="Estimated missed call rate"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>5% (Rare)</span>
                <span>28% (National Average)</span>
                <span>60% (High)</span>
              </div>
            </div>

            {/* Slider 3: Average Client Value */}
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-2">
                <span className="text-slate-300 font-medium">Average Customer / Retainer Value</span>
                <span className="text-emerald-400 font-bold">${avgClientValue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={avgClientValue}
                onChange={(e) => setAvgClientValue(Number(e.target.value))}
                className="w-full h-3 sm:h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 py-1"
                aria-label="Average customer value"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>$100</span>
                <span>$2,500</span>
                <span>$5,000+</span>
              </div>
            </div>

            {/* Slider 4: Conversion Rate */}
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-2">
                <span className="text-slate-300 font-medium">Booking / Close Rate on Answered Calls</span>
                <span className="text-blue-400 font-bold">{closingRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="75"
                step="5"
                value={closingRate}
                onChange={(e) => setClosingRate(Number(e.target.value))}
                className="w-full h-3 sm:h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400 py-1"
                aria-label="Booking close rate"
              />
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-gradient-to-b from-blue-950/80 via-[#0a1224] to-[#060c18] border border-cyan-400/40 shadow-2xl shadow-blue-900/30 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-5 sm:mb-6">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Recoverable Growth Analysis</span>
              </div>

              {/* Annual Revenue Stat */}
              <div className="mb-5 sm:mb-6">
                <span className="text-[11px] sm:text-xs uppercase font-medium tracking-wider text-slate-400 block mb-1">
                  Estimated Annual Lost Revenue
                </span>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 truncate">
                  ${annualLostRevenue.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  (~${monthlyLostRevenue.toLocaleString()} slipping away each month)
                </div>
              </div>

              {/* Breakdown metrics */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5 sm:mb-6 pt-4 sm:pt-5 border-t border-white/10">
                <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] sm:text-[11px] text-slate-400 block">Missed Calls/Mo</span>
                  <span className="text-base sm:text-lg font-bold text-white">{missedCallsPerMonth}</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] sm:text-[11px] text-slate-400 block">Lost Clients/Mo</span>
                  <span className="text-base sm:text-lg font-bold text-white">{lostDealsPerMonth}</span>
                </div>
              </div>

              {/* ROI Banner */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between mb-6 sm:mb-8">
                <div>
                  <span className="text-xs font-semibold text-emerald-300 block">Estimated Agency ROI</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400">Based on Growth Tier</span>
                </div>
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">{estimatedRoiMultiplier}x</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onOpenDemo}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Stop Missing Calls Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
