import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-aether-bg">
      {/* Main content — vertically and horizontally centered */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-[11px] tracking-[0.3em] uppercase text-gold/50">
          404 — Page Not Found
        </p>

        <h1 className="font-serif text-[clamp(4rem,12vw,9rem)] font-light leading-none text-white/8 select-none">
          404
        </h1>

        <h2 className="mt-4 font-serif text-2xl font-light text-white">
          This road doesn't exist.
        </h2>

        <p className="mt-3 max-w-sm text-sm text-white/35 leading-relaxed">
          The page you're looking for has moved, or perhaps never existed. Let
          us guide you back.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
