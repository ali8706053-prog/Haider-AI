"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, Sparkles, Mic, Radio, CheckCircle, ShieldAlert } from "lucide-react";
import { AUDIO_SAMPLES, AudioSample } from "@/data/audioSamples";

interface VoiceSimulatorProps {
  onOpenDemo: () => void;
}

export default function VoiceSimulator({ onOpenDemo }: VoiceSimulatorProps) {
  const [selectedSample, setSelectedSample] = useState<AudioSample>(AUDIO_SAMPLES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeMessageIndex, setActiveMessageIndex] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset dialogue sequence when sample changes
  const handleSelectSample = (sample: AudioSample) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedSample(sample);
    setIsPlaying(false);
    setActiveMessageIndex(0);
  };

  // Playback timer simulation through transcript
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveMessageIndex((prev) => {
          if (prev < selectedSample.transcript.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 3200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, selectedSample]);

  const togglePlay = () => {
    if (!isPlaying && activeMessageIndex >= selectedSample.transcript.length - 1) {
      setActiveMessageIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setActiveMessageIndex(0);
  };

  return (
    <section id="voice-demo" className="py-24 relative overflow-hidden bg-[#050914]/80 border-y border-white/[0.06]">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
            <span>Interactive Audio Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Hear Ringwell AI in Action
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Listen to unscripted, natural conversations handled autonomously. Zero robotic delays, instant comprehension, and flawless appointment booking.
          </p>
        </div>

        {/* Industry Scenario Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {AUDIO_SAMPLES.map((sample) => {
            const isSelected = sample.id === selectedSample.id;
            return (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 scale-[1.02]"
                    : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/5"
                }`}
              >
                <span>{sample.industry}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>}
              </button>
            );
          })}
        </div>

        {/* Interactive Audio Player & Conversation Chamber */}
        <div className="max-w-4xl mx-auto glass-panel-glow rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          {/* Top Bar of Audio Player */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-inner">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>{selectedSample.title}</span>
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <span>Agent: <strong className="text-cyan-300 font-medium">{selectedSample.personaName}</strong></span>
                  <span>•</span>
                  <span>Latency: <strong className="text-emerald-400 font-medium">{selectedSample.speedMs}ms</strong></span>
                </p>
              </div>
            </div>

            {/* Play/Pause Control & Latency Badge */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Restart Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-400/30 hover:bg-cyan-300 active:scale-95 transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause Demo</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Play Simulation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dynamic Audio Visualizer Bar */}
          <div className="py-6 flex items-center justify-center gap-1.5 h-16">
            {[24, 48, 72, 32, 90, 64, 40, 85, 96, 54, 78, 30, 88, 45, 92, 60, 35, 75, 45, 80].map((h, i) => (
              <span
                key={i}
                className={`w-1.5 sm:w-2 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? "bg-gradient-to-t from-blue-600 via-cyan-400 to-white"
                    : "bg-slate-700/60"
                }`}
                style={{
                  height: isPlaying ? `${Math.max(16, (h * ((i % 3) + 1)) % 58)}px` : "10px",
                  animation: isPlaying ? `audioWave 1.2s ease-in-out infinite ${(i * 0.08).toFixed(2)}s` : "none",
                }}
              ></span>
            ))}
          </div>

          {/* Transcript Dialogue Stream */}
          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
            {selectedSample.transcript.map((line, idx) => {
              const isAi = line.speaker === "Ringwell AI";
              const isCurrent = idx === activeMessageIndex;
              const isVisible = idx <= activeMessageIndex;

              return (
                <div
                  key={idx}
                  className={`transition-all duration-300 flex flex-col ${
                    isAi ? "items-start" : "items-end"
                  } ${isVisible ? "opacity-100 translate-y-0" : "opacity-35 scale-[0.98]"}`}
                >
                  <div className="flex items-center gap-2 mb-1 text-[11px] text-slate-400 px-1">
                    <span className="font-semibold text-slate-300">{line.speaker}</span>
                    <span>•</span>
                    <span>{line.timestamp}</span>
                    {isCurrent && isPlaying && (
                      <span className="inline-flex items-center gap-1 text-cyan-400 font-medium text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                        Speaking
                      </span>
                    )}
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                      isAi
                        ? isCurrent && isPlaying
                          ? "bg-blue-600/30 border border-cyan-400/50 text-white shadow-lg shadow-blue-500/15"
                          : "bg-slate-800/60 border border-white/5 text-slate-200"
                        : "bg-white/[0.08] border border-white/10 text-slate-100"
                    }`}
                  >
                    {line.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Technical Specs Footer */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-xl sm:text-2xl font-bold text-cyan-400">&lt;800ms</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">Response Latency</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">100%</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">Full Duplex Audio</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-xl sm:text-2xl font-bold text-blue-400">48kHz</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">HD Neural Voice</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-xl sm:text-2xl font-bold text-purple-400">Zero</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5 font-medium">Hallucinations</div>
            </div>
          </div>
        </div>

        {/* CTA Bar below audio */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-400 mb-4">
            Want to test an AI agent configured specifically for your business phone number?
          </p>
          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
          >
            <span>Request a Custom Agent Prototype</span>
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
