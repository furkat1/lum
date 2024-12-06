export const APP_ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/registration",
  SIGN_UP_OPP: "/registration/opp",
  SIGN_UP_REF_SN: "/registration/refsn",
  SIGN_UP_OTP: "/registration/otp",
  CART: "/cart",
  ORDER_HISTORY: "/store/order-history",
  SUPPORT_REQUESTS: "/support/requests",

  PRODUCTS: "/products",
  RECENTLY_PURCHASED: "/recently-purchased",
  ORDERS: "/orders",
  PRODUCT: "/product",

  TREASURE_TROVE: "/treasure-trove",

  SUPPORT: "/support/desk",

  ACCOUNT: "/account",
  ANALYTICS: "/analytics",
  CHECKOUT: "/checkout",
  FAVORITES: "/favorites",
  FEED: "/feed",
  PROFILE: "/profile",
  SEARCH: "/search",

  TERMS: "/terms",

  // Clinics
  CLINICS: "/clinics",
  REPORTS: "/reports",
  RESOURCES: "/resources",
  CLINICS_SUPPORT: "/support",
  SETTINGS: "/settings",
};

export const PUBLIC_ROUTES = [
  APP_ROUTES.SIGN_IN,
  APP_ROUTES.SIGN_UP,
  APP_ROUTES.SIGN_UP_OPP,
  APP_ROUTES.SIGN_UP_REF_SN,
  APP_ROUTES.SIGN_UP_OTP,
];
