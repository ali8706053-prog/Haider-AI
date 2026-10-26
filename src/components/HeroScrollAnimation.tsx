"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 240;
const SCROLL_MULTIPLIER = 4; // section height = 4 × 100vh
const LERP_FACTOR = 0.12;    // smoothness  (lower = silkier, higher = snappier)
const PRELOAD_BATCH = 20;    // frames to load per animation-frame burst
// Background color that matches frame 1 edge colour (deep near-black gold-tone)
const BG_COLOR = "#030712";

// Build the path for a given 1-based frame index
function framePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/ezgif-frame-${padded}.png`;
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroScrollAnimation
// Wraps children (the existing Hero JSX) inside a cinematic sticky-scroll
// image-sequence section.  The canvas lives *behind* the hero content.
// ─────────────────────────────────────────────────────────────────────────────
interface HeroScrollAnimationProps {
  children: React.ReactNode;
}

export default function HeroScrollAnimation({
  children,
}: HeroScrollAnimationProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const loadedCountRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);     // floating (LERP target accumulator)
  const targetFrameRef = useRef(0);      // integer index from scroll
  const lastDrawnRef = useRef(-1);       // last actually painted index
  const reducedMotion = useRef(false);

  const [loadProgress, setLoadProgress] = useState(0); // 0–100
  const [isReady, setIsReady] = useState(false);
  const [scrollMultiplier, setScrollMultiplier] = useState(4);

  // Adapt scroll height multiplier for mobile, tablet, and desktop
  useEffect(() => {
    const updateMultiplier = () => {
      if (window.innerWidth < 768) {
        setScrollMultiplier(2); // Fast & fluid on mobile touchscreens
      } else if (window.innerWidth < 1024) {
        setScrollMultiplier(2.8); // Smooth on iPad & tablets
      } else {
        setScrollMultiplier(4); // Full cinematic distance on desktop
      }
    };
    updateMultiplier();
    window.addEventListener("resize", updateMultiplier, { passive: true });
    return () => window.removeEventListener("resize", updateMultiplier);
  }, []);

  // ── Draw the frame at floating `f` onto the canvas ──────────────────────
  const drawFrame = useCallback((f: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const idx = Math.round(Math.max(0, Math.min(TOTAL_FRAMES - 1, f)));
    const img = imagesRef.current[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;

    // Cover-fit (like object-fit: cover)
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const viewAspect = W / H;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (imgAspect > viewAspect) {
      sw = img.naturalHeight * viewAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / viewAspect;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
    ctx.restore();

    lastDrawnRef.current = idx;
  }, []);

  // ── Resize canvas to viewport with DPR support ───────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    // Redraw current frame after resize
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // ── Persistent RAF loop: LERP currentFrame → targetFrame then draw ───────
  const startLoop = useCallback(() => {
    const loop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // Advance current toward target with LERP
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current = current + diff * LERP_FACTOR;
      } else {
        currentFrameRef.current = target;
      }

      const frameIdx = Math.round(currentFrameRef.current);

      // Only redraw if the displayed integer frame changed
      if (frameIdx !== lastDrawnRef.current) {
        drawFrame(currentFrameRef.current);
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [drawFrame]);

  // ── Scroll handler: map scroll progress → targetFrame ───────────────────
  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionH = section.offsetHeight;
    const viewH = window.innerHeight;

    // Progress = how far we've scrolled through the *scrollable* portion
    // (the sticky window height is subtracted since it's always visible)
    const scrollable = sectionH - viewH;
    if (scrollable <= 0) return;

    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(1, scrolled / scrollable);

    targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
  }, []);

  // ── Progressive frame preloader ──────────────────────────────────────────
  const preloadFrames = useCallback(() => {
    let nextIndex = loadedCountRef.current;

    const loadBatch = () => {
      const end = Math.min(nextIndex + PRELOAD_BATCH, TOTAL_FRAMES);
      let pending = end - nextIndex;
      if (pending <= 0) return;

      for (let i = nextIndex; i < end; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = framePath(i + 1); // 1-based file names
        img.onload = img.onerror = () => {
          loadedCountRef.current++;
          setLoadProgress(
            Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100)
          );
          if (loadedCountRef.current === TOTAL_FRAMES) {
            setIsReady(true);
          }
          pending--;
          if (pending === 0 && loadedCountRef.current < TOTAL_FRAMES) {
            // Small gap between batches to avoid starving the main thread
            setTimeout(loadBatch, 16);
          }
        };
        imagesRef.current[i] = img;
      }
      nextIndex = end;
    };

    loadBatch();
  }, []);

  // ── Mount / unmount ──────────────────────────────────────────────────────
  useEffect(() => {
    // Detect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;

    // Initial canvas size
    resizeCanvas();

    // Draw first frame as soon as img[0] loaded
    const firstImg = new Image();
    firstImg.src = framePath(1);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      loadedCountRef.current = 1;
      drawFrame(0);
    };

    // Start preloading all frames
    preloadFrames();

    // Start the persistent RAF loop
    if (!reducedMotion.current) {
      startLoop();
    }

    // Event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [resizeCanvas, drawFrame, preloadFrames, startLoop, handleScroll]);

  // ── Reduced-motion: instant frame jump (no loop) ──────────────────────
  useEffect(() => {
    if (!reducedMotion.current) return;
    const onScroll = () => {
      handleScroll();
      drawFrame(targetFrameRef.current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll, drawFrame]);

  return (
    /**
     * Outer section: tall enough to give scroll room = SCROLL_MULTIPLIER × 100vh
     * position: relative so the sticky child knows its bounds
     */
    <section
      ref={sectionRef}
      style={{ height: `${scrollMultiplier * 100}vh`, position: "relative" }}
    >
      {/* ── Sticky container: stays in viewport while section is in view ── */}
      <div
        className="h-screen max-h-screen"
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100dvh",
          overflow: "hidden",
          backgroundColor: BG_COLOR,
        }}
      >
        {/* ── Full-screen canvas (behind everything) ─────────────────────── */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            // Smooth initial appearance
            opacity: loadProgress > 0 ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* ── Very subtle dark vignette overlay ─────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, transparent 55%, rgba(3,7,18,0.55) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* ── Loading progress bar (disappears once all frames loaded) ──── */}
        {!isReady && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "2px",
              width: `${loadProgress}%`,
              background:
                "linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)",
              zIndex: 10,
              transition: "width 0.2s linear",
            }}
          />
        )}

        {/* ── Hero content overlay (z-index: 2, above canvas) ─────────────
            The children (existing Hero component) sits here unchanged.
            Pointer-events are normal so all buttons / links work.
        ─────────────────────────────────────────────────────────────── */}
        <div
          className="relative z-[2] w-full h-full flex flex-col justify-center overflow-y-auto sm:overflow-y-hidden"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {children}
        </div>

        {/* ── Scroll hint indicator (hidden on mobile phones to save vertical space) ─────────────────── */}
        <div
          aria-hidden="true"
          className="hidden md:flex flex-col items-center gap-1.5 opacity-50 absolute bottom-6 left-1/2 -translate-x-1/2 z-[3]"
          style={{
            animation: "scrollBounce 2s ease-in-out infinite",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#94a3b8",
              fontWeight: 600,
            }}
          >
            scroll
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            style={{ display: "block" }}
          >
            <rect
              x="1"
              y="1"
              width="14"
              height="22"
              rx="7"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            <circle
              cx="8"
              cy="7"
              r="2.5"
              fill="#38bdf8"
              style={{ animation: "mouseScroll 2s ease-in-out infinite" }}
            />
          </svg>
        </div>
      </div>

      {/* Inline keyframe definitions */}
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
          50%       { transform: translateX(-50%) translateY(6px); opacity: 0.8; }
        }
        @keyframes mouseScroll {
          0%   { transform: translateY(0);   opacity: 1; }
          60%  { transform: translateY(8px); opacity: 0; }
          61%  { transform: translateY(0);   opacity: 0; }
          100% { transform: translateY(0);   opacity: 1; }
        }
      `}</style>
    </section>
  );
}
