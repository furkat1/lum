export enum UserType {
  CUSTOMER = "customer",
  BACKOFFICE = "backOffice",
}

export enum SESSION_KEYS {
  SIGNUP_SESSION = "signup_session",
  SIGNUP_STEP = "signup_step",
  SIGNUP_EMAIL = "signup_email",
  SIGNUP_OPP = "signup_opp",
  SIGNUP_SN = "signup_sn",
}

// defines in backend:
export enum SignupFlow {
  OPP = "opp",
  REFSN = "refsn",
  OTP = "otp",
}

export enum SignInError {
  LOCKED = "locked_user",
  NOT_FOUND = "record_not_found",
}

export enum SignUpError {
  LOCKED = "locked_user",
  REGISTERED = "already_registered",
}

export enum RefSnError {
  NO_MATCH = "refsn_no_match",
  LOCKED = "locked_user",
}
