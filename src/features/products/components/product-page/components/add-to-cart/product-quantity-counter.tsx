import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import { palette } from "@/config/palette";

export type ProductQuantityCounterProps = {
  minAmount?: number | null;
  productCount?: number;
  setProductCount?: React.Dispatch<React.SetStateAction<number>>;
};

export const ProductQuantityCounter = (props: ProductQuantityCounterProps) => {
  const { minAmount, productCount = 1, setProductCount } = props;

  const [minValue, setMinValue] = useState(1);

  useEffect(() => {
    if (minAmount && minAmount !== minValue) {
      setMinValue(minAmount);
      setProductCount?.(minAmount);
    }
  }, [minAmount]);

  const decrementValue = () => {
    setProductCount?.((v) => (v === minValue ? minValue : v - 1));
  };

  const incrementValue = () => {
    setProductCount?.((v) => v + 1);
  };

  const decrementDisabled = productCount === minValue;

  return (
    <Box sx={styles.CounterContainer}>
      <Button
        sx={styles.MinusButton}
        disabled={decrementDisabled}
        onClick={decrementValue}
        disableRipple
      >
        -
      </Button>

      <Box sx={styles.CounterValue}>{productCount}</Box>

      <Button sx={styles.PlusButton} onClick={incrementValue} disableRipple>
        <Box sx={{ transform: "translateY(-1px)" }}>+</Box>
      </Button>
    </Box>
  );
};

const styles = {
  CounterContainer: {
    display: "flex",
    backgroundColor: palette.grey,
    width: 123,
    borderRadius: 5,
  },
  MinusButton: {
    fontFamily: "Nunito, sans-serif",
    backgroundColor: palette.grey,
    color: palette.white,
    flex: 1,
    minWidth: 30,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    height: 42,
    fontSize: 20,
    lineHeight: "42px",
    width: "33%",

    "&:disabled": {
      backgroundColor: "#514d4d",
    },
  },
  CounterValue: {
    fontFamily: "Nunito, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: palette.white,
    flex: 1,
    fontSize: 18,
    fontWeight: 400,
    width: "34%",
  },
  PlusButton: {
    fontFamily: "Nunito, sans-serif",
    backgroundColor: palette.grey,
    color: palette.white,
    flex: 1,
    minWidth: 42,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: 42,
    fontSize: 20,
    lineHeight: "42px",
    width: "33%",

    "&:disabled": {
      color: palette.white,
    },
  },
};
