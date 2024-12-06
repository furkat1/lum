"use client";
import { Box, Link, styled, SxProps, Theme } from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { palette } from "@/config/palette";

type Link = {
  href: string;
  text: ReactNode;
};

type LinkTabsProps = {
  links: Link[];
  tabsSx?: SxProps<Theme>;
};

export const LinkTabs = ({ links, tabsSx }: LinkTabsProps) => {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        height: 34,
        width: "100%",
        borderRadius: "30px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        ...(tabsSx ? tabsSx : []),
      }}
    >
      {links.map((link) => (
        <StyledTabLink
          className={pathname === link.href ? "active" : ""}
          href={link.href}
          key={link.href}
        >
          {link.text}
        </StyledTabLink>
      ))}
    </Box>
  );
};

const StyledTabLink = styled(Link)(() => ({
  width: "50%",
  height: "100%",
  border: "1px solid #777676",
  opacity: 0.7,
  background: "#777676",
  color: palette.white,
  fontSize: 20,
  fontWeight: 400,
  lineHeight: "120%",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&.active": {
    background: palette.primary_main,
    color: palette.black,
    opacity: 1,
  },
}));
