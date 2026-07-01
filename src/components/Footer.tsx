"use client";

import { MapPin, User, Phone, Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="about" className="bg-brand-text text-white/80 border-t border-white/5 relative z-20">
      <div className="container mx-auto px-6 max-w-6xl py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="text-2xl font-bold tracking-tight text-white">
              IF Enterprises
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Premium Kidswear Wholesale. Elevating Indian retail businesses with international quality standards.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all border border-white/10"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@ifenterprises.com"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all border border-white/10"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold uppercase tracking-wider text-xs mb-6">
              Navigation
            </h5>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Catalog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h5 className="text-white font-semibold uppercase tracking-wider text-xs mb-6">
              Partner Center
            </h5>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Bulk Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-white font-semibold uppercase tracking-wider text-xs mb-6">
              Warehouse Office
            </h5>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-accent shrink-0" />
                <span>Ladnun, Rajasthan, India</span>
              </li>
              <li className="flex items-center gap-3">
                <User className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Owner: Irfan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                <span>+91 9587996994</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© 2026 IF Enterprises. All rights reserved. Premium Kidswear Wholesale.</p>
          <p className="flex items-center gap-2">
            Developed by{" "}
            <span className="text-brand-accent font-bold tracking-wider uppercase text-[10px]">
              Hashir
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
