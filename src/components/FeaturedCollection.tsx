"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FeaturedCollection() {
  return (
    <section id="collections" className="py-28 px-6 bg-brand-bg relative z-20">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-text mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-brand-text/60 max-w-xl">
              Handpicked premium styles crafted for durability, modern play, and commercial B2B margins.
            </p>
          </div>
          <a
            href="#catalog"
            className="group font-semibold text-brand-text flex items-center gap-2 hover:text-brand-accent transition-all"
          >
            View All Styles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col sm:flex-row"
          >
            <div className="sm:w-1/2 relative min-h-[300px] overflow-hidden bg-gray-50">
              <Image
                alt="Premium Cotton Printed Shirt"
                src="/product-shirt.png"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="sm:w-1/2 p-8 flex flex-col justify-between bg-white">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                    50% OFF
                  </span>
                  <span className="text-brand-text/50 text-xs font-medium">
                    Min. 10 pcs
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-brand-text mb-2">
                  Premium Cotton Printed Shirt
                </h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-bold text-brand-text">₹250.00</span>
                  <span className="text-brand-text/40 line-through text-sm">₹499.00</span>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-semibold text-brand-text/50 uppercase tracking-widest">
                    Available Sizes
                  </div>
                  <div className="flex gap-2">
                    {["2-3Y", "4-5Y", "6-7Y"].map((size) => (
                      <span
                        key={size}
                        className="px-3 py-1 bg-brand-bg border border-gray-200/60 rounded-lg text-xs font-medium text-brand-text"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button className="w-full py-3 bg-brand-text hover:bg-brand-text/90 text-white rounded-xl text-sm font-semibold transition-colors">
                Add to Quote
              </button>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col sm:flex-row"
          >
            <div className="sm:w-1/2 relative min-h-[300px] overflow-hidden bg-gray-50">
              <Image
                alt="Casual Wear Set"
                src="/casual-wear.png"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="sm:w-1/2 p-8 flex flex-col justify-between bg-white">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                    Trending Style
                  </span>
                  <span className="text-brand-text/50 text-xs font-medium">
                    Min. 12 pcs
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-brand-text mb-2">
                  Casual Wear Set
                </h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-bold text-brand-text">₹350.00</span>
                </div>
                <p className="text-brand-text/60 text-sm leading-relaxed mb-8">
                  Designer casual sets crafted with breathable fabrics for all-day comfort and play.
                </p>
              </div>
              <button className="w-full py-3 bg-brand-text hover:bg-brand-text/90 text-white rounded-xl text-sm font-semibold transition-colors">
                View Bulk Price
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
