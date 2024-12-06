import { Currencies, CurrenciesData } from "@/constants/Currencies";

export const getCurrencySign = (code?: Currencies) => {
  if (!code) {
    return "";
  }

  return CurrenciesData[code].sign;
};
