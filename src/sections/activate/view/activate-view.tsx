"use client";

import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { SentIcon } from "@/assets/icons";
import { usePathname, useRouter } from "next/navigation";
import FormProvider from "@/components/hook-form/form-provider";
import { RHFTextField } from "@/components/hook-form";
import axios, { endpoints } from "@/utils/axios";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useBoolean } from "@/hooks/use-boolean";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function ActivateView() {
  const { t } = useTranslation();

  const path = usePathname().split("/");
  const router = useRouter();
  const pathLength = path.length;
  const dialog = useBoolean();
  const errorDialog = useBoolean();

  const defaultValues = {
    uid: path[pathLength - 2],
    token: path[pathLength - 1],
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await axios.post(endpoints.auth.activate, data);
      console.info("DATA", data);
      dialog.onTrue();
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error(error);
      errorDialog.onTrue();
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField className="!hidden" name="uid" />
      <RHFTextField className="!hidden" name="token" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="primary"
        variant="contained"
        loading={isSubmitting}
      >
        {t("activateView.activate")}
      </LoadingButton>
    </Stack>
  );

  const renderHead = (
    <>
      <SentIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ mt: 3, mb: 5 }}>
        <Typography variant="h3">{t("activateView.welcome")}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {t("activateView.confirmEmail")}
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
        <DialogTitle>{t("activateView.activationSuccess")}</DialogTitle>

        <DialogContent sx={{ color: "text.secondary" }} className="!p-6 !pt-0">
          <div className="flex flex-col items-center justify-center gap-8">
            <Typography>{t("activateView.redirectHomepage")}</Typography>
            <div>
              <CircularProgress color="primary" size={32} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={errorDialog.value} onClose={errorDialog.onFalse}>
        <DialogTitle className="text-error-main" sx={{ color: "text.error" }}>
          {t("activateView.errorOccurred")}
        </DialogTitle>

        <DialogContent sx={{ color: "text.secondary" }} className="!p-6 !pt-0">
          <div className="flex flex-col items-center justify-center gap-8">
            <Typography>{t("activateView.errorMessage")}</Typography>
            <div className="p-2">
              <CircularProgress color="error" size={32} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
