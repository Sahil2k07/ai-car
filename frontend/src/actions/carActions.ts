"use server";

import { Car, CarType } from "@/types";

const API_URL: string = process.env.API_URL || "http://localhost:8000";

interface FilterOptions {
  type?: string;
  maxPrice?: number;
}

export const getCars = async (): Promise<Car[]> => {
  const response = await fetch(`${API_URL}/api/public/car`);

  if (!response.ok) {
    throw new Error("api responded with error");
  }

  const data = await response.json();
  return data;
};

export const getCarById = async (id: string): Promise<Car | null> => {
  const cars = await getCars();
  const car = cars.find((c) => c.id === id) ?? null;
  return car;
};

export const filterCars = async (
  options: FilterOptions = {},
): Promise<Car[]> => {
  let results = await getCars();

  if (options.type) {
    results = results.filter(
      (c) => c.type.toLowerCase() === options.type!.toLowerCase(),
    );
  }

  if (options.maxPrice) {
    results = results.filter((c) => c.priceUSD <= options.maxPrice!);
  }

  return Promise.resolve(results);
};

export const getCarTypes = async (): Promise<CarType[]> => {
  return Promise.resolve(["Sedan", "SUV", "Coupe"]);
};
