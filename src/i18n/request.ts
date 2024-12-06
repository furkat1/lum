import { headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "ru"];
const defaultLocale = "en";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  // e.g.

  const requestHeaders = await headers();
  const language = requestHeaders.get("accept-language");
  const locale = locales.find((l) => l === language) || defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
