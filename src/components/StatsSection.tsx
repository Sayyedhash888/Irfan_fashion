"use client";

import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { value: "500+", label: "Products" },
    { value: "1000+", label: "Retailers" },
    { value: "28+", label: "States Served" },
  ];

  return (
    <section className="bg-white py-24 border-y border-gray-100 relative z-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-6 group border-r last:border-r-0 border-gray-100 md:block flex flex-col items-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-brand-text mb-3 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm font-semibold tracking-widest text-brand-text/50 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
