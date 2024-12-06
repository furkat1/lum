import { Badge } from "@mui/material";
import Link from "next/link";

import { getOpenRequestsCount } from "@/api/service-requests/GET.open-requests";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { RequestsIcon } from "@/components/icon/icons/requests-icon";
import { APP_ROUTES } from "@/config/routes";

export const RequestsLink = async ({ userId }: { userId: string }) => {
  const requestsCount = await getOpenRequestsCount({ userIds: [userId] });
  return (
    <Badge badgeContent={requestsCount?.byUser[userId]} color="primary">
      <Link href={APP_ROUTES.SUPPORT_REQUESTS} aria-label="Link to open requests">
        <IconWrapper Icon={RequestsIcon} sx={{ width: "30px", height: "30px" }} />
      </Link>
    </Badge>
  );
};
