import { Car, CarType } from "@/types";

interface FilterOptions {
  type?: string;
  maxPrice?: number;
}

class CarService {
  private readonly API_URL: string =
    process.env.API_URL || "http://localhost:8000";

  async getCars(): Promise<Car[]> {
    const response = await fetch(`${this.API_URL}/api/public/car`);

    if (!response.ok) {
      throw new Error("api responded with error");
    }

    const data = await response.json();
    return data;
  }

  async getCarById(id: string): Promise<Car | null> {
    const cars = await this.getCars();
    const car = cars.find((c) => c.id === id) ?? null;
    return car;
  }

  async filterCars(options: FilterOptions = {}): Promise<Car[]> {
    let results = await this.getCars();

    if (options.type) {
      results = results.filter(
        (c) => c.type.toLowerCase() === options.type!.toLowerCase(),
      );
    }

    if (options.maxPrice) {
      results = results.filter((c) => c.priceUSD <= options.maxPrice!);
    }

    return Promise.resolve(results);
  }

  async getCarTypes(): Promise<CarType[]> {
    return Promise.resolve(["Sedan", "SUV", "Coupe"]);
  }
}

export default new CarService();
