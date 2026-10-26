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
const LERP_FACTOR = 0.09; // Silky smooth Apple-style continuous interpolation
const PRELOAD_BATCH = 20;

function getFramePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/frames-200/ezgif-frame-${padded}.png`;
}

interface FullPagePostHeroCanvasProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function FullPagePostHeroCanvas({
  containerRef,
}: FullPagePostHeroCanvasProps) {
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

    // Fallback: search nearest loaded frame if current frame is loading
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

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      typeof window !== "undefined" && window.innerWidth < 768 ? 1.2 : 1.75
    );
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
    const dpr = Math.min(
      window.devicePixelRatio || 1,
      typeof window !== "undefined" && window.innerWidth < 768 ? 1.2 : 1.75
    );
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

  // Scroll handler mapping the ENTIRE below-hero container scroll progression to frames 0..199
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalScrollable = container.offsetHeight - windowH;

    if (totalScrollable <= 0) return;

    // Scrolled distance from top of below-hero container reaching top of viewport
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

    targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
  }, [containerRef]);

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
    <div
      aria-hidden="true"
      className="sticky top-0 left-0 w-full h-[100dvh] max-h-screen pointer-events-none z-0 overflow-hidden"
      style={{
        marginBottom: "-100dvh", // Keeps canvas pinned behind sibling content without occupying vertical space
      }}
    >
      {/* Fullscreen Canvas with high-end brightness and contrast calibration */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover"
        style={{
          opacity: loadProgress > 0 ? 1 : 0,
          transition: "opacity 0.5s ease",
          filter: "brightness(0.92) contrast(1.05)",
        }}
      />

      {/* Atmospheric Glassmorphism & Depth Gradient Overlay - allows robot to stay visible while keeping text 100% crisp */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(6, 182, 212, 0.08) 0%, rgba(3, 7, 18, 0.55) 60%, rgba(3, 7, 18, 0.88) 100%)",
        }}
      />

      {/* Subtle top & bottom edge blend into dark background */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-b from-[#030712] via-[#030712]/70 to-transparent z-10"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#030712] via-[#030712]/70 to-transparent z-10"
      />

      {/* Subtle Futuristic Cyan Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Thin loading bar at top edge while frames cache */}
      {!isReady && (
        <div
          className="absolute top-0 left-0 h-[2px] z-30 transition-all duration-200"
          style={{
            width: `${loadProgress}%`,
            background: "linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)",
          }}
        />
      )}
    </div>
  );
}
