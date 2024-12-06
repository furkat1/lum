import { Box, Skeleton, Stack } from "@mui/material";

import { palette } from "@/config/palette";

export default function Loading() {
  return (
    <Stack
      sx={{
        minHeight: "calc(100vh - 170px)",
        alignItems: "center",
        position: "relative",
        background: `linear-gradient(0deg, #212121 0%, rgba(33, 33, 33, 0.00) 37.85%)`,
        marginBottom: "105px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 948,
        }}
      >
        <Skeleton width={458} height={86 / 0.7} sx={{ backgroundColor: palette.light_grey }} />
      </Box>

      <Stack
        sx={{
          maxWidth: 948,
          width: "100%",
        }}
      >
        <Skeleton width={950} height={36 / 0.7} sx={{ backgroundColor: palette.light_grey }} />
      </Stack>
      <Box
        sx={{
          width: "100%",
          paddingBottom: "178px",
          maxWidth: 948,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            paddingTop: 2,
          }}
        >
          <Skeleton width="100%" height={77 / 0.7} sx={{ backgroundColor: palette.light_grey }} />

          <Skeleton width={360} height={170 / 0.7} sx={{ backgroundColor: palette.light_grey }} />

          <Stack
            sx={{
              padding: "16px 136px",
              alignItems: "center",
              justifyContent: "center",
              borderTop: "1px solid rgba(119, 118, 118, 0.50)",
              background: "#212121",
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 110,
              "@media (max-width: 720px)": {
                padding: "16px 24px",
              },
            }}
          >
            <Skeleton width="100%" height={42 / 0.7} sx={{ backgroundColor: palette.light_grey }} />
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}
