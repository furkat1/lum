import { Box, Skeleton } from "@mui/material";

import { CartLink } from "./cart-link";
import { Greeting } from "./greeting";
import { OrdersLink } from "./orders-link";
import { Points } from "./points";
import { RequestsLink } from "./requests-link";

export const QuickActionsPanel = async ({ userId }: { userId: string }) => {
  return (
    <Box sx={{ minHeight: "170px" }}>
      <Box sx={{ width: "250px", margin: "auto 0" }}>
        <Greeting />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: 214,
            justifyContent: "space-between",
            marginTop: "35px;",
            marginBottom: "29px",
          }}
        >
          <CartLink />
          <OrdersLink userId={userId} />
          <RequestsLink userId={userId} />
        </Box>
        <Points userId={userId} />
      </Box>
    </Box>
  );
};

export const QuickActionsPanelLoading = () => {
  return <Skeleton variant="rectangular" sx={{ minWidth: 250 }} width={250} height={170} />;
};
