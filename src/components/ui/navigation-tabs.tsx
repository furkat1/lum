"use client";

import { alpha, styled, SxProps, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

import { palette } from "@/config/palette";

export type NavTabType = {
  href: string;
  label: string;
  disabled?: boolean;
};

export type NavigationTabsProps = {
  options: NavTabType[];
  sx?: SxProps;
};

export const NavigationTabs: FC<NavigationTabsProps> = (props) => {
  const { options } = props;

  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);

  return (
    <Tabs
      value={current}
      aria-label="navigation tabs"
      sx={{ borderBottom: `1px solid ${palette.grey}`, ...props.sx }}
    >
      {options.map((tab) => (
        <Tab
          key={tab.href}
          value={tab.href}
          href={tab.href}
          disabled={tab.disabled}
          LinkComponent={() => (
            <StyledTabLink
              href={tab.href}
              aria-label={tab.label}
              role="tab"
              tabIndex={tab.disabled ? -1 : 0}
              aria-disabled={tab.disabled}
              onClick={() => setCurrent(tab.href)}
              style={{
                fontWeight: pathname === tab.href ? 700 : 400,
                pointerEvents: tab.disabled ? "none" : "auto",
                opacity: tab.disabled ? 0.5 : 1,
              }}
            >
              {tab.label}
            </StyledTabLink>
          )}
        />
      ))}
    </Tabs>
  );
};

const StyledTabLink = styled(Link)(() => ({
  width: 200,
  height: 75,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,

  "&:hover": {
    background: alpha(palette.white, 0.05),
  },
}));
