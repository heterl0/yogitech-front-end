"use client";

import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { SentIcon } from "@/assets/icons";
import { usePathname, useRouter } from "next/navigation";
import FormProvider from "@/components/hook-form/form-provider";
import { RHFTextField } from "@/components/hook-form";
import { endpoints } from "@/utils/axios";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { useBoolean } from "@/hooks/use-boolean";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Iconify from "@/components/iconify";
import axiosInstance from "@/utils/axios";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function ForgetPasswordRetypeView() {
  const { t } = useTranslation();

  const path = usePathname().split("/");
  const router = useRouter();
  const pathLength = path.length;
  const dialog = useBoolean();
  const errorDialog = useBoolean();

  const password = useBoolean();
  const rePassword = useBoolean();

  const defaultValues = {
    uid: path[pathLength - 2],
    token: path[pathLength - 1],
    new_password: "",
    re_password: "",
  };

  const ChangePasswordSchema = Yup.object().shape({
    new_password: Yup.string()
      .required(t("forgotPasswordRetype.passwordRequired"))
      .min(8, t("forgotPasswordRetype.passwordMin")),
    re_password: Yup.string()
      .oneOf(
        [Yup.ref("new_password")],
        t("forgotPasswordRetype.passwordsMustMatch")
      )
      .required(t("forgotPasswordRetype.passwordRequired")),
    uid: Yup.string(),
    token: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { re_password, ...dataSend } = data;

      await axiosInstance.post(endpoints.auth.confirm, dataSend);
      console.info("DATA", data);
      dialog.onTrue();
      setTimeout(() => {
        router.push(paths.auth.jwt.login);
      }, 3000);
    } catch (error) {
      console.error(error);
      errorDialog.onTrue();
      setTimeout(() => {
        router.push(paths.auth.jwt.forgetPassword);
      }, 3000);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField className="hidden!" name="uid" />
      <RHFTextField className="hidden!" name="token" />

      <RHFTextField
        name="new_password"
        label={t("forgotPasswordRetype.newPassword")}
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
        label={t("forgotPasswordRetype.rePassword")}
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
        size="large"
        type="submit"
        color="primary"
        variant="contained"
        loading={isSubmitting}
      >
        {t("forgotPasswordRetype.updatePassword")}
      </LoadingButton>
      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        {t("forgotPasswordRetype.returnToSignIn")}
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <SentIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
        <Typography variant="h3">
          {t("forgotPasswordRetype.requestSentSuccess")}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {t("forgotPasswordRetype.enterNewPassword")}
        </Typography>
      </Stack>
    </>
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}

        {renderForm}
      </FormProvider>
      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle>{t("forgotPasswordRetype.updateSuccess")}</DialogTitle>

        <DialogContent sx={{ color: "text.secondary" }} className="p-6! pt-0!">
          <div className="flex flex-col items-center justify-center gap-8">
            <Typography>{t("forgotPasswordRetype.redirectToLogin")}</Typography>
            <div>
              <CircularProgress color="primary" size={32} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={errorDialog.value} onClose={errorDialog.onFalse}>
        <DialogTitle className="text-error-main" sx={{ color: "text.error" }}>
          {t("forgotPasswordRetype.errorOccurred")}
        </DialogTitle>

        <DialogContent sx={{ color: "text.secondary" }} className="p-6! pt-0!">
          <div className="flex flex-col items-center justify-center gap-8">
            <Typography>{t("forgotPasswordRetype.expiredLink")}</Typography>
            <div className="p-2">
              <CircularProgress color="error" size={32} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
