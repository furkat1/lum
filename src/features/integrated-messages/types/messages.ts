import { MultiLanguageText } from "@/types";

export type MessagesLocation = "FEED" | "STORE" | "WIZ" | "TREASURE_TROVE" | "SUPPORT_DESK";

/** Create type for paginated list */
export type IntegratedMessagesRequest = {
  skip: number;
  limit: number;
  displayLocations?: MessagesLocation[];
};

export type IntegratedMessage = {
  messageDefId: string;
  title?: MultiLanguageText;
  text: MultiLanguageText;
  imageUrl: string;
  clickUrl?: string;
  displayLocations: MessagesLocation[];
  sortable: string | number;
  textAlignment: "LEFT" | "CENTER" | "RIGHT";
};
