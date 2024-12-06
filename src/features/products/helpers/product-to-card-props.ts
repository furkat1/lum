import { translate } from "@/lib/language";
import { MachineType } from "@/types";
import type { Product } from "@/types/products";

import type { ProductCardProps } from "../types";

export const productToCardProps = (
  product?: Product,
  language?: string,
  machineTypes?: MachineType[],
): ProductCardProps => {
  const machineTypeName =
    machineTypes?.find((machineType) => machineType.uuid === product?.relatedMachineTypes[0])
      ?.name || "";
  const price = product?.prices[0].price;
  const priceBefore = product?.pricesBeforeDiscount?.[0].price;
  const currency = product?.prices[0].currencyCode;

  return {
    machineTypeName,
    offerText: translate(product?.specialOffer, language),
    name: translate(product?.name, language),
    code: product?.code,
    price,
    priceBefore,
    currency,
    circlePoints: product?.circlePoints?.pointsTier1,
    unitsInPack: product?.unitsInPack,
  };
};
