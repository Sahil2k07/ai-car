"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function Hero({
  title = "Drive the Future.",
  subtitle = "Four extraordinary electric vehicles. One uncompromising vision. Welcome to Aether Motors.",
}: HeroProps) {
  const scrollToModels = () => {
    document.getElementById("models")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-aether-bg px-6 pt-20 text-center"
    >
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,169,110,0.08)_0%,transparent_65%)]" />

      <div className="relative flex flex-col items-center">
        <p className="mb-6 text-[11px] tracking-[0.3em] text-gold/70">
          ELECTRIC LUXURY REDEFINED
        </p>

        <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] font-light leading-[1.05] tracking-tight text-white">
          {title.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="bg-linear-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
            {title.split(" ").at(-1)}
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed text-white/45">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" onClick={scrollToModels}>
            Explore Models
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/book-test-drive">Book Test Drive</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToModels}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-gold/40 hover:text-gold/70 transition-colors"
        aria-label="Scroll to models"
      >
        <div className="h-12 w-px bg-linear-to-b from-gold/60 to-transparent" />
        <ArrowDown size={14} />
      </button>
    </section>
  );
}
