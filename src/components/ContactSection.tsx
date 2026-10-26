"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, AlertCircle, Phone, Mail, Clock, ShieldCheck, MapPin, CheckCircle2, Info } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function ContactSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    monthlyCallVolume: "100-300 calls/mo (Starter/Pro)",
    primaryServiceInterest: "AI Appointment Receptionist",
    notes: "",
    website_hp: "", // Honeypot field for spam prevention
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("contact_form_start", { source_location: "contact_section" });
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Full name is required (at least 2 characters).";
    }
    if (!formData.businessName.trim() || formData.businessName.trim().length < 2) {
      errs.businessName = "Business or practice name is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid work email.";
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errs.phone = "Please provide a valid telephone number for consultation.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          businessName: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          monthlyCallVolume: formData.monthlyCallVolume,
          primaryServiceInterest: formData.primaryServiceInterest,
          notes: formData.notes,
          website_hp: formData.website_hp,
          source: "contact_section",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      // Track successful lead generation WITHOUT transmitting personal data
      trackEvent("generate_lead", {
        source_location: "contact_section",
        category: "demo_inquiry",
      });

      // Redirect to dedicated /thank-you page (Requirement 4)
      router.push("/thank-you");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setServerError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background glow accent */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Agency Info & Assurance */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <span>Direct Agency Consultation</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
              Book a Live Demo &amp; Technical Discovery Call
            </h2>

            <p className="text-base text-slate-300 leading-relaxed mb-6">
              Experience an AI voice receptionist tailored to your exact industry and business requirements. No generic sales pitches.
            </p>

            {/* Response-Time Promise (Requirement 6) */}
            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 mb-8 flex items-start gap-3">
              <Clock className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Response Time Commitment:</strong>
                We'll confirm the expected follow-up time when you submit your inquiry.
              </div>
            </div>

            {/* Nationwide Remote Presence & Trust (Requirement 17) */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3.5 mb-8">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Operating Model &amp; Location</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ringwell AI operates remotely across the United States, providing customized voice AI deployments to clients nationwide. We do not operate a walk-in public retail counter, allowing us to keep operational overhead lean and direct resources toward voice engineering.
              </p>
              <div className="pt-2 border-t border-white/[0.06] flex items-center gap-3 text-xs text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href="mailto:hello@ringwellai.com"
                  onClick={() => trackEvent("email_click", { source_location: "contact_section" })}
                  className="hover:text-cyan-300 transition-colors"
                >
                  hello@ringwellai.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact & Booking Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-glow rounded-2xl sm:rounded-3xl p-5 sm:p-10 relative">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                <div className="mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">Schedule Your AI Receptionist Consultation</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out the form below. We'll confirm the expected follow-up time when you submit your inquiry.
                  </p>
                </div>

                {/* Honeypot hidden input for spam protection (Requirement 23) */}
                <input
                  type="text"
                  name="website_hp"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />

                {serverError && (
                  <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 flex items-center gap-2.5 text-xs text-red-200">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Full Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g. Jordan Mitchell"
                      className={`w-full px-4 py-3 rounded-xl bg-[#060a14] border ${
                        errors.name ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-cyan-400"
                      } text-white text-base sm:text-sm focus:outline-none transition-colors`}
                    />
                    {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  {/* Business Name */}
                  <div>
                    <label htmlFor="contact-business" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Business or Practice Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-business"
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      placeholder="e.g. Apex Family Dental"
                      className={`w-full px-4 py-3 rounded-xl bg-[#060a14] border ${
                        errors.businessName ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-cyan-400"
                      } text-white text-base sm:text-sm focus:outline-none transition-colors`}
                    />
                    {errors.businessName && <p className="text-[11px] text-red-400 mt-1">{errors.businessName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Work Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="jordan@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#060a14] border ${
                        errors.email ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-cyan-400"
                      } text-white text-base sm:text-sm focus:outline-none transition-colors`}
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Business Phone Number <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 012-3456"
                      className={`w-full px-4 py-3 rounded-xl bg-[#060a14] border ${
                        errors.phone ? "border-red-500 focus:border-red-400" : "border-white/10 focus:border-cyan-400"
                      } text-white text-base sm:text-sm focus:outline-none transition-colors`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Monthly Volume */}
                  <div>
                    <label htmlFor="contact-volume" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Expected Monthly Call Volume
                    </label>
                    <select
                      id="contact-volume"
                      value={formData.monthlyCallVolume}
                      onChange={(e) => handleInputChange("monthlyCallVolume", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#060a14] border border-white/10 focus:border-cyan-400 text-white text-base sm:text-sm focus:outline-none transition-colors"
                    >
                      <option value="Under 200 calls/mo (Starter)">Under 200 calls/mo (Starter)</option>
                      <option value="200-300 calls/mo (Professional)">200 – 300 calls/mo (Professional)</option>
                      <option value="300-500 calls/mo (Premium)">300 – 500 calls/mo (Premium)</option>
                      <option value="500+ calls/mo (Enterprise Custom)">500+ calls/mo (Enterprise Custom)</option>
                    </select>
                  </div>

                  {/* Primary Service Interest */}
                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Primary Service Interest
                    </label>
                    <select
                      id="contact-service"
                      value={formData.primaryServiceInterest}
                      onChange={(e) => handleInputChange("primaryServiceInterest", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#060a14] border border-white/10 focus:border-cyan-400 text-white text-base sm:text-sm focus:outline-none transition-colors"
                    >
                      <option value="AI Voice Receptionist">AI Voice Receptionist</option>
                      <option value="AI Appointment Receptionist">AI Appointment Receptionist</option>
                      <option value="AI Front Desk">AI Front Desk</option>
                      <option value="Website Conversational AI Assistant">Website Conversational AI Assistant</option>
                      <option value="3D Animated Website Development">3D Animated Website Development</option>
                      <option value="Business Workflow Automation">Business Workflow Automation</option>
                      <option value="CRM & Calendar Integrations">CRM &amp; Calendar Integrations</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="contact-notes" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Specific Workflow, Calendar Software, or Questions (Optional)
                  </label>
                  <textarea
                    id="contact-notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Tell us about your current phone setup, calendar system (e.g. Google Calendar, Calendly), or CRM software..."
                    className="w-full px-4 py-3 rounded-xl bg-[#060a14] border border-white/10 focus:border-cyan-400 text-white text-base sm:text-sm focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  By submitting, you agree to our <a href="/privacy-policy" className="text-cyan-400 underline">Privacy Policy</a>. We never sell contact information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
