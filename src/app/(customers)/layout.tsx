import { Stack } from "@mui/material";
import { PropsWithChildren } from "react";

import { Header } from "@/components/layout";
import { LocalizationProvider } from "@/components/providers/localization-provider";
import { MachineTypesProvider } from "@/components/providers/machine-types-provider";
import { getSession } from "@/lib/auth";

export default async function CustomersLayout({ children }: PropsWithChildren) {
  const { countryCode, currency, language } = await getSession();

  return (
    <LocalizationProvider countryCode={countryCode} currency={currency} language={language}>
      <MachineTypesProvider>
        <Stack sx={{ minHeight: "100vh" }}>
          <Header />
          {children}
        </Stack>
      </MachineTypesProvider>
    </LocalizationProvider>
  );
}
