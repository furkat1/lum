import { GeoMonetaryValue, MonetaryValue, Nullable } from "@shared/types";

const Locales: { [key: string]: string } = {
  USA: "en-US",
  JPN: "ja-JP",
};

const DEFAULT_COUNTRY = "USA";

export const getPriceString = (
  priceObject?: Nullable<MonetaryValue> | Nullable<GeoMonetaryValue>,
  userCurrency?: string,
  userCountry?: string,
): string => {
  if (!priceObject || !priceObject.price || !priceObject.currencyCode) return "NA";

  if (userCountry && userCurrency) {
    return new Intl.NumberFormat(Locales[userCountry], {
      style: "currency",
      currency: userCurrency,
    }).format(priceObject.price);
  }

  return new Intl.NumberFormat(Locales[DEFAULT_COUNTRY], {
    style: "currency",
    currency: priceObject.currencyCode,
  }).format(priceObject.price);
};
