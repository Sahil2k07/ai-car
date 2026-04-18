"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookingForm from "@/components/book-test-drive/BookingForm";
import { BookingPageParams } from "@/types";
import { CalendarDays } from "lucide-react";

function BookingContent() {
  const searchParams = useSearchParams();

  const prefill: BookingPageParams = {
    model: searchParams.get("model") ?? undefined,
    city: searchParams.get("city") ?? undefined,
    date: searchParams.get("date") ?? undefined,
  };

  const hasPrefill = Object.values(prefill).some(Boolean);

  return (
    <div className="mx-auto max-w-2xl px-6 py-32">
      {/* Page header */}
      <div className="mb-12">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
          <CalendarDays size={22} className="text-gold" />
        </div>
        <p className="mb-2 text-[11px] tracking-[0.25em] uppercase text-gold/70">
          Experience Aether
        </p>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-light text-white">
          Book a Test Drive
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/40">
          Schedule a private test drive at your nearest Aether showroom. Our
          specialist will guide you through every detail.
        </p>

        {hasPrefill && (
          <div className="mt-5 rounded-lg border border-gold/20 bg-gold/5 px-4 py-3 text-xs text-gold/70">
            Some fields have been pre-filled based on your selection.
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="mb-10 h-px bg-linear-to-r from-gold/20 via-white/5 to-transparent" />

      <BookingForm prefill={prefill} />
    </div>
  );
}

export default function BookTestDrivePage() {
  return (
    <div className="min-h-screen bg-aether-bg pt-17">
      <Suspense fallback={<div className="min-h-screen bg-aether-bg" />}>
        <BookingContent />
      </Suspense>
    </div>
  );
}
