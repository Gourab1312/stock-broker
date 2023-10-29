import React, { createContext, useContext, ReactNode, useState } from "react";

interface StockDataContextType {
  cachedData: any; 
  setCachedData: React.Dispatch<React.SetStateAction<any>>;
}

const StockDataContext = createContext<StockDataContextType | undefined>(
  undefined
);

interface StockDataProviderProps {
  children: ReactNode;
}

export function StockDataProvider({ children }: StockDataProviderProps) {
  const [cachedData, setCachedData] = useState<any>({});

  return (
    <StockDataContext.Provider value={{ cachedData, setCachedData }}>
      {children}
    </StockDataContext.Provider>
  );
}

export function useStockData() {
  const context = useContext(StockDataContext);
  if (!context) {
    throw new Error("useStockData must be used within a StockDataProvider");
  }
  return context;
}
