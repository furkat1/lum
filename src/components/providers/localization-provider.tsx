"use client";

import { createContext, useContext } from "react";

export const LocalizationContext = createContext<{
  countryCode?: string;
  language?: string;
  currency?: string;
}>({
  countryCode: "USA",
  language: "en",
  currency: "USD",
});

type LocalizationContextProps = {
  countryCode?: string;
  language?: string;
  currency?: string;
  locale?: string;
  children: React.ReactNode;
};

export const LocalizationProvider = ({
  countryCode = "USA",
  language = "en",
  currency = "USD",
  children,
}: LocalizationContextProps) => {
  return (
    <LocalizationContext.Provider
      value={{
        countryCode,
        language,
        currency,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalizationProvider = () => {
  const context = useContext(LocalizationContext);

  if (!context) {
    throw new Error("useLocalizationProvider must be used within a LocalizationProvider");
  }

  return context;
};
