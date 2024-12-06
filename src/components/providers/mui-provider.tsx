import { CssBaseline, ThemeProvider } from "@mui/material";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { PropsWithChildren } from "react";

import theme from "@/theme";

export function MuiProvider({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider>
      <InitColorSchemeScript attribute="class" />
      <ThemeProvider theme={theme} defaultMode="dark">
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
