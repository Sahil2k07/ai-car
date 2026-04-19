"use client";

import { useEffect, useState } from "react";
import { Car } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Minus } from "lucide-react";

interface ComparisonProps {
  initialModelIds?: string[];
  formatPrice: (usd: number) => string;
  cars: Car[];
}

const SPEC_LABELS: Record<string, string> = {
  range: "Range",
  acceleration: "0–100 km/h",
  topSpeed: "Top Speed",
  seats: "Seats",
};

export default function Comparison({
  cars,
  initialModelIds = [],
  formatPrice,
}: ComparisonProps) {
  const [carA, setCarA] = useState<Car | null>(null);
  const [carB, setCarB] = useState<Car | null>(null);
  useEffect(() => {
    const getInitialCar = (index: number) => {
      const id = initialModelIds[index];
      return cars.find((c) => c.id === id) ?? null;
    };

    setCarA(getInitialCar(0));
    setCarB(getInitialCar(1));
  }, [initialModelIds.join(","), cars]);

  const handleSelectA = (id: string) => {
    setCarA(cars.find((c) => c.id === id) ?? null);
  };

  const handleSelectB = (id: string) => {
    setCarB(cars.find((c) => c.id === id) ?? null);
  };

  return (
    <section id="comparison" className="bg-aether-surface px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-[11px] tracking-[0.25em] uppercase text-gold/70">
            Side by Side
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-white">
            Compare Models
          </h2>
        </div>

        {/* Model selectors */}
        <div className="mb-10 grid grid-cols-2 gap-6">
          <div>
            <p className="mb-2 text-[10px] tracking-widest uppercase text-white/30">
              Model A
            </p>
            <Select value={carA?.id ?? ""} onValueChange={handleSelectA}>
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {cars.map((car) => (
                  <SelectItem key={car.id} value={car.id}>
                    {car.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="mb-2 text-[10px] tracking-widest uppercase text-white/30">
              Model B
            </p>
            <Select value={carB?.id ?? ""} onValueChange={handleSelectB}>
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {cars.map((car) => (
                  <SelectItem key={car.id} value={car.id}>
                    {car.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-hidden rounded-xl border border-white/7">
          {/* Car names */}
          <div className="grid grid-cols-3 border-b border-white/7 bg-white/2">
            <div className="px-6 py-4" />
            {[carA, carB].map((car, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-6 py-4 border-l border-white/7"
              >
                {car ? (
                  <>
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: car.color }}
                    />
                    <span className="font-serif text-base text-white">
                      {car.name}
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-white/20">—</span>
                )}
              </div>
            ))}
          </div>

          {/* Price row */}
          <ComparisonRow
            label="Starting Price"
            a={carA ? formatPrice(carA.priceUSD) : null}
            b={carB ? formatPrice(carB.priceUSD) : null}
          />

          {/* Type */}
          <ComparisonRow
            label="Body Type"
            a={carA?.type ?? null}
            b={carB?.type ?? null}
            shaded
          />

          {/* Specs */}
          {Object.entries(SPEC_LABELS).map(([key, label], i) => (
            <ComparisonRow
              key={key}
              label={label}
              a={
                carA ? String(carA.specs[key as keyof typeof carA.specs]) : null
              }
              b={
                carB ? String(carB.specs[key as keyof typeof carB.specs]) : null
              }
              shaded={i % 2 === 0}
            />
          ))}

          {/* Features comparison */}
          {Array.from({ length: 4 }).map((_, i) => {
            const featureA = carA?.features[i];
            const featureB = carB?.features[i];
            if (!featureA && !featureB) return null;
            return (
              <div
                key={i}
                className={`grid grid-cols-3 border-t border-white/5 ${i % 2 !== 0 ? "bg-white/1.5" : ""}`}
              >
                <div className="px-6 py-3 text-xs text-white/35">
                  {`Feature ${i + 1}`}
                </div>
                {[featureA, featureB].map((feature, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-2 border-l border-white/5 px-6 py-3 text-sm text-white/60"
                  >
                    {feature ? (
                      <>
                        <Check size={12} className="text-gold shrink-0" />
                        {feature}
                      </>
                    ) : (
                      <Minus size={12} className="text-white/20" />
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface ComparisonRowProps {
  label: string;
  a: string | null;
  b: string | null;
  shaded?: boolean;
}

function ComparisonRow({ label, a, b, shaded }: ComparisonRowProps) {
  return (
    <div
      className={`grid grid-cols-3 border-t border-white/5 ${shaded ? "bg-white/1.5" : ""}`}
    >
      <div className="px-6 py-3 text-xs text-white/35">{label}</div>
      {[a, b].map((val, i) => (
        <div
          key={i}
          className="border-l border-white/5 px-6 py-3 text-sm text-white/70"
        >
          {val ?? <Minus size={12} className="text-white/20" />}
        </div>
      ))}
    </div>
  );
}
