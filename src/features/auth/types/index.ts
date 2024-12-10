import { SignupFlow, UserType } from "../constants";

export type AccessTokenResponse = {
  accessToken: string;
  accessTokenExpireInSec: number;
  refreshToken: string;
  refreshTokenExpireInSec: number;
  userId: string;
  userFirstName?: string;
  userLastName?: string;
  userName?: string;
  email: string;
  userProfession?: string;
  userPositionInClinic?: string;
  userYearStartedAesthetics?: number;
  accountId?: string;
  accountCustomerName?: string;
  accountClinicType?: string;
  userType: UserType;
  currency?: string;
  language?: string;
  countryCode?: string;
  regionCode?: string;
  title?: string;
  machineTypeUuids?: string[];
  initialSetupCompleted?: boolean;
  permissions: string[];
  impersonatedBy: ImpersonatedBy;
  allowedToAllModules: boolean;
  allowedModules?: AllowedModules;
  allowedToAllMachineTypes: boolean;
  allowedMachineTypes?: string[];
  allowedToAllCountries: boolean;
  allowedCountries?: string[];
  pleaseChangePassword?: boolean;
};

export type ImpersonatedBy = {
  userUuid: string;
  type: UserType;
  permissions: string[];
  language: string;
};

export type AllowedModules = {
  feed?: {
    manualMessages?: boolean;
    autoMessages?: boolean;
  };
  store?: {
    products?: boolean;
    coupons?: boolean;
    orders?: boolean;
    circle?: boolean;
  };
  performance?: {
    wizInsights?: boolean;
  };
  treasureTrove?: {
    [key: string]: boolean;
  };
  support: {
    [key: string]: boolean;
  };
  mediaRepository: {
    images: boolean;
    videos: boolean;
  };
  customers: {
    accounts: boolean;
    contacts: boolean;
    segments: boolean;
  };
  userManagement: {
    contentCreators: boolean;
    supportOperators: boolean;
  };
};

export type SessionData = Pick<
  AccessTokenResponse,
  | "userId"
  | "userName"
  | "email"
  | "accountId"
  | "userType"
  | "currency"
  | "language"
  | "countryCode"
  | "title"
  | "initialSetupCompleted"
  | "permissions"
  | "pleaseChangePassword"
  | "allowedMachineTypes"
  | "userProfession"
  | "userPositionInClinic"
  | "userYearStartedAesthetics"
  | "userFirstName"
  | "userLastName"
>;

export type RegistrationResponse = {
  flow: SignupFlow;
  sessionId: string;
};
