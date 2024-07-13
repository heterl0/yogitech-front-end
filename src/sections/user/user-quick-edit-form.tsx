import * as Yup from "yup";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
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

// import { countries } from "@/assets/data";
import { USER_STATUS_OPTIONS } from "@/_mock";

import { useSnackbar } from "@/components/snackbar";
import FormProvider, {
  RHFSelect,
  RHFTextField,
  // RHFAutocomplete,
} from "@/components/hook-form";

import { IAccount } from "@/types/user";
import axiosInstance, { endpoints } from "@/utils/axios";
import { HttpStatusCode } from "axios";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentUser?: IAccount;
  onQuickEdit: (data: IAccount, isCreated: boolean) => void;
};

type UpdateData = {
  phone: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_premium?: boolean;
  active_status?: number;
};

export default function UserQuickEditForm({
  currentUser,
  open,
  onClose,
  onQuickEdit,
}: Props) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const NewAccountSchema = Yup.object().shape({
    username: Yup.string().required(t("name_required")),
    email: Yup.string().required(t("email_required")).email(t("email_invalid")),
    phone: Yup.string()
      .required(t("phone_required"))
      .matches(
        /^\+?[0-9]{1,3}?[-. ]?([0-9]{2,3}[-. ]?){2,3}[0-9]$/,
        t("form.validation.phone_format")
      ),
    status: Yup.string().required(t("status_required")),
    role: Yup.string().required(t("role_required")),
    provider: Yup.string().required(t("provider_required")),
  });
  const defaultValues = useMemo(
    () => ({
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      status:
        currentUser?.active_status === 0
          ? "banned"
          : currentUser?.is_active
            ? "active"
            : "pending",
      role: currentUser?.is_staff
        ? "Admin"
        : currentUser?.is_premium
          ? "Premium User"
          : "User",
      provider: currentUser?.auth_provider || "",
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewAccountSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues]);

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updateData: UpdateData = {
        phone: data.phone,
      };
      if (data.status === "banned") {
        updateData.active_status = 0;
      }
      if (data.status === "active") {
        updateData.is_active = true;
        updateData.active_status = 1;
      }
      if (data.status === "pending") {
        updateData.is_active = false;
        updateData.active_status = 1;
      }
      if (data.role === "Admin") {
        updateData.is_staff = true;
      }
      if (data.role === "Premium User") {
        updateData.is_premium = true;
      }
      if (data.role === "User") {
        updateData.is_staff = false;
        updateData.is_premium = false;
      }
      const response = await axiosInstance.patch(
        `${endpoints.account.details}${currentUser?.id}/`,
        updateData
      );
      await axiosInstance.patch(
        `${endpoints.profile.details}${currentUser?.profile.id}/`,
        { active_status: updateData.active_status }
      );
      if (response.status === HttpStatusCode.Ok) {
        onClose();
        enqueueSnackbar(t("update_success"));
        onQuickEdit(response.data, false);
      } else {
        enqueueSnackbar(t("update_failed"), { variant: "error" });
      }
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
        <DialogTitle>{t("quick_update")}</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            {t("account_waiting_confirmation")}
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
            <RHFTextField name="username" disabled label={t("username")} />
            <RHFTextField name="email" disabled label={t("email_address")} />

            <RHFSelect name="status" label={t("status")}>
              {USER_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {t(`accountListView.tabs.${status.value}`)}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFTextField name="phone" label={t("phone_number")} />

            <RHFSelect name="role" label={t("role")}>
              {["Admin", "Premium User", "User"].map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect name="provider" label={t("provider")} disabled>
              {["Email", "Google"].map((value) => (
                <MenuItem key={value} value={value.toLowerCase()}>
                  {value}
                </MenuItem>
              ))}
            </RHFSelect>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {t("cancel")}
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t("update")}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
