import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Clock } from "lucide-react";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Thank You | Ringwell AI",
  description:
    "Thank you for contacting Ringwell AI. Your demo request has been received.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <NavbarWrapper />

      <div className="flex-1 pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        {/* Accessible Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Thank You" }]} />

        <div className="mt-8 text-center max-w-2xl mx-auto">
          {/* Glowing Success Badge */}
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-xl shadow-emerald-500/20 animate-fade-in">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            Inquiry Successfully Received
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Thank You for Reaching Out to Ringwell AI
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Your demonstration and consultation request has been logged. We'll confirm the expected follow-up time when we review your submission details.
          </p>
        </div>

        {/* 3 Step Next Actions Box */}
        <div className="mt-12 glass-panel-glow rounded-3xl p-6 sm:p-10 border border-cyan-500/30">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            What Happens Next?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#080d19] border border-white/[0.08]">
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 text-sm font-bold mb-3">
                1
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Intake Review</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our solutions team reviews your business industry, call volume, and calendar software requirements.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#080d19] border border-white/[0.08]">
              <div className="w-8 h-8 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 text-sm font-bold mb-3">
                2
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Prototype Preparation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We prepare a simulated voice receptionist scenario calibrated with your business knowledge base.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#080d19] border border-white/[0.08]">
              <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 text-sm font-bold mb-3">
                3
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Live 1-on-1 Walkthrough</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We'll walk you through a live audio test call and verify your phone carrier setup options.
              </p>
            </div>
          </div>

          {/* Response commitment note */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-slate-400 justify-center">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Follow-up communications will be dispatched to the work email and direct phone provided.
            </span>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
