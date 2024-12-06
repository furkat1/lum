"use client";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { Box, styled } from "@mui/material";
import { ProductCardContent } from "@shared/components/Products";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import CirclesIcon from "@/app/assets/Circles.svg";
import { useLocalizationProvider } from "@/components/providers/localization-provider";
import { useMachineTypesProvider } from "@/components/providers/machine-types-provider";
import { APP_ROUTES } from "@/config/routes";
import { Product, ProductPicture } from "@/types/products";

import { getLobbyImg } from "../../helpers/get-lobby-img";
import { productToCardProps } from "../../helpers/product-to-card-props";

export type ProductCardProps = {
  product?: Product;
  recentlyPurchased?: boolean;
};

export const ProductCard: FC<ProductCardProps> = ({ product, recentlyPurchased }) => {
  const { language } = useLocalizationProvider();
  const { machineTypes } = useMachineTypesProvider();

  const getProductCardImage = (pictures?: ProductPicture[]) => {
    const image = getLobbyImg(pictures);
    return image ? (
      <Image
        src={image}
        alt="Product image"
        width={164}
        height={220}
        style={{
          objectFit: "cover",
        }}
      />
    ) : (
      <EmptyIconContainer>
        <ImageNotSupportedOutlinedIcon fontSize="large" />
      </EmptyIconContainer>
    );
  };

  const cardContent = (
    <Box key={product?.uuid}>
      <ProductCardContent
        {...productToCardProps(product, language, machineTypes)}
        productImage={getProductCardImage(product?.pictures)}
        circlePointsIcon={<Image src={CirclesIcon} width={14} height={14} alt="Circle points" />}
        customSxStyles={{
          cardContent: {
            margin: 0,
            width: 360,
            height: 220,
          },
        }}
      />
    </Box>
  );

  return recentlyPurchased ? (
    cardContent
  ) : (
    <Link href={`${APP_ROUTES.PRODUCT}/${product?.uuid}`}>{cardContent}</Link>
  );
};

const EmptyIconContainer = styled(Box)(() => ({
  width: 146.25,
  height: 220,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
