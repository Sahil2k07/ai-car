"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Models", href: "/#models" },
  { label: "Features", href: "/#features" },
  { label: "Compare", href: "/#comparison" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Book Test Drive", href: "/book-test-drive" },
  { label: "Contact", href: "/contact-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.includes("#")) return pathname === "/";
    return pathname === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#08080C]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="font-serif text-xl font-bold tracking-[0.12em] text-gold">
            AETHER
          </span>
          <span className="text-[10px] tracking-[0.2em] text-white/25 mt-0.5">
            MOTORS
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[13px] tracking-wide transition-colors ${
                  isActive(link.href)
                    ? "text-gold border-b border-gold pb-0.5"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden rounded border border-white/10 p-1.5 text-white/60 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#08080C] px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
