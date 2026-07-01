"use client";

import { useRef } from "react";
import ScrollyTellingCanvas from "@/components/ScrollyTellingCanvas";
import StoryOverlay from "@/components/StoryOverlay";
import StatsSection from "@/components/StatsSection";
import FeaturedCollection from "@/components/FeaturedCollection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

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
