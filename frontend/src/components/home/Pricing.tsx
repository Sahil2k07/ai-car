"use client";

import Link from "next/link";
import { Car } from "@/types";
import { CurrencyCode } from "@/types";
import { CURRENCIES } from "@/hooks/useCurrency";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";

const PLAN_FEATURES = [
  "Free home delivery",
  "5-year comprehensive warranty",
  "2 years complimentary servicing",
  "24/7 Aether Concierge",
  "Over-the-air lifetime updates",
];

interface PricingProps {
  cars: Car[];
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  formatPrice: (usd: number) => string;
}

export default function Pricing({
  cars,
  currency,
  onCurrencyChange,
  formatPrice,
}: PricingProps) {
  return (
    <section id="pricing" className="bg-aether-bg px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header + currency picker */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-[11px] tracking-[0.25em] uppercase text-gold/70">
              Transparent Pricing
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-white">
              Investment in Excellence
            </h2>
          </div>

          {/* Currency selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/30 tracking-widest">
              CURRENCY
            </span>
            <div className="w-36">
              <Select
                value={currency}
                onValueChange={(v) => onCurrencyChange(v as CurrencyCode)}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CURRENCIES).map(([code, opt]) => (
                    <SelectItem key={code} value={code}>
                      {opt.symbol} {code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cars.map((car, i) => {
            const isPopular = i === 1;
            return (
              <div
                key={car.id}
                className="flex flex-col rounded-xl border p-6 transition-colors"
                style={{
                  borderColor: isPopular ? car.color : "rgba(255,255,255,0.07)",
                  background: isPopular
                    ? `${car.color}08`
                    : "rgba(255,255,255,0.02)",
                }}
              >
                {isPopular && (
                  <div
                    className="mb-4 self-start rounded px-2 py-0.5 text-[10px] tracking-wider"
                    style={{
                      background: `${car.color}20`,
                      color: car.color,
                      border: `1px solid ${car.color}40`,
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}

                <div
                  className="mb-1 text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: car.color }}
                >
                  {car.type}
                </div>
                <h3 className="font-serif text-xl font-light text-white mb-4">
                  {car.name}
                </h3>

                <div className="mb-6">
                  <span className="text-3xl font-semibold text-white">
                    {formatPrice(car.priceUSD)}
                  </span>
                  <span className="ml-2 text-xs text-white/30">onwards</span>
                </div>

                <ul className="mb-8 flex flex-col gap-2.5">
                  {PLAN_FEATURES.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-xs text-white/50"
                    >
                      <Check
                        size={13}
                        className="mt-0.5 shrink-0"
                        style={{ color: car.color }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button
                    variant={isPopular ? "default" : "outline"}
                    className="w-full"
                    size="sm"
                    asChild
                  >
                    <Link href={`/book-test-drive?model=${car.id}`}>
                      Book Test Drive
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-xs text-white/25">
          All prices are indicative and subject to regional taxes. Contact us
          for customisation options and financing.
        </p>
      </div>
    </section>
  );
}
