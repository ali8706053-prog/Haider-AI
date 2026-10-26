"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PhoneCall, Sparkles, Menu, X, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface NavbarProps {
  onOpenDemo: () => void;
}

export default function Navbar({ onOpenDemo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Human vs AI", href: "#comparison" },
    { name: "Voice Demo", href: "#voice-demo" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "FAQs", href: "#faqs" },
    { name: "Contact", href: "#contact" },
  ];

  const handleDemoClick = () => {
    trackEvent("book_demo_click", { source_location: "navbar_header" });
    onOpenDemo();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#030712]/90 backdrop-blur-md border-b border-white/[0.08] shadow-2xl shadow-black/50 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <div className="w-full h-full bg-[#070b14] rounded-[11px] flex items-center justify-center">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
                <PhoneCall className="w-4 h-4 text-cyan-300 absolute" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Ringwell<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-extrabold">AI</span>
              </span>
              <span className="text-[10px] tracking-wider text-slate-400 uppercase font-medium -mt-1">
                Voice &amp; Automation
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-cyan-300 transition-colors duration-200 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* US Market Presence Pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/20 text-xs text-blue-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>U.S. Remote Agency</span>
            </div>

            <button
              onClick={handleDemoClick}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Book a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 active:bg-slate-800 focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop click dismiss */}
            <div
              className="fixed inset-0 top-[70px] bg-black/60 backdrop-blur-sm z-[-1] xl:hidden animate-fade-in"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="xl:hidden mt-3 pt-4 pb-5 px-4 sm:px-6 rounded-2xl bg-[#0b0f19]/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-3 max-h-[calc(100dvh-90px)] overflow-y-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/20 text-xs text-blue-300 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>U.S. Autonomous AI Voice Operations</span>
              </div>

              <div className="flex flex-col gap-1 pt-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-slate-200 hover:text-cyan-300 hover:bg-white/[0.04] active:bg-cyan-500/10 px-3 py-2.5 rounded-xl transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                ))}
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleDemoClick();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-600/25 mt-2 active:scale-[0.99] transition-all"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
