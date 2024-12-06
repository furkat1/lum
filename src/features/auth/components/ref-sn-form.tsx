"use client";
import {
  Button,
  FormControl,
  FormLabel,
  Link,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useRef, useState } from "react";

import RefSnIcon from "@/app/assets/RefSnIcon.svg";
import RefSnImg from "@/app/assets/RefSnImg.png";
import { palette } from "@/config/palette";
import { APP_ROUTES } from "@/config/routes";
import { StaticData } from "@/config/static-data";
import { useBlockUser } from "@/hooks";

import { refSnAction } from "../actions";
import { RefSnError } from "../constants";
import { NeedHelpLight } from ".";

export const RefSnForm = () => {
  const t = useTranslations("RefSn");

  const snRef = useRef<HTMLInputElement>(null);
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);

  const [error, formAction, isPending] = useActionState(refSnAction, null);

  const { blockUser, isBlocked } = useBlockUser();

  const handleFormChange = () => {
    setIsFormFilled(!!snRef.current?.value);
  };

  useEffect(() => {
    if (error === RefSnError.LOCKED) {
      blockUser();
    }
  }, [error]);

  return (
    <form action={formAction} onChange={handleFormChange} style={{ paddingBottom: "130px" }}>
      <Stack justifyContent="center" flexDirection="row" sx={{ margin: "78px auto 59px" }}>
        <Image src={RefSnIcon.src} alt="Icon" width={76} height={76} />
      </Stack>

      {!error && (
        <Typography
          sx={{
            color: palette.black,
            textAlign: "center",
            fontSize: 24,
            fontWeight: 500,
            lineHeight: "120%",
          }}
        >
          {t("text")}
        </Typography>
      )}
      {error === RefSnError.NO_MATCH && (
        <ErrorText>
          {t("errors.not-recognized")}{" "}
          <Link href={`mailto:${StaticData.EMAIL}`}>{StaticData.EMAIL}</Link>
        </ErrorText>
      )}
      {(error === RefSnError.LOCKED || isBlocked) && (
        <>
          <ErrorText>{t("errors.locked.first-line")}</ErrorText>
          <ErrorText sx={{ marginTop: "20px" }}>
            {t("errors.locked.second-line")}{" "}
            <Link href={`mailto:${StaticData.EMAIL}`}>{StaticData.EMAIL}</Link>
          </ErrorText>
        </>
      )}

      <FormControl sx={{ marginTop: "72px", marginBottom: "20px", width: "100%" }}>
        <StyledFormLabel htmlFor="refSn">{t("input-label")}</StyledFormLabel>
        <StyledTextField
          id="refSn"
          type="text"
          name="refSn"
          autoComplete="refSn"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color="primary"
          className={error ? "error" : ""}
          helperText={error ? t("helper-text-error") : t("helper-text")}
          inputRef={snRef}
        />
      </FormControl>

      <Stack justifyContent="center" flexDirection="row" sx={{ margin: "0px auto 56px" }}>
        <Image src={RefSnImg.src} alt="Device" width={337} height={219} />
      </Stack>

      <NeedHelpLight />

      <AuthFooter>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          maxWidth={948}
        >
          <BackLink href={APP_ROUTES.SIGN_IN}>{t("back-link")}</BackLink>
          <ContinueButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={isPending || !isFormFilled}
          >
            {t("continue")}
          </ContinueButton>
        </Stack>
      </AuthFooter>
    </form>
  );
};

const StyledFormLabel = styled(FormLabel)(() => ({
  color: palette.black,
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
  width: "100%",
  fontSize: 15,
  fontWeight: 400,
  lineHeight: "140%",

  input: {
    height: 50,
    boxSizing: "border-box",
    padding: "11px 12px",
    color: palette.black,
    background: "rgba(255, 255, 255, .5)",
    borderRadius: 6,
  },

  "&.error input": {
    border: "1px solid rgba(255, 0, 0, .6)",
  },

  ".MuiFormHelperText-root": {
    color: palette.grey,
    fontSize: 12,
    fontWeight: 300,
    lineHeight: "140%",
    marginLeft: 0,
    marginTop: 8,
  },

  "&.error .MuiFormHelperText-root": {
    color: palette.red,
  },
}));

const AuthFooter = styled(Stack)(() => ({
  padding: "16px 136px",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  borderTop: "1px solid rgba(119, 118, 118, 0.50)",
  background: palette.bg_pink,
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  height: 110,

  "@media (max-width: 720px)": {
    padding: "16px 24px",
    height: "136px",
    borderRadius: "18px 18px 0px 0px",
    background: palette.dark_grey,
    boxShadow: "0px -4px 12px 0px rgba(0, 0, 0, 0.15)",

    "> .MuiStack-root": {
      flexDirection: "column-reverse",
    },
  },
}));

const BackLink = styled(Link)(() => ({
  color: palette.black,
  fontSize: 18,
  fontWeight: 400,
  lineHeight: "140%",
  textDecoration: "underline",
  whiteSpace: "nowrap",

  "@media (max-width: 720px)": {
    marginTop: "26px",
    color: "#fff",
  },
}));

const ContinueButton = styled(Button)(() => ({
  width: "100%",
  height: 42,
  color: palette.white,
  textAlign: "center",
  fontSize: 18,
  fontWeight: 400,
  lineHeight: "140%",
  boxShadow: "none",
  maxWidth: 722,
  marginLeft: "104px",

  "&:disabled": {
    background: palette.grey,
    color: "rgba(255, 255, 255, .5)",
  },

  "@media (max-width: 720px)": {
    maxWidth: "100%",
    marginLeft: 0,
  },
}));

const ErrorText = styled(Typography)(() => ({
  color: palette.red,
  fontSize: 24,
  fontWeight: 500,
  lineHeight: "120%",
  textAlign: "center",

  a: {
    color: palette.red,
    cursor: "pointer",
  },
}));
