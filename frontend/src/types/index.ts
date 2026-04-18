export type CarType = "Sedan" | "SUV" | "Coupe";

export interface CarSpecs {
  range: string;
  acceleration: string;
  topSpeed: string;
  seats: number;
}

export interface Car {
  id: string;
  name: string;
  type: CarType;
  tagline: string;
  priceUSD: number;
  color: string;
  imageUrl: string;
  specs: CarSpecs;
  features: string[];
}

export type CurrencyCode = "USD" | "INR" | "EUR" | "GBP";

export interface CurrencyOption {
  symbol: string;
  rate: number;
  label: CurrencyCode;
}

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
}

export interface AiResponse {
  userMessage: string;
  systemMessage: string;
}

export interface HomePageParams {
  type?: string;
  maxPrice?: string;
  models?: string;
  highlight?: string;
  currency?: CurrencyCode;
}

export interface BookingPageParams {
  model?: string;
  city?: string;
  date?: string;
}
