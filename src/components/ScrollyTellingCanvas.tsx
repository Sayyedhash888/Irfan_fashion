"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";

const FRAME_COUNT = 300;
const PRELOAD_BATCH_SIZE = 50;

interface ScrollyTellingCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollyTellingCanvas({ containerRef }: ScrollyTellingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Track scroll progress specifically across the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Apply a spring to smooth out the choppiness of native scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
    mass: 0.1
  });
  
  // Map smooth scroll progress (0-1) to frame index (1-300)
  const frameIndex = useTransform(smoothProgress, [0, 1], [1, FRAME_COUNT]);
  const currentIndexRef = useRef(1);

  useEffect(() => {
    // Preload images in batches to prevent overwhelming the browser
    const preloadImages = async () => {
      for (let i = 0; i < FRAME_COUNT; i += PRELOAD_BATCH_SIZE) {
        const batch = Array.from({ length: Math.min(PRELOAD_BATCH_SIZE, FRAME_COUNT - i) }, (_, j) => {
          const index = i + j + 1;
          return new Promise<void>((resolve) => {
            const img = new Image();
            // Format number with leading zeros (e.g., 001, 042, 300)
            const paddedIndex = index.toString().padStart(3, "0");
            img.src = `/hero_images/ezgif-frame-${paddedIndex}.jpg`;
            img.onload = () => {
              imagesRef.current[index - 1] = img;
              setImagesLoaded((prev) => prev + 1);
              resolve();
            };
            img.onerror = () => {
              console.error(`Failed to load image index ${index}`);
              resolve(); // Resolve anyway to continue loading
            };
          });
        });
        await Promise.all(batch);
      }
    };

    preloadImages();
  }, []);

  // Draw the initial frame once loaded
  useEffect(() => {
    if (imagesLoaded > 0 && canvasRef.current && imagesRef.current[0]) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Set canvas size matching window or typical 16:9 aspect ratio
        // For a full-screen premium look, cover the window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        drawFrame(1);
      }
    }
  }, [imagesLoaded]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame(currentIndexRef.current);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index - 1];
    if (!img) return;

    // Calculate object-cover dimensions
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw background color in case of gaps (matching the off-white)
    ctx.fillStyle = "#faf9f6"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.round(latest);
    if (index !== currentIndexRef.current && index > 0 && index <= FRAME_COUNT) {
      currentIndexRef.current = index;
      requestAnimationFrame(() => drawFrame(index));
    }
  });

  return (
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-brand-bg pointer-events-none -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
      {imagesLoaded < FRAME_COUNT * 0.1 && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-bg">
          <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
