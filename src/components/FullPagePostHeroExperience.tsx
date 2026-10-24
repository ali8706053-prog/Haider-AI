"use client";

import React, { useRef } from "react";
import FullPagePostHeroCanvas from "./FullPagePostHeroCanvas";

interface FullPagePostHeroExperienceProps {
  children: React.ReactNode;
}

export default function FullPagePostHeroExperience({
  children,
}: FullPagePostHeroExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full z-10 transition-colors duration-500"
    >
      {/* 1. Sticky background canvas pinned in viewport throughout entire container scroll */}
      <FullPagePostHeroCanvas containerRef={containerRef} />

      {/* 2. Content layer sitting cleanly above the pinned canvas */}
      <div className="relative z-10 w-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
}
