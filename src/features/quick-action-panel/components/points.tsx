import { Box, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { Suspense } from "react";

import { getPoints } from "@/api/points/GET.points";
import { palette } from "@/config/palette";

export const Points = async ({ userId }: { userId: string }) => {
  const points = await getPoints(userId);
  const numberFormat = new Intl.NumberFormat("en-US");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "fit-content",
        height: "41px",
        background: palette.bg_dark,
        marginRight: "auto",
        padding: "1px 15px",
        borderRadius: "6px",
      }}
    >
      <Suspense fallback={<PointsLoading />}>
        <Typography sx={{ margin: "auto 10px 4px 0", fontSize: "18px", fontWeight: "700" }}>
          {numberFormat.format(points.cachedBalance)}
        </Typography>
        <Image alt="points logo" src="/images/points-logo.png" width={102} height={30}></Image>
        <Typography sx={{ margin: "auto 0 4px 6px", fontSize: "20px" }}>Points</Typography>
      </Suspense>
    </Box>
  );
};

const PointsLoading = () => {
  return <Skeleton variant="text" width={252} />;
};
