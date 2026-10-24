import React from "react";
import Link from "next/link";
import { Home, PhoneCall } from "lucide-react";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";

export const metadata = {
  title: "404 — Page Not Found | Ringwell AI",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <NavbarWrapper />

      <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="relative text-center max-w-xl mx-auto glass-panel-glow rounded-3xl p-8 sm:p-12 border border-cyan-500/25">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <span>HTTP Status 404</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white tracking-tighter mb-4">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            Lost in Transmission
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
            The page you are looking for doesn't exist, has been relocated, or is temporarily unavailable. Let's get you back on track.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-600/25 transition-all hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-all"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>Book a Demo</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
