import { Box, Skeleton, Stack, Typography } from "@mui/material";

import { palette } from "@/config/palette";

export default function ClinicsMain() {
  return (
    <Stack gap={3} sx={{ transform: "translateY(-100px)" }}>
      <Box sx={{ background: palette.white, padding: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              variant="rectangular"
              sx={{ width: 350, height: 150, backgroundColor: palette.bg_clinics }}
              key={index}
              animation="wave"
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ background: palette.white, padding: 3 }}>
        <Typography
          sx={{
            fontSize: 28,
            lineHeight: "36px",
            color: palette.grey_50,
            marginBottom: 2,
          }}
        >
          Operation
        </Typography>

        <Skeleton
          variant="rectangular"
          height={574}
          width="100%"
          sx={{ backgroundColor: palette.bg_clinics }}
        />

        <Typography
          sx={{
            fontSize: 28,
            lineHeight: "36px",
            color: palette.grey_50,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          Business
        </Typography>

        <Skeleton
          variant="rectangular"
          height={380}
          width="100%"
          sx={{ backgroundColor: palette.bg_clinics }}
        />
      </Box>
    </Stack>
  );
}
