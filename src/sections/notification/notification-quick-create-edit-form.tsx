import * as Yup from "yup";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from "react-i18next";

// import { countries } from "@/assets/data";
import { useSnackbar } from "@/components/snackbar";
import FormProvider, {
  RHFSelect,
  RHFTextField,
  // RHFAutocomplete,
} from "@/components/hook-form";

import axiosInstance, { endpoints } from "@/utils/axios";
import { HttpStatusCode } from "axios";
import { INotification, NOTIFICATION_STATUS } from "@/types/notification";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { FormControlLabel, Switch, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentNotification?: INotification;
};

export default function NotificationQuickCreateEditForm({
  currentNotification,
  open,
  onClose,
}: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { enqueueSnackbar } = useSnackbar();
  const [date, setDate] = useState(
    currentNotification?.time ? new Date(currentNotification?.time) : new Date()
  );
  const NewAccountSchema = Yup.object().shape({
    status: Yup.number().required(t("notiPage.Statusisrequired")),
    title: Yup.string().required(t("notiPage.Titleisrequired")),
    body: Yup.string().required(t("notiPage.Bodyisrequired")),
    is_admin: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      status: currentNotification?.active_status ?? 1,
      title: currentNotification?.title || "",
      body: currentNotification?.body || "",
      is_admin: currentNotification?.is_admin || true,
    }),
    [currentNotification]
  );

  const methods = useForm({
    resolver: yupResolver(NewAccountSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      const fromData = new FormData();
      fromData.append("title", data.title);
      fromData.append("body", data.body);
      fromData.append("time", date.toISOString());
      fromData.append("active_status", data.status.toString());
      fromData.append("is_admin", data.is_admin ? 1 + "" : 0 + "");
      if (currentNotification) {
        const res = await axiosInstance.put(
          endpoints.notification.update(currentNotification.id.toString()),
          fromData
        );
        if (res.status === HttpStatusCode.Ok) {
          enqueueSnackbar(t("notiPage.Notificationupdatedsuccessfully"), {
            variant: "success",
          });
          onClose();
        }
      } else {
        const res = await axiosInstance.post(
          endpoints.notification.create,
          fromData
        );
        if (res.status === HttpStatusCode.Created) {
          enqueueSnackbar(t("notiPage.Notificationcreatedsuccessfully"), {
            variant: "success",
          });
          onClose();
        }
      }
      router.push(pathname);
    } catch (error) {
      reset();
      onClose();
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>
          {currentNotification
            ? t("notiPage.Editnotification")
            : t("notiPage.Createnotification")}
        </DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            {t("notiPage.Notificationiswaitingforconfirmation")}
          </Alert>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <RHFTextField name="title" label="Title" />
            <MobileDateTimePicker
              label="Time"
              name="time"
              value={date}
              onChange={(newValue) => {
                setDate(newValue as Date);
              }}
            />

            <RHFSelect name="status" label="Status">
              {NOTIFICATION_STATUS.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField name="body" label="Body" multiline rows={4} />
            <FormControlLabel
              labelPlacement="end"
              className="!justify-start"
              control={
                <Controller
                  name="is_admin"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={(event) => field.onChange(event.target.checked)}
                    />
                  )}
                />
              }
              label={
                <>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    {t("notiPage.Announcetoallusers")}
                  </Typography>
                </>
              }
              sx={{ mx: 0, mb: 0, width: 1, justifyContent: "space-between" }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {t("notiPage.Cancel")}
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {currentNotification ? t("notiPage.Update") : t("notiPage.Create")}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
