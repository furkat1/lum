import { PropsWithChildren } from "react";

import { MuiProvider } from "./mui-provider";
import { SWRProvider } from "./swr";

export function Providers({ children }: PropsWithChildren) {
  return (
    <MuiProvider>
      <SWRProvider>{children}</SWRProvider>
    </MuiProvider>
  );
}
