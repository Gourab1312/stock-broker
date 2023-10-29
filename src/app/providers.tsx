"use client";
import { StockDataProvider } from "@/contexts/StockDataContext";

export function Providers({ children } : any) {
  return <StockDataProvider>{children}</StockDataProvider>;
}

export default Providers;
