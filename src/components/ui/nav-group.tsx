import { Avatar, Box, Icon, IconButton } from "@mui/material";
import Link from "next/link";
import React from "react";

import { palette } from "@/config/palette";
import { APP_ROUTES } from "@/config/routes";
import { logoutAction } from "@/features/auth/actions";
import { getSession } from "@/lib/auth";

import { IconWrapper } from "../icon/icon-wrapper";
import { DotsIcon } from "../icon/icons/dots-icon";
import { FavIcon } from "../icon/icons/fav-icon";
import { LogoutIcon } from "../icon/icons/logout-icon";
import { SearchIcon } from "../icon/icons/search-icon";

export default async function NavIcons() {
  const session = await getSession();

  const userName = session?.userName
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((name) => name.slice(0, 1))
    ?.join("")
    ?.toUpperCase();

  return (
    <Box sx={mUiStyles.container}>
      <Box sx={mUiStyles.mobileMenu}>
        <Link href={APP_ROUTES.HOME}>
          <IconWrapper Icon={DotsIcon} sx={{ width: "24px", height: "24px" }} />
        </Link>
      </Box>

      <Box sx={mUiStyles.desktopMenu}>
        <Link href={APP_ROUTES.SEARCH}>
          <IconWrapper Icon={SearchIcon} sx={{ width: "24px", height: "24px" }} />
        </Link>

        <Link href={APP_ROUTES.FAVORITES}>
          <IconWrapper Icon={FavIcon} sx={{ width: "24px", height: "24px" }} />
        </Link>

        <Link href={APP_ROUTES.PROFILE}>
          <Avatar sx={mUiStyles.avatar}>{userName}</Avatar>
        </Link>

        <form action={logoutAction}>
          <IconButton type="submit" sx={mUiStyles.iconButton}>
            <Icon sx={mUiStyles.icon}>
              <IconWrapper Icon={LogoutIcon} sx={{ width: "24px", height: "24px" }} />
            </Icon>
          </IconButton>
        </form>
      </Box>
    </Box>
  );
}

const mUiStyles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: palette.white,
    p: 0,
  },
  mobileMenu: {
    display: { xs: "flex", lg: "none" },
  },
  desktopMenu: {
    display: { xs: "none", lg: "flex" },
    gap: "27px",
    alignItems: "center",
  },
  iconButton: {
    p: 0,
  },
  icon: {
    p: 0,
    fontSize: "24px",
  },
  moreIcon: {
    color: palette.white,
    fontSize: "24px",
  },
  avatar: {
    width: 24,
    height: 24,
    p: 0,
    bgcolor: palette.white,
    color: palette.primary_main,
    fontSize: 12,
    fontWeight: 900,
    "&:hover": {
      bgcolor: palette.bg_pink,
    },
  },
};
