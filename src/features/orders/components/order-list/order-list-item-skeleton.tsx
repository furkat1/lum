import { alpha, Skeleton } from "@mui/material";

import { palette } from "@/config/palette";

export const OrderListItemSkeleton = () => {
  return (
    <Skeleton
      width={345}
      height={143}
      sx={{
        borderRadius: "6px",
        bgcolor: alpha(palette.primary_light, 0.3),
      }}
      animation="pulse"
      variant="rectangular"
    />
  );
};
