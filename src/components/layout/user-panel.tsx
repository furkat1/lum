import { Box } from "@mui/material";
import { Suspense } from "react";

import { palette } from "@/config/palette";
import { IntegratedMessages } from "@/features/integrated-messages/integrated-messages";
import {
  QuickActionsPanel,
  QuickActionsPanelLoading,
} from "@/features/quick-action-panel/components/quick-actions-panel";
import { getSession } from "@/lib/auth";

import { MaxWidthContainer } from "./max-width-container";

export const UserPanel = async () => {
  const { userId } = await getSession();

  if (!userId) {
    return;
  }

  return (
    <Box sx={{ background: palette.black, padding: "18px 0" }}>
      <MaxWidthContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: 2,
        }}
      >
        <Suspense fallback={<QuickActionsPanelLoading />}>
          <QuickActionsPanel userId={userId} />
        </Suspense>

        <Box sx={{ marginLeft: "auto" }}>
          <IntegratedMessages />
        </Box>
      </MaxWidthContainer>
    </Box>
  );
};
