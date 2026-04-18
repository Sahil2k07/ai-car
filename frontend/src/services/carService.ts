import { Car, CarType } from "@/types";

const CARS: Car[] = [
  {
    id: "aether-one",
    name: "Aether One",
    type: "Sedan",
    tagline: "Grace in motion",
    priceUSD: 89000,
    color: "#C8A96E",
    imageUrl: "/default-image.png",
    specs: {
      range: "520 km",
      acceleration: "3.8s",
      topSpeed: "240 km/h",
      seats: 5,
    },
    features: [
      "Adaptive AI Suspension",
      "Panoramic Glass Roof",
      "Neural Drive Assist",
      "Ambient Interior Lighting",
    ],
  },
  {
    id: "aether-apex",
    name: "Aether Apex",
    type: "SUV",
    tagline: "Commanding every horizon",
    priceUSD: 124000,
    color: "#7BA7BC",
    imageUrl: "/default-image.png",
    specs: {
      range: "610 km",
      acceleration: "4.2s",
      topSpeed: "210 km/h",
      seats: 7,
    },
    features: [
      "Terrain Intelligence System",
      "Quad-Zone Climate",
      "Air Suspension",
      "Off-Road Mode",
    ],
  },
  {
    id: "aether-volta",
    name: "Aether Volta",
    type: "Coupe",
    tagline: "Pure electric soul",
    priceUSD: 156000,
    color: "#9B8DBF",
    imageUrl: "/default-image.png",
    specs: {
      range: "480 km",
      acceleration: "2.6s",
      topSpeed: "280 km/h",
      seats: 4,
    },
    features: [
      "Track Mode",
      "Carbon Fibre Body",
      "Magnetic Ride Control",
      "Launch Control",
    ],
  },
  {
    id: "aether-terra",
    name: "Aether Terra",
    type: "SUV",
    tagline: "Wilderness, refined",
    priceUSD: 108000,
    color: "#7BA885",
    imageUrl: "/default-image.png",
    specs: {
      range: "670 km",
      acceleration: "5.1s",
      topSpeed: "195 km/h",
      seats: 6,
    },
    features: [
      "Solar Roof Charging",
      "4WD Pro System",
      "Camp Mode",
      "Tow Assist 3500kg",
    ],
  },
];

export { CARS };

interface FilterOptions {
  type?: string;
  maxPrice?: number;
}

class CarService {
  async getCars(): Promise<Car[]> {
    return Promise.resolve(CARS);
  }

  async getCarById(id: string): Promise<Car | null> {
    const car = CARS.find((c) => c.id === id) ?? null;
    return Promise.resolve(car);
  }

  async filterCars(options: FilterOptions = {}): Promise<Car[]> {
    let results = [...CARS];

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
