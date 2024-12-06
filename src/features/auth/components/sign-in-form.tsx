"use client";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { ChangeEvent, MouseEvent, useActionState, useEffect, useRef, useState } from "react";

import { palette } from "@/config/palette";
import { APP_ROUTES } from "@/config/routes";
import { useBlockUser } from "@/hooks";

import { loginAction } from "../actions";
import { SignInError } from "../constants";
import { NeedHelp } from "./need-help";

export const SignInForm = () => {
  const t = useTranslations("SignIn");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);

  const [error, formAction, isPending] = useActionState(loginAction, null);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [rememberMeChecked, setRememberMeChecked] = useState(false);

  const { blockUser, isBlocked } = useBlockUser();

  const handleTogglePasswordVisibility = () => setPasswordVisible((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleRememberMeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberMeChecked(event.target.checked);
  };

  const handleFormChange = () => {
    setIsFormFilled(!!emailRef.current?.value && !!passwordRef.current?.value);
  };

  useEffect(() => {
    if (error === SignInError.LOCKED) {
      blockUser();
    }
  }, [error]);

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
      {(error || isBlocked) && (
        <Typography
          sx={{
            color: palette.red,
            fontSize: 18,
            fontWeight: 700,
            lineHeight: "110%",
            backgroundColor: palette.black,
          }}
        >
          {t("errors.not-matched.first-line")} <br />
          {t("errors.not-matched.second-line")}
        </Typography>
      )}

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

        <FormControl sx={{ marginBottom: "11px" }}>
          <StyledFormLabel htmlFor="password" sx={{ fontSize: 14 }}>
            {t("password")}
          </StyledFormLabel>
          <StyledTextField
            name="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color="primary"
            className={error ? "error" : ""}
            type={passwordVisible ? "text" : "password"}
            inputRef={passwordRef}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {passwordVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </FormControl>

        {/* TODO: add correct href */}
        <Link
          href="#"
          sx={{
            color: palette.primary_main,
            textAlign: "right",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "100%",
            textDecoration: "underline",
          }}
        >
          Forgot password
        </Link>

        <FormActionsRow>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMeChecked}
                name="rememberMe"
                id="rememberMe"
                onChange={handleRememberMeCheck}
              />
            }
            label={t("rememberMe")}
            sx={{
              color: palette.white,
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "140%",
            }}
          />
        </FormActionsRow>

        <Typography
          sx={{
            color: palette.white,
            fontSize: 12,
            fontWeight: 600,
            lineHeight: "140%",
            opacity: 0.8,
          }}
        >
          By tapping “log in” below, you confirm your agreement to be bound by “Lumenis Customer
          App”{" "}
          <Link href={APP_ROUTES.TERMS} sx={{ textDecoration: "none" }}>
            Terms of Use
          </Link>
          . You specifically consent to the use of any personal data provided by you/or by your
          organization, as applicable, or otherwise collected or generated by Lumenis Be in
          connection with your registration to or use of this website and/or the applications
          features hereby, in accordance with Lumenis Be’s{" "}
          <Link href="https://lumenis.com/privacy-statement/" sx={{ textDecoration: "none" }}>
            Privacy Statement
          </Link>
          , including for e-mail marketing.
          <br />
          <br />
          Lumenis may contact you regarding the Website or Digital Services via email, telephone or
          text messages, in accordance with your device purchase contract and with Lumenis’ Privacy
          Statement. Text messaging may not be entirely secure. By agreeing to the Terms, you agree
          to receive text messages from Lumenis.
          <br />
          <br />
        </Typography>

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
  background: "#403B3B",
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

const FormActionsRow = styled(Stack)(() => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
  marginTop: 11,
}));

const AuthFooter = styled(Stack)(() => ({
  padding: "16px 136px",
  alignItems: "center",
  justifyContent: "center",
  borderTop: "1px solid rgba(119, 118, 118, 0.50)",
  background: "#212121",
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  height: 110,
  "@media (max-width: 720px)": {
    padding: "16px 24px",
  },
}));
