"use client";

import * as Yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";
import { useRouter, useSearchParams } from "@/routes/hooks";

import { useBoolean } from "@/hooks/use-boolean";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAuthContext } from "@/auth/hooks";
import {
  ALLOW_TO_LOGIN_WITH_GOOGLE,
  ALLOW_TO_REGISTER,
  PATH_AFTER_LOGIN,
} from "@/config-global";

import Iconify from "@/components/iconify";
import FormProvider, { RHFTextField } from "@/components/hook-form";
import GoogleLoginButton from "../google-login-button";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { t } = useTranslation();
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("login.error.emailRequired"))
      .email(t("login.error.emailInvalid")),
    password: Yup.string().required(t("login.error.passwordRequired")),
  });

  const defaultValues = {
    email: "lehieu99666+1@gmail.com",
    password: "secret",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password);
      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(
        typeof error === "string"
          ? t("login.error.notCredentialAvailable")
          : t("login.error.genericError")
      );
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">{t("login.title")}</Typography>

      {ALLOW_TO_REGISTER && (
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">{t("login.newUser")}</Typography>

          <Link
            component={RouterLink}
            href={paths.auth.jwt.register}
            variant="subtitle2"
          >
            {t("login.createAccount")}
          </Link>
        </Stack>
      )}
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="email" label={t("login.emailLabel")} />

      <RHFTextField
        name="password"
        label={t("login.passwordLabel")}
        type={password.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify
                  icon={
                    password.value ? "solar:eye-bold" : "solar:eye-closed-bold"
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link
        variant="body2"
        color="inherit"
        underline="always"
        href={paths.auth.jwt.forgetPassword}
        sx={{ alignSelf: "flex-end" }}
      >
        {t("login.forgotPassword")}
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        {t("login.loginButton")}
      </LoadingButton>
    </Stack>
  );
  console.log(ALLOW_TO_LOGIN_WITH_GOOGLE);

  return (
    <>
      <div className="flex flex-col justify-center gap-2">
        <div>
          {renderHead}

          <Alert severity="info" sx={{ mb: 3 }}>
            {t("login.onlyAdmin")}
          </Alert>
          {!!errorMsg && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errorMsg}
            </Alert>
          )}
          <FormProvider methods={methods} onSubmit={onSubmit}>
            {renderForm}
          </FormProvider>
        </div>
        <GoogleOAuthProvider
          clientId={
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
              ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
              : ""
          }
        >
          {ALLOW_TO_LOGIN_WITH_GOOGLE && <GoogleLoginButton />}
        </GoogleOAuthProvider>
      </div>
    </>
  );
}
