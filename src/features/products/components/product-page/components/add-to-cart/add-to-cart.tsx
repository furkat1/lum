"use client";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { putOrder } from "@/api/orders/PUT.orders-by-id.item-id";
import { useLocalizationProvider } from "@/components/providers/localization-provider";
import { SubscriptionModal } from "@/components/ui/autoshipment-confirmation";
import { palette } from "@/config/palette";
import { AddToCartModal } from "@/features/products/components/product-page/components/add-to-cart/add-to-cart-modal";
import { useMutation } from "@/hooks/useMutation";
import { translate } from "@/lib/language";
import { getPriceString } from "@/lib/price";
import { Product } from "@/types/products";

import { cartIcon } from "./cart-Icon";
import { CirclePointsBlock } from "./circle-points-block";
import { ProductQuantityCounter } from "./product-quantity-counter";

interface Props {
  product: Product | null;
}

export const AddToCart = ({ product }: Props) => {
  const { currency, countryCode } = useLocalizationProvider();
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState<boolean>(false);
  const [productCount, setProductCount] = useState<number>(1);
  const [isAutoshipment, setIsAutoshipment] = useState<boolean>(false);
  const [autoshipmentConfirmationOpen, setAutoshipmentConfirmationOpen] = useState<boolean>(false);

  const {
    data,
    error,
    isLoading,
    mutation: handleAddToCart,
  } = useMutation({
    fetchFn: putOrder,
  });

  useEffect(() => {
    if (data || error) {
      setIsAddToCartModalOpen(true);
    }
  }, [data, error]);

  const handleCloseAutoshipmentConfirmation = () => setAutoshipmentConfirmationOpen(false);

  const handleConfirmAutoshipment = () => {
    setAutoshipmentConfirmationOpen(false);
    setIsAutoshipment(true);
  };

  const handleChangeAutoshipment = () => {
    if (isAutoshipment) {
      setIsAutoshipment(false);
      return;
    }
    setAutoshipmentConfirmationOpen(true);
  };

  const onAddToCart = () => {
    if (product?.uuid) {
      handleAddToCart({
        orderId: "cart",
        itemId: product.uuid,
        orderData: { quantity: productCount, autoshipment: isAutoshipment },
      });
    }
  };

  return (
    <Box sx={{ ...styles.Footer }}>
      <Stack sx={{ ...styles.PriceContainer }}>
        <Typography sx={{ ...styles.ProductPrice }}>
          {getPriceString(product?.prices?.[0], currency, countryCode)}
        </Typography>

        {product?.pricesBeforeDiscount && (
          <Typography sx={{ ...styles.ProductOldPrice }}>
            {getPriceString(product.pricesBeforeDiscount?.[0], currency, countryCode)}
          </Typography>
        )}
      </Stack>

      <Box sx={{ ...styles.AutoshipmentContainer }}>
        {product?.autoShipmentInfo?.available && (
          <Stack
            sx={{ ...styles.FormControlWrapper }}
            direction={"row"}
            alignItems={"center"}
            gap={"9px"}
          >
            <Box
              sx={{ ...styles.CheckboxDiv }}
              className={isAutoshipment ? " checked" : ""}
              onClick={handleChangeAutoshipment}
            ></Box>
            <Typography sx={{ ...styles.FormControlLabel }}>
              {translate(product?.autoShipmentInfo?.text) ||
                "Autoshipment - save up to 25% per unit, minimum order 3 packs"}
            </Typography>
          </Stack>
        )}
      </Box>

      <Stack direction="row" gap={2} justifyContent="space-between">
        <ProductQuantityCounter
          minAmount={isAutoshipment ? product?.autoShipmentInfo?.minAmount : 1}
          productCount={productCount}
          setProductCount={setProductCount}
        />

        {isLoading ? (
          <Stack justifyContent={"center"} sx={{ minWidth: "200px" }}>
            <CircularProgress />
          </Stack>
        ) : (
          <Button
            sx={{ ...styles.AddToCartButton }}
            endIcon={cartIcon}
            color="primary"
            variant="contained"
            onClick={onAddToCart}
          >
            Add to cart
          </Button>
        )}
      </Stack>

      <Box sx={{ ...styles.CirclePointsContainer }}>
        <CirclePointsBlock circlePoints={product?.circlePoints} />
      </Box>

      <SubscriptionModal
        open={autoshipmentConfirmationOpen}
        handleClose={handleCloseAutoshipmentConfirmation}
        handleConfirm={handleConfirmAutoshipment}
      />
      <AddToCartModal
        isOpen={isAddToCartModalOpen}
        setIsOpen={setIsAddToCartModalOpen}
        isError={Boolean(error)}
      />
    </Box>
  );
};

const styles = {
  Footer: {
    borderRadius: "18px",
    backgroundColor: palette.dark_grey,
    padding: "18px",
    position: "relative",
    borderBottomRightRadius: {
      xs: 0,
      sm: "18px",
    },
    borderBottomLeftRadius: {
      xs: 0,
      sm: "18px",
    },
  },
  PriceContainer: {
    flexDirection: "row",
    gap: "16px",
    alignItems: "flex-end",
    marginBottom: "10px",
  },
  ProductPrice: {
    fontFamily: "Nunito, sans-serif",
    color: palette.white,
    fontSize: 24,
    lineHeight: "26px",
    fontWeight: 700,
  },
  ProductOldPrice: {
    fontFamily: "Nunito, sans-serif",
    color: palette.white,
    textDecoration: "line-through",
    fontSize: 14,
    lineHeight: "23px",
  },
  AutoshipmentContainer: {
    minHeight: 10,
  },
  FormControlWrapper: {
    color: palette.white,
    marginBottom: "14px",
  },
  FormControlLabel: {
    fontFamily: "Nunito, sans-serif",
    color: palette.white,
    fontSize: 16,
    lineHeight: "1.25rem",
    wordBreak: "break-all",
  },
  CheckboxDiv: {
    margin: "0 10px auto 0",

    "&::before": {
      content: '""',
      display: "block",
      width: "23px",
      height: "23px",
      borderRadius: "4px",
      border: "1px solid #fff",
      boxSizing: "border-box",
    },

    "&.checked": {
      "&::before": {
        backgroundColor: palette.primary_main,
        backgroundSize: "50%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e")`,
      },
    },
  },
  CirclePointsContainer: {
    position: "absolute",
    top: 0,
    right: 18,
  },
  AddToCartButton: {
    borderRadius: "5px",
    fontFamily: "Nunito, sans-serif",
    height: 42,
    color: palette.white,
    textTransform: "none",
    justifyContent: "center",
    display: "flex",
    fontWeight: 400,
    minWidth: 167,
    fontSize: 18,
    paddingX: {
      sm: "100px",
      xs: '15px"',
    },
  },
};
