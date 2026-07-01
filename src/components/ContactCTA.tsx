"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PhoneCall } from "lucide-react";

export default function ContactCTA() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden z-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="Professional warehouse background"
          src="/warehouse-bg.png"
          fill
          className="object-cover grayscale opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-bg/90"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-text mb-6">
            Ready to Stock Premium Kidswear?
          </h2>
          <p className="text-lg text-brand-text/60 leading-relaxed mb-12 max-w-2xl mx-auto">
            Get in touch with us for exclusive wholesale deals and seasonal discounts. Our team is ready to help you curate the best collection for your boutique.
          </p>

          <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-xl border border-white/50 flex flex-col md:flex-row items-center justify-between gap-8 max-w-2xl mx-auto">
            <div className="text-left">
              <div className="text-xs font-semibold text-brand-text/50 uppercase tracking-widest mb-1">
                Direct Helpline
              </div>
              <div className="text-3xl font-extrabold text-brand-text tracking-tight">
                +91 9587996994
              </div>
            </div>
            <a
              href="tel:+919587996994"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-text text-white rounded-2xl font-bold shadow-[0_8px_20px_rgba(30,41,59,0.2)] hover:bg-brand-text/90 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <PhoneCall className="w-5 h-5 fill-white" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
