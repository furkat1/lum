import { AppBar, IconButton, Stack, SxProps, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import WizLogo from "@/app/assets/WizByLumenis.svg";
import { palette } from "@/config/palette";
import { APP_ROUTES } from "@/config/routes";
import { logoutAction } from "@/features/auth/actions";

import { IconWrapper } from "../icon/icon-wrapper";
import { GearIcon } from "../icon/icons/gear-icon";
import { SignOutIcon } from "../icon/icons/sign-out-icon";
import { UserIcon } from "../icon/icons/user-icon";
import { NavigationTabs } from "../ui/navigation-tabs";
import { MaxWidthContainer } from "./max-width-container";

export const ClinicsHeader = async () => {
  const t = await getTranslations("Clinics.tabs");

  const options = [
    { href: APP_ROUTES.HOME, label: t("main") },
    { href: APP_ROUTES.CLINICS, label: t("clinics") },
    { href: APP_ROUTES.REPORTS, label: t("reports") },
    { href: APP_ROUTES.RESOURCES, label: t("resources") },
    { href: APP_ROUTES.CLINICS_SUPPORT, label: t("support") },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <MaxWidthContainer>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              p: 0,
            }}
          >
            <Link href={APP_ROUTES.HOME} style={{ height: 26.73 }}>
              <Image width={159} height={26.73} src={WizLogo} alt="Logo" />
            </Link>

            <Stack
              sx={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
            >
              <NavigationTabs options={options} sx={tabsStyles} />
            </Stack>

            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "16px" }}>
              <Link href={APP_ROUTES.SETTINGS}>
                <IconWrapper Icon={GearIcon} hoverColor={palette.light_blue} sx={{ height: 32 }} />
              </Link>

              <Link href={APP_ROUTES.SETTINGS}>
                <IconWrapper Icon={UserIcon} hoverColor={palette.light_blue} sx={{ height: 32 }} />
              </Link>

              <form action={logoutAction}>
                <IconButton
                  type="submit"
                  sx={{
                    background: "none",
                    width: 32,
                    height: 32,
                    "&:hover": { background: "none" },
                  }}
                >
                  <IconWrapper
                    Icon={SignOutIcon}
                    hoverColor={palette.light_blue}
                    sx={{ height: 32, cursor: "pointer" }}
                  />
                </IconButton>
              </form>
            </Stack>
          </Stack>
        </MaxWidthContainer>
      </Toolbar>
    </AppBar>
  );
};

const tabsStyles: SxProps = {
  borderBottom: 0,
  a: {
    width: 120,
    height: 68,
    textTransform: "uppercase",
  },
  ".MuiTabs-indicator": {
    backgroundColor: palette.white,
    height: 2,
    borderRadius: 0,
  },
  ".MuiTabs-flexContainer": {
    gap: 2,
  },
};
