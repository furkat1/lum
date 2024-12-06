import { Box } from "@mui/material";

import { ProductCardSkeleton } from "../product-card";

export const ProductsGridSkeleton = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", rowGap: 8, columnGap: 4 }}>
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </Box>
  );
};
