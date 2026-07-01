"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 300;

interface ScrollyTellingCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onLoadProgress?: (loaded: number, total: number) => void;
  onLoadComplete?: () => void;
}

export default function ScrollyTellingCanvas({ 
  containerRef,
  onLoadProgress,
  onLoadComplete
}: ScrollyTellingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Smooth animation state — no Framer Motion, pure rAF interpolation
  const currentFrameRef = useRef(1);     // The currently displayed (interpolated) frame
  const targetFrameRef = useRef(1);      // Where scroll says we should be
  const rafIdRef = useRef<number>(0);

  // Capture latest callbacks in refs to prevent triggering the preload effect multiple times
  const onLoadProgressRef = useRef(onLoadProgress);
  const onLoadCompleteRef = useRef(onLoadComplete);

  useEffect(() => {
    onLoadProgressRef.current = onLoadProgress;
    onLoadCompleteRef.current = onLoadComplete;
  });

  // ---- Image Preloading (all at once, no batching for speed) ----
  useEffect(() => {
    let loaded = 0;
    
    // Call initial progress
    onLoadProgressRef.current?.(0, FRAME_COUNT);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = (i + 1).toString().padStart(3, "0");
      img.src = `/hero_images/ezgif-frame-${paddedIndex}.jpg`;
      img.onload = () => {
        imagesRef.current[i] = img;
        loaded++;
        setImagesLoaded(loaded);
        onLoadProgressRef.current?.(loaded, FRAME_COUNT);
        if (loaded === FRAME_COUNT) {
          onLoadCompleteRef.current?.();
        }
      };
      img.onerror = () => {
        loaded++;
        setImagesLoaded(loaded);
        onLoadProgressRef.current?.(loaded, FRAME_COUNT);
        if (loaded === FRAME_COUNT) {
          onLoadCompleteRef.current?.();
        }
      };
    }
  }, []);

  // ---- Canvas sizing ----
  const setCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    return () => window.removeEventListener("resize", setCanvasSize);
  }, [setCanvasSize]);

  // ---- Draw a frame (using CSS-pixel dimensions) ----
  const drawFrame = useCallback((frameFloat: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const index = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frameFloat) - 1));
    const img = imagesRef.current[index];
    if (!img) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Object-cover calculation
    const canvasRatio = w / h;
    const imgRatio = img.width / img.height;
    let drawWidth = w;
    let drawHeight = h;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = w / imgRatio;
      offsetY = (h - drawHeight) / 2;
    } else {
      drawWidth = h * imgRatio;
      offsetX = (w - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#faf9f6";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // ---- Scroll listener: compute target frame from container scroll ----
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight - window.innerHeight;
      
      // How far through the container are we? (0 to 1)
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / containerHeight));
      
      // Map to frame (1 to 300)
      targetFrameRef.current = 1 + progress * (FRAME_COUNT - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  // ---- Smooth animation loop (lerp toward target) ----
  useEffect(() => {
    let lastDrawnFrame = -1;

    const animate = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;

      // Lerp factor: 0.06 = very smooth & cinematic, 0.15 = responsive
      // Using 0.08 for a buttery feel that still tracks well
      const lerp = 0.08;
      const next = current + (target - current) * lerp;

      currentFrameRef.current = next;

      // Only redraw when the rounded frame actually changes
      const roundedFrame = Math.round(next);
      if (roundedFrame !== lastDrawnFrame) {
        lastDrawnFrame = roundedFrame;
        drawFrame(next);
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, [drawFrame]);

  // ---- Draw first frame once enough images are loaded ----
  useEffect(() => {
    if (imagesLoaded >= 1 && imagesRef.current[0]) {
      drawFrame(1);
    }
  }, [imagesLoaded, drawFrame]);

  return (
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-brand-bg pointer-events-none -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}
