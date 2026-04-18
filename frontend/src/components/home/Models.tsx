"use client";

import { Car } from "@/types";
import CarCard from "@/components/home/CarCard";

interface ModelsProps {
  cars: Car[];
  highlightedId?: string;
  formatPrice: (usd: number) => string;
}

export default function Models({
  cars,
  highlightedId,
  formatPrice,
}: ModelsProps) {
  const totalCars = cars.length;
  const isFiltered = cars.length < totalCars;

  return (
    <section id="models" className="bg-aether-bg px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-[11px] tracking-[0.25em] uppercase text-gold/70">
              Our Vehicles
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-white">
              Choose Your Aether
            </h2>
          </div>

          {isFiltered && (
            <div className="rounded-full border border-gold/25 bg-gold/8 px-4 py-1.5 text-xs text-gold">
              Showing {cars.length} of {totalCars} models
            </div>
          )}
        </div>

        {/* Grid */}
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                highlighted={highlightedId === car.id}
                formattedPrice={formatPrice(car.priceUSD)}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-white/30">
            No models match the current filter criteria.
          </div>
        )}
      </div>
    </section>
  );
}
