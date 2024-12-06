import { Skeleton, Stack } from "@mui/material";

import { palette } from "@/config/palette";

export default function Loading() {
  return (
    <Stack
      sx={{
        minHeight: "calc(100vh - 170px)",
        alignItems: "center",
        position: "relative",
        background: palette.bg_pink,
        marginBottom: "105px",
      }}
    >
      <Skeleton
        width={76}
        height={76 / 0.6}
        animation={false}
        sx={{ backgroundColor: palette.pink_sceleton }}
      />

      <Skeleton
        width={826}
        height={36 / 0.6}
        animation={false}
        sx={{ backgroundColor: palette.pink_sceleton }}
      />

      <Skeleton
        width={948}
        height={101 / 0.6}
        animation={false}
        sx={{ backgroundColor: palette.pink_sceleton }}
      />

      <Skeleton
        width={330}
        height={210 / 0.6}
        animation={false}
        sx={{ backgroundColor: palette.pink_sceleton }}
      />

      <Skeleton
        width={948}
        height={151 / 0.6}
        animation={false}
        sx={{ backgroundColor: palette.pink_sceleton }}
      />

      <Stack
        sx={{
          padding: "16px 136px",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid rgba(119, 118, 118, 0.50)",
          background: palette.bg_pink,
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
        <Skeleton
          width="100%"
          height={42 / 0.7}
          animation={false}
          sx={{ backgroundColor: palette.pink_sceleton }}
        />
      </Stack>
    </Stack>
  );
}
