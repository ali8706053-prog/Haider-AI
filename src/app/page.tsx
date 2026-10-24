"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroScrollAnimation from "@/components/HeroScrollAnimation";
import FullPagePostHeroExperience from "@/components/FullPagePostHeroExperience";
import InfiniteLogoCarousel from "@/components/InfiniteLogoCarousel";
import HumanVsAiComparison from "@/components/HumanVsAiComparison";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import VoiceSimulator from "@/components/VoiceSimulator";
import HowItWorks from "@/components/HowItWorks";
import Industries from "@/components/Industries";
import RoiCalculator from "@/components/RoiCalculator";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import StickyMobileCta from "@/components/StickyMobileCta";

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(undefined);

  const handleOpenDemo = (planId?: string) => {
    setSelectedPlanId(planId);
    setIsDemoModalOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoModalOpen(false);
    setSelectedPlanId(undefined);
  };

  const scrollToVoice = () => {
    const el = document.getElementById("voice-demo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Fixed Header */}
      <Navbar onOpenDemo={() => handleOpenDemo()} />

      {/* ── Cinematic scroll-linked image sequence wrapping the Hero (PRESERVED UNCHANGED) ── */}
      <HeroScrollAnimation>
        <Hero
          onOpenDemo={() => handleOpenDemo()}
          onScrollToVoice={scrollToVoice}
        />
      </HeroScrollAnimation>

      {/* ── Full-Page Continuous Cinematic Background (ezgif-frames-200) from end of Hero to end of Website ── */}
      <FullPagePostHeroExperience>
        {/* Infinite Logo Carousel directly below */}
        <InfiniteLogoCarousel />

        {/* Feature Comparison: Human vs AI Receptionist */}
        <HumanVsAiComparison onOpenDemo={() => handleOpenDemo()} />

        {/* Core Agency Services (All 7 required services) */}
        <Services onOpenDemo={() => handleOpenDemo()} />

        {/* Illustrative Case Studies & Deployment Architectures */}
        <CaseStudies onOpenDemo={(title) => handleOpenDemo(title)} />

        {/* Interactive Voice Simulator & Real-time Dialogue Player */}
        <VoiceSimulator onOpenDemo={() => handleOpenDemo()} />

        {/* 4-Step How It Works Deployment Roadmap */}
        <HowItWorks onOpenDemo={() => handleOpenDemo()} />

        {/* Target Industries & Tailored Workflows */}
        <Industries onOpenDemo={() => handleOpenDemo()} />

        {/* Interactive ROI & Missed Call Revenue Recovery Calculator */}
        <RoiCalculator onOpenDemo={() => handleOpenDemo()} />

        {/* Transparent Pricing (Starter, Professional, Premium with verified signing bonus) */}
        <Pricing onOpenDemo={(planId) => handleOpenDemo(planId)} />

        {/* Comprehensive FAQs (All 15 questions) */}
        <Faq onOpenDemo={() => handleOpenDemo()} />

        {/* Working Contact & Technical Consultation Form */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </FullPagePostHeroExperience>

      {/* Global Interactive Booking Modal */}
      <BookDemoModal
        isOpen={isDemoModalOpen}
        onClose={handleCloseDemo}
        selectedPlanId={selectedPlanId}
      />

      {/* Mobile-Only Sticky Bottom CTA Bar */}
      <StickyMobileCta onOpenDemo={() => handleOpenDemo()} />
    </main>
  );
}
