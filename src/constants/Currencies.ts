export enum Currencies {
  USD = "USD",
  CAD = "CAD",
  CHF = "CHF",
}

export const CurrenciesData = {
  [Currencies.USD]: {
    code: Currencies.USD,
    sign: "$",
  } as const,
  [Currencies.CAD]: {
    code: Currencies.CAD,
    sign: "$",
  } as const,
  [Currencies.CHF]: {
    code: Currencies.CHF,
    sign: "₣",
  } as const,
};
