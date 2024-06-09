/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useRouter } from "@/routes/hooks";

import { useBoolean } from "@/hooks/use-boolean";

import { useAuthContext } from "@/auth/hooks";
import { ALLOW_TO_REGISTER, PATH_AFTER_LOGIN } from "@/config-global";

import Iconify from "@/components/iconify";
import FormProvider, { RHFTextField } from "@/components/hook-form";
import { notFound } from "next/navigation";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { t } = useTranslation();
  const { register } = useAuthContext();
  const router = useRouter();
  const allowRegister = ALLOW_TO_REGISTER;
  const [errorMsg, setErrorMsg] = useState("");
  const password = useBoolean();
  const rePassword = useBoolean();

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required(t("register.usernameRequired")),
    email: Yup.string()
      .required(t("register.emailRequired"))
      .email(t("register.emailInvalid")),
    password: Yup.string()
      .required(t("register.passwordRequired"))
      .min(8, t("register.passwordMin")),
    re_password: Yup.string()
      .oneOf([Yup.ref("password")], t("register.passwordsMustMatch"))
      .required(t("register.rePasswordRequired")),
  });

  const defaultValues = {
    username: "",
    phone: "",
    email: "",
    password: "",
    re_password: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(
        data.email,
        data.username,
        data.password,
        data.re_password
      );
      router.push(PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === "string" ? error : t("register.error"));
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Typography variant="h4">{t("register.heading")}</Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">
          {t("register.alreadyHaveAccount")}
        </Typography>
        <Link
          href={paths.auth.jwt.login}
          component={RouterLink}
          variant="subtitle2"
        >
          {t("register.signIn")}
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 2.5,
        textAlign: "center",
        typography: "caption",
        color: "text.secondary",
      }}
    >
      {t("register.terms")}{" "}
      <Link underline="always" color="text.primary">
        {t("register.termsOfService")}
      </Link>{" "}
      {t("register.and")}{" "}
      <Link underline="always" color="text.primary">
        {t("register.privacyPolicy")}
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="username" label={t("register.username")} />
      <RHFTextField name="email" label={t("register.email")} />
      <RHFTextField
        name="password"
        label={t("register.password")}
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
      <RHFTextField
        name="re_password"
        label={t("register.rePassword")}
        type={rePassword.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={rePassword.onToggle} edge="end">
                <Iconify
                  icon={
                    rePassword.value
                      ? "solar:eye-bold"
                      : "solar:eye-closed-bold"
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        {t("register.createAccount")}
      </LoadingButton>
    </Stack>
  );

  if (!allowRegister) {
    return notFound();
  }

  return (
    <>
      {renderHead}
      {!!errorMsg && (
        <Alert severity="error" sx={{ m: 3 }}>
          {errorMsg}
        </Alert>
      )}
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
      {renderTerms}
    </>
  );
}
