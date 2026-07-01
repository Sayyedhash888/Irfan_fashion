import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md border-b border-gray-200/50"></div>
      <div className="container mx-auto px-6 h-20 relative flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-brand-text">
          IF Fashion.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-text/80">
          <Link href="#collections" className="hover:text-brand-text transition-colors">
            Collections
          </Link>
          <Link href="#fabrics" className="hover:text-brand-text transition-colors">
            Fabrics
          </Link>
          <Link href="#wholesale" className="hover:text-brand-text transition-colors">
            Wholesale
          </Link>
          <Link href="#about" className="hover:text-brand-text transition-colors">
            About
          </Link>
        </nav>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link
            href="#partner"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-brand-text rounded-full shadow-[0_4px_14px_0_rgba(30,41,59,0.39)] hover:shadow-[0_6px_20px_rgba(30,41,59,0.23)] hover:bg-brand-text/90 transition-all duration-200"
          >
            Become a Partner
          </Link>
          <button className="md:hidden p-2 text-brand-text">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
