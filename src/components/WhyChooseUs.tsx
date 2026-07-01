"use client";

import { motion } from "framer-motion";
import { Tag, ShieldCheck, Truck, Package } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      icon: Tag,
      title: "Wholesale Pricing",
      desc: "Direct factory prices with maximum margins for your retail business.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Assured",
      desc: "Every piece quality checked before dispatch to ensure customer satisfaction.",
    },
    {
      icon: Truck,
      title: "Pan-India Delivery",
      desc: "Fast and reliable shipping across all major cities and towns in India.",
    },
    {
      icon: Package,
      title: "Bulk Orders",
      desc: "Flexible MOQ with custom packaging options tailored to your needs.",
    },
  ];

  return (
    <section id="wholesale" className="bg-brand-text text-white py-28 relative overflow-hidden z-20">
      {/* Decorative Blur Overlays */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Why Choose IF Enterprises
          </h2>
          <div className="w-20 h-1 bg-brand-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                  <Icon className="w-6 h-6 text-brand-accent" />
                </div>
                <h4 className="text-xl font-bold mb-3 tracking-tight">{point.title}</h4>
                <p className="text-sm text-white/70 leading-relaxed">{point.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
