import Link from "next/link";
import { CARS } from "@/services/carService";

const FOOTER_LINKS = {
  Vehicles: CARS.map((car) => ({ label: car.name, href: "/#models" })),
  Explore: [
    { label: "Book Test Drive", href: "/book-test-drive" },
    { label: "Contact Us", href: "/contact" },
    { label: "Compare Models", href: "/#comparison" },
    { label: "Pricing", href: "/#pricing" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050508] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="font-serif text-2xl font-bold tracking-[0.12em] text-gold mb-4">
              AETHER MOTORS
            </div>
            <p className="text-sm text-white/35 leading-relaxed max-w-sm">
              Redefining electric luxury. Every vehicle is crafted for those who
              demand the extraordinary — in performance, design, and conscience.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">
                {title}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 hover:text-white/75 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/20">
          <span>© 2026 Aether Motors. All rights reserved.</span>
          <span>Designed for those who dream forward.</span>
        </div>
      </div>
    </footer>
  );
}
