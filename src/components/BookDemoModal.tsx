"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Calendar, Phone, Sparkles, Send, ArrowRight, Clock, Info } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId?: string;
}

export default function BookDemoModal({ isOpen, onClose, selectedPlanId }: BookDemoModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timeSlot, setTimeSlot] = useState("02:00 PM EST");
  const [websiteHp, setWebsiteHp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"instant" | "calendar">("instant");

  if (!isOpen) return null;

  const timeSlots = [
    "10:00 AM EST",
    "11:30 AM EST",
    "01:00 PM EST",
    "02:00 PM EST",
    "03:30 PM EST",
    "05:00 PM EST",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          businessName: businessName || "Company",
          email,
          phone,
          website_hp: websiteHp,
          notes: `Requested demo slot preference: ${timeSlot} (Plan: ${selectedPlanId || "General Inquiry"})`,
          source: "demo_modal",
        }),
      });

      if (res.ok) {
        trackEvent("generate_lead", {
          source_location: "book_demo_modal",
          plan_id: selectedPlanId,
        });
        onClose();
        router.push("/thank-you");
      }
    } catch (err) {
      console.error("Demo submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-[#090e1c] border border-cyan-400/40 p-6 sm:p-8 shadow-2xl shadow-blue-900/50 text-white overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close demo booking modal"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-on-1 Consultation &amp; Demo</span>
          </div>

          <h3 id="modal-title" className="text-2xl font-extrabold text-white mb-1.5">
            Request Your AI Receptionist Walkthrough
          </h3>

          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            {selectedPlanId ? `Selected Tier: ${selectedPlanId.toUpperCase()} • ` : ""}
            We'll confirm the expected follow-up time when you submit your inquiry.
          </p>

          {/* Mode Switch */}
          <div className="flex p-1 rounded-xl bg-white/[0.05] border border-white/10 mb-5">
            <button
              onClick={() => setActiveTab("instant")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "instant"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Direct Inquiry
            </button>
            <button
              onClick={() => setActiveTab("calendar")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "calendar"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Preferred Time Slot
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
            {/* Honeypot field */}
            <input
              type="text"
              name="website_hp"
              value={websiteHp}
              onChange={(e) => setWebsiteHp(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Mitchell"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a14] border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Business Name *</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Mitchell Legal Group"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a14] border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@lawgroup.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a14] border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#060a14] border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {activeTab === "calendar" && (
              <div className="pt-2">
                <label className="block text-xs text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Preferred Consultation Window (Eastern Time)</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2 px-1 text-center rounded-lg text-[11px] font-medium border transition-all ${
                        timeSlot === slot
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                          : "bg-[#060a14] border-white/10 text-slate-300 hover:border-white/25"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 shadow-xl shadow-cyan-500/25 transition-all mt-4 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <span>Submit Demo Request</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-[10px] text-center text-slate-400 pt-1">
              Protected by privacy practices • No spam • Confidential business audit
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
