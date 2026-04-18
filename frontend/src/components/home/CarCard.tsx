"use client";

import Link from "next/link";
import Image from "next/image";
import { Car } from "@/types";
import { Button } from "@/components/ui/button";

interface CarCardProps {
  car: Car;
  highlighted?: boolean;
  formattedPrice: string;
}

export default function CarCard({
  car,
  highlighted,
  formattedPrice,
}: CarCardProps) {
  return (
    <div
      className="flex flex-col rounded-xl border bg-white/2 transition-all duration-300"
      style={{
        borderColor: highlighted ? car.color : "rgba(255,255,255,0.07)",
        boxShadow: highlighted ? `0 0 40px ${car.color}22` : "none",
        background: highlighted
          ? `linear-gradient(145deg, ${car.color}0D, rgba(255,255,255,0.02))`
          : undefined,
      }}
    >
      {/* Header */}
      <div className="border-b border-white/5 p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">
              {car.type}
            </p>
            <h3 className="mt-1 font-serif text-xl font-light text-white">
              {car.name}
            </h3>
            <p className="mt-1 text-xs text-white/35">{car.tagline}</p>
          </div>
          {highlighted && (
            <span
              className="rounded px-2 py-1 text-[10px] tracking-wider border"
              style={{
                color: car.color,
                borderColor: `${car.color}44`,
                background: `${car.color}18`,
              }}
            >
              Featured
            </span>
          )}
        </div>

        {/* Car image */}
        <div
          className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-lg"
          style={{ background: `${car.color}08` }}
        >
          <Image
            src={car.imageUrl}
            alt={`${car.name} — ${car.type}`}
            fill
            className="object-contain p-3"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Specs grid */}
      <div className="grid grid-cols-2 gap-3 p-6 pb-4">
        {Object.entries(car.specs).map(([key, value]) => (
          <div key={key}>
            <p className="text-[10px] tracking-widest uppercase text-white/25 mb-0.5">
              {key}
            </p>
            <p className="text-sm font-medium text-white/75">{String(value)}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between px-6 pb-6">
        <span className="text-lg font-semibold" style={{ color: car.color }}>
          {formattedPrice}
        </span>
        <Button size="sm" variant="outline" asChild>
          <Link
            href={`/book-test-drive?model=${car.id}`}
            style={{ borderColor: `${car.color}44`, color: car.color }}
            className="hover:opacity-80"
          >
            Test Drive →
          </Link>
        </Button>
      </div>
    </div>
  );
}
