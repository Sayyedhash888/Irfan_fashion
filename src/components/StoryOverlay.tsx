"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface StoryOverlayProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function StoryOverlay({ containerRef }: StoryOverlayProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 0–15% (Hero)
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.15], [1, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // 15–40% (Threads/Fabric)
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [50, 0, 0, -50]);

  // 40–65% (Assembly/Glowing Seams)
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [50, 0, 0, -50]);

  // 65–85% (Details/Buttons)
  const opacity4 = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [50, 0, 0, -50]);

  // 85–100% (Final Hero & CTA)
  const opacity5 = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const y5 = useTransform(scrollYProgress, [0.85, 0.9, 1], [50, 0, 0]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* 0-15% */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-6"
      >
        <div className="max-w-4xl mx-auto text-center mt-[-10vh]">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-brand-text mb-6">
            IF Fashion.
          </h1>
          <p className="text-xl md:text-3xl text-brand-text/80 font-medium">
            Premium Kidswear. Wholesale Scale.
          </p>
        </div>
      </motion.div>

      {/* 15-40% */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="fixed inset-0 flex flex-col items-start justify-center pointer-events-none z-10 px-6 md:px-24"
      >
        <div className="max-w-2xl bg-white/40 backdrop-blur-md p-10 rounded-3xl border border-white/50 shadow-xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-text mb-4">
            Woven for the wild.
          </h2>
          <p className="text-lg md:text-xl text-brand-text/70 leading-relaxed">
            Sourcing premium corduroy and durable denim built for real play.
          </p>
        </div>
      </motion.div>

      {/* 40-65% */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="fixed inset-0 flex flex-col items-end justify-center pointer-events-none z-10 px-6 md:px-24"
      >
        <div className="max-w-2xl bg-white/40 backdrop-blur-md p-10 rounded-3xl border border-white/50 shadow-xl text-right">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-text mb-4">
            Reinforced where it matters.
          </h2>
          <p className="text-lg md:text-xl text-brand-text/70 leading-relaxed">
            High-grade stitching and durable construction. Clothes that survive the sandbox.
          </p>
        </div>
      </motion.div>

      {/* 65-85% */}
      <motion.div
        style={{ opacity: opacity4, y: y4 }}
        className="fixed inset-0 flex flex-col items-start justify-center pointer-events-none z-10 px-6 md:px-24"
      >
        <div className="max-w-2xl bg-white/40 backdrop-blur-md p-10 rounded-3xl border border-white/50 shadow-xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-text mb-4">
            Uncompromising Quality.
          </h2>
          <p className="text-lg md:text-xl text-brand-text/70 leading-relaxed">
            Silver-finish hardware and tailored fits. Elevated style for your store shelves.
          </p>
        </div>
      </motion.div>

      {/* 85-100% */}
      <motion.div
        style={{ opacity: opacity5, y: y5 }}
        className="fixed inset-0 flex flex-col items-center justify-center z-10 px-6"
      >
        <div className="max-w-3xl mx-auto text-center bg-white/60 backdrop-blur-xl p-12 rounded-[3rem] border border-white/80 shadow-2xl pointer-events-auto">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-text mb-8">
            Stock the Best.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white bg-brand-text rounded-full shadow-[0_8px_30px_rgba(30,41,59,0.3)] hover:shadow-[0_12px_40px_rgba(30,41,59,0.4)] hover:bg-brand-text/90 transition-all duration-300 transform hover:-translate-y-1">
              Apply for Wholesale
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-brand-text bg-white border-2 border-brand-text/10 rounded-full hover:border-brand-text/30 transition-all duration-300">
              View Catalog
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
