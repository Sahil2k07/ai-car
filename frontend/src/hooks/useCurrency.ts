import { useCallback, useState } from "react";
import { CurrencyCode, CurrencyOption } from "@/types";

export const CURRENCIES: Record<CurrencyCode, CurrencyOption> = {
  USD: { symbol: "$", rate: 1, label: "USD" },
  INR: { symbol: "₹", rate: 83.5, label: "INR" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP" },
};

export function useCurrency(initial: CurrencyCode = "USD") {
  const [currency, setCurrency] = useState<CurrencyCode>(initial);

  const format = useCallback(
    (priceUSD: number): string => {
      const cur = CURRENCIES[currency];
      const converted = priceUSD * cur.rate;
      return `${cur.symbol}${converted.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      })}`;
    },
    [currency],
  );

  return { currency, setCurrency, format, currencies: CURRENCIES };
}
