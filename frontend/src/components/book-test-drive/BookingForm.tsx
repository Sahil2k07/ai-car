"use client";

import { useEffect, useState } from "react";
import { BookingPageParams, Car } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";
import carService from "@/services/carService";

const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Kochi",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
];

interface BookingFormProps {
  prefill: BookingPageParams;
}

interface FormState {
  model: string;
  city: string;
  date: string;
  name: string;
  email: string;
  phone: string;
}

export default function BookingForm({ prefill }: BookingFormProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<FormState>({
    model: prefill.model ?? "",
    city: prefill.city ?? "",
    date: prefill.date ?? "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      model: prefill.model ?? "",
      city: prefill.city ?? "",
      date: prefill.date ?? "",
    }));
  }, [prefill.model, prefill.city, prefill.date]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await carService.getCars();
        setCars(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCars();
  }, []);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[BookingForm] Submitted:", form);
    setSubmitted(true);
  };

  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const minDate = today.toISOString().split("T")[0];

  const isValidModel = cars.some((c) => c.id === form.model);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
        <CheckCircle size={48} className="text-gold" />
        <h3 className="font-serif text-2xl font-light text-white">
          Request Received
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-white/45">
          Thank you! An Aether specialist will contact you within 24 hours to
          confirm your test drive appointment.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Book Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Personal details */}
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 text-[10px] tracking-[0.2em] uppercase text-gold/60">
          Your Details
        </legend>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            placeholder="Arjun Mehta"
            required
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="arjun@example.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
        </div>
      </fieldset>

      {/* Booking details */}
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 text-[10px] tracking-[0.2em] uppercase text-gold/60">
          Test Drive Details
        </legend>

        {/* Model */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="model">Vehicle model</Label>
          <Select
            value={isValidModel ? form.model : ""}
            onValueChange={(v) => handleChange("model", v)}
            required
          >
            <SelectTrigger id="model">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {cars.map((car) => (
                <SelectItem key={car.id} value={car.id}>
                  {car.name} — {car.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* City */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="city">Preferred city</Label>
            <Select
              value={form.city}
              required
              onValueChange={(v) => handleChange("city", v)}
            >
              <SelectTrigger id="city">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="date">Preferred date</Label>
            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              min={minDate}
              required
            />
          </div>
        </div>
      </fieldset>

      <Button type="submit" size="lg" className="mt-2 self-start">
        Confirm Request
      </Button>
    </form>
  );
}
