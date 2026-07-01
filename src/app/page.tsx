"use client";

import { useEffect, useRef } from "react";
import ScrollyTellingCanvas from "@/components/ScrollyTellingCanvas";
import StoryOverlay from "@/components/StoryOverlay";
import StatsSection from "@/components/StatsSection";
import FeaturedCollection from "@/components/FeaturedCollection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run if the user starts at the top of the page
    if (window.scrollY > 50) return;

    let startTime: number | null = null;
    const duration = 10000; // 10 seconds
    let animationFrameId: number;
    let isInterrupted = false;

    // The hero section container is 800vh.
    // The total scroll range of this container is 7 * window.innerHeight.
    const getTargetScrollY = () => {
      return window.innerHeight * 7;
    };

    const handleInterrupt = () => {
      isInterrupted = true;
      cancelAnimationFrame(animationFrameId);
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("wheel", handleInterrupt);
      window.removeEventListener("touchmove", handleInterrupt);
      window.removeEventListener("keydown", handleInterrupt);
      window.removeEventListener("mousedown", handleInterrupt);
    };

    // Cancel auto-scroll if the user interacts
    window.addEventListener("wheel", handleInterrupt, { passive: true });
    window.addEventListener("touchmove", handleInterrupt, { passive: true });
    window.addEventListener("keydown", handleInterrupt, { passive: true });
    window.addEventListener("mousedown", handleInterrupt, { passive: true });

    const step = (timestamp: number) => {
      if (isInterrupted) return;
      if (!startTime) startTime = timestamp;
      
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeInOutQuad easing function
      const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const easeProgress = easeInOutQuad(progress);

      const targetScroll = getTargetScrollY() * easeProgress;
      window.scrollTo(0, targetScroll);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        cleanupListeners();
      }
    };

    // Start auto-scroll after a short delay (1.5 seconds) to let assets load
    const startTimeout = setTimeout(() => {
      animationFrameId = requestAnimationFrame(step);
    }, 1500);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationFrameId);
      cleanupListeners();
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Immersive Hero Canvas Scrollytelling (Sticky Container) */}
      <div ref={containerRef} className="relative w-full h-[800vh]">
        <ScrollyTellingCanvas containerRef={containerRef} />
        <StoryOverlay containerRef={containerRef} />
      </div>
      
      {/* B2B Portal Content */}
      <StatsSection />
      <FeaturedCollection />
      <WhyChooseUs />
      <ContactCTA />
      <Footer />
    </main>
  );
}
