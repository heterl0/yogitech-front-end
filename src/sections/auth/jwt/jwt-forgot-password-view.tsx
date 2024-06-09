"use client";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { PasswordIcon } from "@/assets/icons";

import Iconify from "@/components/iconify";
import FormProvider, { RHFTextField } from "@/components/hook-form";
import axiosInstance, { endpoints } from "@/utils/axios";
import { useBoolean } from "@/hooks/use-boolean";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function JwtForgotPasswordView() {
  const { t } = useTranslation();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("forgotPassword.emailRequired"))
      .email(t("forgotPassword.emailInvalid")),
  });

  const dialog = useBoolean();
  const router = useRouter();
  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await axiosInstance.post(endpoints.auth.forgetPassword, data);
      console.info("DATA", data);
      dialog.onTrue();
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField name="email" label={t("forgotPassword.email")} />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        {t("forgotPassword.sendRequest")}
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
        {t("forgotPassword.returnToSignIn")}
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
        <Typography variant="h3">
          {t("forgotPassword.forgotPassword")}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {t("forgotPassword.enterEmail")}
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
        <DialogTitle>{t("forgotPassword.sendRequestSuccess")}</DialogTitle>

        <DialogContent sx={{ color: "text.secondary" }} className="!p-6 !pt-0">
          <div className="flex flex-col items-center justify-center gap-8">
            <Typography>{t("forgotPassword.checkMail")}</Typography>
            <div>
              <CircularProgress color="primary" size={32} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
