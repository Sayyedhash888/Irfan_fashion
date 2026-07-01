"use client";

import { useEffect, useRef, useState } from "react";
import ScrollyTellingCanvas from "@/components/ScrollyTellingCanvas";
import StoryOverlay from "@/components/StoryOverlay";
import StatsSection from "@/components/StatsSection";
import FeaturedCollection from "@/components/FeaturedCollection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAway, setFadeAway] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Auto-scroll control refs
  const isAutoScrollingRef = useRef(false);
  const isInterruptedRef = useRef(false);
  const animationFrameIdRef = useRef<number | null>(null);

  // Trigger the 10s auto-scroll animation
  const triggerAutoScroll = () => {
    if (isAutoScrollingRef.current) return;

    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }

    isInterruptedRef.current = false;
    isAutoScrollingRef.current = true;

    let startTime: number | null = null;
    const duration = 10000; // 10 seconds
    const startScrollY = window.scrollY; // should be 0

    // The hero container is 800vh, so scroll range is 7 viewports
    const getTargetScrollY = () => {
      return window.innerHeight * 7;
    };

    const step = (timestamp: number) => {
      if (isInterruptedRef.current) {
        isAutoScrollingRef.current = false;
        return;
      }

      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeInOutQuad curve
      const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const easeProgress = easeInOutQuad(progress);

      const targetScroll = startScrollY + (getTargetScrollY() - startScrollY) * easeProgress;
      window.scrollTo(0, targetScroll);

      if (progress < 1) {
        animationFrameIdRef.current = requestAnimationFrame(step);
      } else {
        isAutoScrollingRef.current = false;
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(step);
  };

  const handleInterrupt = () => {
    if (isAutoScrollingRef.current) {
      isInterruptedRef.current = true;
    }
  };

  // Manage body scroll lock during loading state
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Run the initial auto-scroll after the loader has faded out
      const startTimeout = setTimeout(() => {
        triggerAutoScroll();
      }, 500);
      return () => clearTimeout(startTimeout);
    }
  }, [isLoading]);

  // Handle user input interrupts
  useEffect(() => {
    if (isLoading) return;

    window.addEventListener("wheel", handleInterrupt, { passive: true });
    window.addEventListener("touchmove", handleInterrupt, { passive: true });
    window.addEventListener("keydown", handleInterrupt, { passive: true });
    window.addEventListener("mousedown", handleInterrupt, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleInterrupt);
      window.removeEventListener("touchmove", handleInterrupt);
      window.removeEventListener("keydown", handleInterrupt);
      window.removeEventListener("mousedown", handleInterrupt);
    };
  }, [isLoading]);

  // Restart auto-scroll when user reaches the very top again
  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      if (window.scrollY <= 2 && !isAutoScrollingRef.current) {
        // Debounce slightly to prevent conflicts with active scroll momentum
        const timeout = setTimeout(() => {
          if (window.scrollY <= 2 && !isAutoScrollingRef.current) {
            triggerAutoScroll();
          }
        }, 150);
        return () => clearTimeout(timeout);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  // Clean up any remaining animation frames on unmount
  useEffect(() => {
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  const handleLoadProgress = (loaded: number, total: number) => {
    const percent = (loaded / total) * 100;
    setLoadProgress(percent);

    if (loaded === total) {
      // Smooth fade transition
      setTimeout(() => {
        setFadeAway(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Wait for the 1s CSS transition to complete
      }, 500); // Hold at 100% briefly for visual satisfaction
    }
  };

  return (
    <main className="relative min-h-screen">
      {/* Immersive Hero Canvas Scrollytelling (Sticky Container) */}
      <div ref={containerRef} className="relative w-full h-[800vh]">
        <ScrollyTellingCanvas 
          containerRef={containerRef} 
          onLoadProgress={handleLoadProgress}
        />
        <StoryOverlay containerRef={containerRef} />
      </div>
      
      {/* B2B Portal Content */}
      <StatsSection />
      <FeaturedCollection />
      <WhyChooseUs />
      <ContactCTA />
      <Footer />

      {/* Elegant Premium Loading Page Overlay */}
      {isLoading && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf9f6] text-brand-text transition-opacity duration-1000 ${
            fadeAway ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="max-w-md w-full px-8 text-center flex flex-col items-center">
            {/* Minimal Brand Logotype */}
            <h2 className="text-4xl md:text-5xl font-bold tracking-widest uppercase mb-2">
              IF FASHION
            </h2>
            <p className="text-xs font-semibold tracking-widest text-brand-text/40 uppercase mb-16">
              Wholesale Campaign
            </p>

            {/* Premium Gold Accent Progress Bar */}
            <div className="w-full bg-brand-text/5 h-[2px] mb-4 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-brand-accent transition-all duration-300 ease-out" 
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            <div className="flex justify-between w-full text-[10px] font-bold tracking-wider text-brand-text/50 uppercase">
              <span>Sourcing Craftsmanship</span>
              <span>{Math.round(loadProgress)}%</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
