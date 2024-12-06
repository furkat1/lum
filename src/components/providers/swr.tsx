"use client";
import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: PropsWithChildren) => {
  return (
    <SWRConfig value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}>
      {children}
    </SWRConfig>
  );
};
