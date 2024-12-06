"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useRef, useState } from "react";

import { palette } from "@/config/palette";
import { useBlockUser } from "@/hooks";

import { emailIdentifyAction } from "../actions";
import { SignUpError } from "../constants";
import { NeedHelp } from "./need-help";

export const SignUpForm = () => {
  const t = useTranslations("SignUp");

  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const [error, formAction, isPending] = useActionState(emailIdentifyAction, null);

  const { blockUser, isBlocked } = useBlockUser();

  useEffect(() => {
    if (error === SignUpError.LOCKED) {
      blockUser();
    }
  }, [error]);

  const handleFormChange = () => {
    setIsFormFilled(!!emailRef.current?.value);
  };

  return (
    <form
      action={formAction}
      onChange={handleFormChange}
      style={{
        width: "100%",
        maxWidth: 948,
        paddingBottom: "178px",
      }}
    >
      {error && error !== SignUpError.LOCKED && error !== SignUpError.REGISTERED && (
        <ErrorText>{t("errors.not-recognized")}</ErrorText>
      )}
      {(error === SignUpError.LOCKED || isBlocked) && (
        <ErrorText>
          {t("errors.locked.first-line")} <br />
          {t("errors.locked.second-line")} <br />
          <span style={{ display: "inline-block", marginTop: "10px" }}>
            {t("errors.locked.third-line")}
          </span>
        </ErrorText>
      )}
      {error === SignUpError.REGISTERED && <ErrorText>{t("errors.registered")}</ErrorText>}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          paddingTop: 2,
        }}
      >
        <FormControl sx={{ marginBottom: "33px" }}>
          <StyledFormLabel htmlFor="email">{t("email")}</StyledFormLabel>
          <StyledTextField
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color="primary"
            className={error ? "error" : ""}
            inputRef={emailRef}
          />
        </FormControl>

        <NeedHelp />

        <AuthFooter>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={isPending || !isFormFilled}
            sx={{
              width: "100%",
              maxWidth: 916,
              color: palette.white,
              textAlign: "center",
              fontSize: 18,
              fontWeight: 400,
              lineHeight: "140%",
            }}
          >
            {t("title")}
          </Button>
        </AuthFooter>
      </Box>
    </form>
  );
};

const StyledFormLabel = styled(FormLabel)(() => ({
  color: palette.white,
  fontSize: 16,
  fontWeight: 400,
  lineHeight: "140%",
  marginBottom: "7px",

  "&::after": {
    content: '"*"',
    color: "red",
    position: "absolute",
    top: "0",
    marginLeft: 2,
  },
}));

const StyledTextField = styled(TextField)(() => ({
  borderRadius: 6,
  background: palette.dark_grey,
  width: "100%",
  color: palette.white,
  fontSize: 15,
  fontWeight: 400,
  lineHeight: "140%",

  input: {
    height: 50,
    boxSizing: "border-box",
    padding: "11px 12px",
  },

  "&.error": {
    border: "1px solid rgba(255, 0, 0, .6)",
  },
}));

const AuthFooter = styled(Stack)(() => ({
  padding: "16px 136px",
  alignItems: "center",
  justifyContent: "center",
  borderTop: "1px solid rgba(119, 118, 118, 0.50)",
  background: palette.bg_auth_dark,
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  height: 110,
  "@media (max-width: 720px)": {
    padding: "16px 24px",
  },
}));

const ErrorText = styled(Typography)(() => ({
  color: palette.red,
  fontSize: 18,
  fontWeight: 700,
  lineHeight: "110%",
  backgroundColor: palette.black,
}));
