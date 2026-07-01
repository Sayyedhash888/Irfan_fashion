"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isLoadedComplete, setIsLoadedComplete] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Auto-scroll control refs
  const isAutoScrollingRef = useRef(false);
  const isInterruptedRef = useRef(false);
  const animationFrameIdRef = useRef<number | null>(null);
  const mountTimeRef = useRef<number>(0);

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  // Trigger the 10s auto-scroll animation
  const triggerAutoScroll = () => {
    if (isAutoScrollingRef.current) return;

    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }

    isInterruptedRef.current = false;
    isAutoScrollingRef.current = true;

    let startTime: number | null = null;
    const startScrollY = window.scrollY; // start from current position

    // The hero container is 800vh, so scroll range is 7 viewports
    const getTargetScrollY = () => {
      return window.innerHeight * 7;
    };

    const targetScrollY = getTargetScrollY();
    const remainingDistance = Math.max(0, targetScrollY - startScrollY);

    // Calculate remaining duration proportionally so speed is consistent
    const duration = (remainingDistance / targetScrollY) * 10000;

    if (duration <= 0) {
      isAutoScrollingRef.current = false;
      return;
    }

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

      const targetScroll = startScrollY + (targetScrollY - startScrollY) * easeProgress;
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

  const handleEnter = () => {
    setIsLoading(false);
  };

  // Toggle animation on canvas click
  const handleCanvasClick = (e: React.MouseEvent) => {
    // Avoid triggering when clicking links, buttons, or inputs
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest("input")) {
      return;
    }

    // Only active inside the scrollytelling section
    const targetScrollY = window.innerHeight * 7;
    if (window.scrollY >= targetScrollY - 10) {
      // If at the end, clicking scrolls back to top and restarts
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (isAutoScrollingRef.current) {
      isInterruptedRef.current = true;
    } else {
      triggerAutoScroll();
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

  // Handle user input interrupts (excluding click, since click controls play/pause)
  useEffect(() => {
    if (isLoading) return;

    window.addEventListener("wheel", handleInterrupt, { passive: true });
    window.addEventListener("touchmove", handleInterrupt, { passive: true });
    window.addEventListener("keydown", handleInterrupt, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleInterrupt);
      window.removeEventListener("touchmove", handleInterrupt);
      window.removeEventListener("keydown", handleInterrupt);
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
      const elapsed = Date.now() - mountTimeRef.current;
      const remainingTime = Math.max(0, 5000 - elapsed);
      
      setTimeout(() => {
        setIsLoadedComplete(true);
      }, remainingTime);
    }
  };

  return (
    <main className="relative min-h-screen">
      {/* Immersive Hero Canvas Scrollytelling (Sticky Container) */}
      <div 
        ref={containerRef} 
        onClick={handleCanvasClick}
        className="relative w-full h-[800vh] cursor-pointer"
      >
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
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf9f6] text-brand-text"
          >
            <div className="max-w-md w-full px-8 text-center flex flex-col items-center">
              {/* Minimal Brand Logotype */}
              <motion.h2 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold tracking-widest uppercase mb-2"
              >
                IF FASHION
              </motion.h2>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 0.4 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xs font-semibold tracking-widest uppercase mb-16"
              >
                Wholesale Campaign
              </motion.p>

              {/* Progress / CTA Action Box */}
              <div className="w-full min-h-[80px] flex flex-col items-center justify-center">
                {!isLoadedComplete ? (
                  <motion.div 
                    key="progress"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                  >
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
                  </motion.div>
                ) : (
                  <motion.button 
                    key="button"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                    onClick={handleEnter}
                    className="px-12 py-4 text-xs font-bold tracking-widest text-[#faf9f6] bg-brand-text rounded-full hover:bg-brand-text/90 hover:shadow-[0_8px_30px_rgba(30,41,59,0.25)] active:scale-95 transition-all duration-300 pointer-events-auto uppercase cursor-pointer border border-brand-text"
                  >
                    Enter Experience
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
