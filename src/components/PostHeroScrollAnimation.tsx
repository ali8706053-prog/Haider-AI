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
const TOTAL_FRAMES = 200;
const SCROLL_MULTIPLIER = 4; // section height = 4 × 100vh = 400vh
const LERP_FACTOR = 0.12;    // smoothness (Apple-level smooth)
const PRELOAD_BATCH = 20;
const BG_COLOR = "#030712";

// Returns frame URL for 1-based index (1 to 200)
function getFramePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/frames-200/ezgif-frame-${padded}.png`;
}

export default function PostHeroScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const loadedCountRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastDrawnRef = useRef(-1);
  const reducedMotion = useRef(false);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Draw frame on canvas with retina DPR and object-fit cover
  const drawFrame = useCallback((f: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const idx = Math.round(Math.max(0, Math.min(TOTAL_FRAMES - 1, f)));
    
    // Find nearest loaded frame if current frame is still loading
    let img = imagesRef.current[idx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset <= 20; offset++) {
        const prev = imagesRef.current[idx - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[idx + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;

    // Cover-fit math
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const viewAspect = W / H;
    let sx = 0,
      sy = 0,
      sw = img.naturalWidth,
      sh = img.naturalHeight;

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

  // Resize canvas to window dimensions with DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Persistent RAF loop with LERP easing
  const startLoop = useCallback(() => {
    const loop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.04) {
        currentFrameRef.current = current + diff * LERP_FACTOR;
      } else {
        currentFrameRef.current = target;
      }

      const frameIdx = Math.round(currentFrameRef.current);

      if (frameIdx !== lastDrawnRef.current) {
        drawFrame(currentFrameRef.current);
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [drawFrame]);

  // Scroll handler mapping scroll progress directly to frame index
  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionH = section.offsetHeight;
    const viewH = window.innerHeight;

    const scrollable = sectionH - viewH;
    if (scrollable <= 0) return;

    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(1, scrolled / scrollable);

    targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
  }, []);

  // Progressive frame preloader in batches
  const preloadFrames = useCallback(() => {
    let nextIndex = 0;

    const loadBatch = () => {
      const end = Math.min(nextIndex + PRELOAD_BATCH, TOTAL_FRAMES);
      let pending = end - nextIndex;
      if (pending <= 0) return;

      for (let i = nextIndex; i < end; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = getFramePath(i + 1);
        img.onload = img.onerror = () => {
          loadedCountRef.current++;
          setLoadProgress(
            Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100)
          );
          if (loadedCountRef.current === TOTAL_FRAMES) {
            setIsReady(true);
          }
          pending--;
          if (pending === 0 && nextIndex < TOTAL_FRAMES) {
            setTimeout(loadBatch, 16);
          }
        };
        imagesRef.current[i] = img;
      }
      nextIndex = end;
    };

    loadBatch();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;

    resizeCanvas();

    // Instant load frame 1
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      loadedCountRef.current = Math.max(1, loadedCountRef.current);
      drawFrame(0);
    };

    preloadFrames();

    if (!reducedMotion.current) {
      startLoop();
    }

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

  // Reduced motion support
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
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
    >
      {/* Sticky full-screen viewport */}
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden"
        style={{ backgroundColor: BG_COLOR }}
      >
        {/* Fullscreen HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 block w-full h-full pointer-events-none"
          style={{
            opacity: loadProgress > 0 ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Seamless luxury edge vignette (deep gold / dark tone, seamless background) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 60%, rgba(3, 7, 18, 0.45) 85%, #030712 100%)",
          }}
        />

        {/* Subtle top & bottom edge blend into dark background */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-b from-[#030712] to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#030712] to-transparent z-10"
        />

        {/* Loading progress bar */}
        {!isReady && (
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[2px] z-20 transition-all duration-200"
            style={{
              width: `${loadProgress}%`,
              background: "linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)",
            }}
          />
        )}

        {/* Floating cinematic subtle brand badge */}
        <div className="absolute top-8 left-8 z-20 pointer-events-none opacity-40">
          <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold">
            Ringwell AI • Autonomous Voice Architecture
          </span>
        </div>

        {/* Scroll indicator hint */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-40 pointer-events-none animate-bounce"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
            Scroll to explore
          </span>
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            className="text-slate-400"
          >
            <rect
              x="1"
              y="1"
              width="12"
              height="18"
              rx="6"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="7" cy="6" r="2" fill="#38bdf8" />
          </svg>
        </div>
      </div>
    </section>
  );
}
