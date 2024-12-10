import { AccessTokenResponse, SessionData } from "../types";

export const accessTokenToSession = (accessTokenResponse: AccessTokenResponse): SessionData => ({
  userId: accessTokenResponse.userId,
  userName: accessTokenResponse.userName,
  email: accessTokenResponse.email,
  accountId: accessTokenResponse.accountId,
  userType: accessTokenResponse.userType,
  currency: accessTokenResponse.currency,
  language: accessTokenResponse.language,
  countryCode: accessTokenResponse.countryCode,
  title: accessTokenResponse.title,
  initialSetupCompleted: accessTokenResponse.initialSetupCompleted,
  permissions: accessTokenResponse.permissions,
  pleaseChangePassword: accessTokenResponse.pleaseChangePassword,
  allowedMachineTypes: accessTokenResponse.allowedMachineTypes,
  userProfession: accessTokenResponse.userProfession,
  userPositionInClinic: accessTokenResponse.userPositionInClinic,
  userYearStartedAesthetics: accessTokenResponse.userYearStartedAesthetics,
  userFirstName: accessTokenResponse.userFirstName,
  userLastName: accessTokenResponse.userLastName,
});
