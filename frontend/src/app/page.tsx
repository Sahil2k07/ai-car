"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import Hero from "@/components/home/Hero";
import Models from "@/components/home/Models";
import Features from "@/components/home/Features";
import Comparison from "@/components/home/Comparison";
import Pricing from "@/components/home/Pricing";

import carService from "@/services/carService";
import { useCurrency } from "@/hooks/useCurrency";
import { Car, CurrencyCode } from "@/types";

function HomeContent() {
  const searchParams = useSearchParams();

  const typeParam = searchParams.get("type") ?? undefined;
  const maxPriceParam = searchParams.get("maxPrice") ?? undefined;
  const modelsParam = searchParams.get("models") ?? undefined;
  const highlightParam = searchParams.get("highlight") ?? undefined;
  const currencyParam = (searchParams.get("currency") as CurrencyCode) ?? "USD";

  const [allCars, setAllCars] = useState<Car[]>([]);
  const [cars, setCars] = useState<Car[]>([]);

  const { currency, setCurrency, format } = useCurrency(currencyParam);

  useEffect(() => {
    carService.getCars().then((data) => {
      setAllCars(data);
      setCars(data);
    });
  }, []);

  useEffect(() => {
    let results = [...allCars];

    if (typeParam) {
      results = results.filter(
        (c) => c.type.toLowerCase() === typeParam.toLowerCase(),
      );
    }

    if (maxPriceParam) {
      results = results.filter((c) => c.priceUSD <= Number(maxPriceParam));
    }

    setCars(results);
  }, [typeParam, maxPriceParam, allCars]);

  useEffect(() => {
    if (currencyParam) {
      setCurrency(currencyParam);
    }
  }, [currencyParam, setCurrency]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [searchParams.toString()]);

  const comparisonModelIds = modelsParam
    ? modelsParam.split(",").map((id) => id.trim())
    : [];

  return (
    <>
      <Hero />
      <Models cars={cars} highlightedId={highlightParam} formatPrice={format} />
      <Features />
      <Comparison
        cars={allCars}
        initialModelIds={comparisonModelIds}
        formatPrice={format}
      />
      <Pricing
        cars={cars}
        currency={currency}
        onCurrencyChange={setCurrency}
        formatPrice={format}
      />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-aether-bg" />}>
      <HomeContent />
    </Suspense>
  );
}
