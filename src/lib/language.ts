import { MultiLanguageText } from "@/types";

const FALLBACK_LOCALE = "en";

export const translate = (text?: MultiLanguageText, language?: string): string => {
  if (!text) {
    return "";
  }

  if (!language) {
    return text[FALLBACK_LOCALE] || "";
  }

  return text[language] || text[FALLBACK_LOCALE] || "";
};
