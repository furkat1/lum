"use client";

import { Box, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { palette } from "@/config/palette";
import { APP_ROUTES } from "@/config/routes";

type HeaderLink = {
  href: string;
  label?: string;
  routes?: string[];
};

export const NavLinks = () => {
  const pathname = usePathname();
  const t = useTranslations("NavLinks");

  const [current, setCurrent] = useState(pathname);

  const navLinks: HeaderLink[] = useMemo(
    () => [
      { href: APP_ROUTES.FEED, label: t("links.FEED") },
      {
        href: APP_ROUTES.PRODUCTS,
        label: t("links.STORE"),
        routes: [
          APP_ROUTES.PRODUCTS,
          APP_ROUTES.RECENTLY_PURCHASED,
          APP_ROUTES.ORDERS,
          APP_ROUTES.PRODUCT,
        ],
      },
      { href: APP_ROUTES.TREASURE_TROVE, label: t("links.TREASURE_TROVE") },
      { href: APP_ROUTES.ANALYTICS, label: t("links.ANALYTICS") },
      { href: APP_ROUTES.SUPPORT, label: t("links.SUPPORT") },
    ],
    [t],
  );

  const isActive = (item: HeaderLink) => {
    return item.href === current || item.routes?.some((route) => current.includes(route));
  };

  return (
    <NavContainer
      sx={{
        display: {
          xs: "none",
          sm: "none",
          md: "none",
          lg: "flex",
        },
        maxWidth: {
          lg: 578,
          xl: 746,
        },
      }}
    >
      {navLinks.map((item) => (
        <StyledLink
          key={item.href}
          href={item.href || ""}
          sx={{
            color: isActive(item) ? palette.primary_main : palette.white,
          }}
          onClick={() => setCurrent(item.href)}
        >
          {item.label}
        </StyledLink>
      ))}

      <StyledDivider />

      <StyledLink
        href={APP_ROUTES.ACCOUNT}
        onClick={() => setCurrent(APP_ROUTES.ACCOUNT)}
        sx={{
          color: isActive({ href: APP_ROUTES.ACCOUNT }) ? palette.primary_main : palette.white,
        }}
      >
        {t("account")}
      </StyledLink>
    </NavContainer>
  );
};

const NavContainer = styled(Box)(() => ({
  flex: 1,
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 0,
}));

const StyledDivider = styled(Box)(() => ({
  width: 2,
  height: 19,
  backgroundColor: alpha(palette.white, 0.5),
}));

const StyledLink = styled(Link)(() => ({
  padding: 0,
  fontSize: 16,
  fontWeight: 400,
  color: "inherit",
  textDecoration: "none",
  transition: "color 0.3s ease background-color 0.3s ease",
  "&:hover ": {
    backgroundColor: "transparent",
    color: palette.primary_light,
  },
  "&:focus": {
    color: palette.primary_main,
    outline: "none",
  },
  ".pressed": {
    color: palette.accent_dark,
  },
  "&:disabled": {
    backgroundColor: alpha(palette.white, 0.5),
    pointerEvents: "none",
  },
}));
