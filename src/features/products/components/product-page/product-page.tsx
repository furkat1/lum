import { Box, Stack } from "@mui/material";

import { getProduct } from "@/api/products/GET.product";
import { BackButton } from "@/components/ui/back-button";

import { ProductInfo } from "./components/product-info";

interface Props {
  productId: string;
}

export async function ProductPage({ productId }: Props) {
  const product = await getProduct(productId);

  return (
    <Stack
      sx={{
        gap: "27px",
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        paddingTop: { sm: "38px", xs: 0 },
      }}
      direction="column"
    >
      <Box sx={{ display: { sm: "block", xs: "none" } }}>
        <BackButton />
      </Box>

      <ProductInfo product={product} />
    </Stack>
  );
}
