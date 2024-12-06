import { AppBar, Stack, Toolbar } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { NavLinks } from "@/components/layout/nav-links";
import { palette } from "@/config/palette";

import { ABCArizona } from "../../app/fonts/ABCArizona";
import NavIcons from "../ui/nav-group";
import { HeaderLogo } from "./header-logo";
import { MaxWidthContainer } from "./max-width-container";

type HeaderProps = {
  isAuthPage?: boolean;
};

export const Header = async ({ isAuthPage }: HeaderProps) => {
  return (
    <AppBar sx={mUiStyles.appBar} className={ABCArizona.className}>
      <Toolbar sx={mUiStyles.toolbar}>
        <MaxWidthContainer sx={mUiStyles.maxWidthContainer}>
          <Stack sx={mUiStyles.stack}>
            <HeaderLogo />

            {!isAuthPage && <NavLinks />}
            {!isAuthPage && <NavIcons />}
          </Stack>
        </MaxWidthContainer>
      </Toolbar>
    </AppBar>
  );
};

const mUiStyles = {
  appBar: {
    position: "static",
  },
  toolbar: {
    borderBottom: `1px solid ${alpha(palette.primary_main, 0.2)};`,
  },
  maxWidthContainer: {
    flex: 1,
  },
  stack: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    p: 0,
  },
};
