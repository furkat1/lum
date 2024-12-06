import axios from "axios";
import { usePathname } from "next/navigation";
import qs from "qs";
import { useEffect, useState } from "react";

import { APP_ROUTES } from "@/config/routes";
import { PaginatedResponse } from "@/types";

import { IntegratedMessage, IntegratedMessagesRequest, MessagesLocation } from "../types/messages";

export const useMessages = () => {
  const pathname = usePathname();

  const [data, setData] = useState<IntegratedMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [msgLocation, setMsgLocation] = useState<MessagesLocation | null>(null);

  const getMsgLocation = (): MessagesLocation | null => {
    switch (pathname) {
      case APP_ROUTES.FEED:
        return "FEED";

      case APP_ROUTES.PRODUCTS:
      case APP_ROUTES.ORDERS:
      case APP_ROUTES.RECENTLY_PURCHASED:
        return "STORE";

      case APP_ROUTES.TREASURE_TROVE:
        return "TREASURE_TROVE";

      case APP_ROUTES.SUPPORT:
      case APP_ROUTES.SUPPORT_REQUESTS:
      case APP_ROUTES.ACCOUNT:
        return "SUPPORT_DESK";

      case "/analytics":
        return "WIZ";

      default:
        return null;
    }
  };

  const loadMessages = async () => {
    if (!msgLocation) {
      return;
    }
    try {
      const searchParams: IntegratedMessagesRequest = {
        skip: 0,
        limit: 100,
        displayLocations: [msgLocation],
      };

      const response = await axios.get<PaginatedResponse<IntegratedMessage>>("/api/messages", {
        params: searchParams,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
      });
      setData(response.data.items);
    } catch (err) {
      console.error("Failed to load messgages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMsgLocation(getMsgLocation());
  }, [pathname]);

  useEffect(() => {
    setData([]);
    setLoading(true);
    loadMessages();
  }, [msgLocation]);

  return { data, loading };
};
