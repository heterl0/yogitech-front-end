import * as Yup from "yup";
import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import Label from "@/components/label";
import { useSnackbar } from "@/components/snackbar";
import FormProvider, { RHFTextField, RHFSelect } from "@/components/hook-form";

import { IAccount } from "@/types/user";
import { MenuItem } from "@mui/material";
import { USER_STATUS_OPTIONS } from "@/_mock";
import UserCard from "../user/user-card";
import axiosInstance, { endpoints } from "@/utils/axios";
import { HttpStatusCode } from "axios";

// ----------------------------------------------------------------------

type Props = {
  currentAccount?: IAccount;
};

type CreateData = {
  username: string;
  email: string;
  password: string;
  phone: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_premium?: boolean;
  active_status?: number;
  auth_provider: string;
};

type UpdateData = {
  phone: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_premium?: boolean;
  active_status?: number;
};

export default function AccountNewEditForm({ currentAccount }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  console.log("currentAccount", currentAccount);

  const { enqueueSnackbar } = useSnackbar();

  const NewAccountSchema = Yup.object().shape({
    username: Yup.string().required(t("form.validation.name_required")),
    email: Yup.string()
      .required(t("form.validation.email_required"))
      .email(t("form.validation.email_invalid")),
    phone: Yup.string().required(t("form.validation.phone_required")),
    status: Yup.string().required(t("form.validation.status_required")),
    role: Yup.string().required(t("form.validation.role_required")),
    provider: Yup.string().required(t("form.validation.provider_required")),
    password: Yup.string().required(t("form.validation.password_required")),
  });

  const defaultValues = useMemo(
    () => ({
      username: currentAccount?.username || "",
      email: currentAccount?.email || "",
      phone: currentAccount?.phone || "",
      status:
        currentAccount?.active_status === 0
          ? "banned"
          : currentAccount?.is_active
            ? "active"
            : "pending",
      role: currentAccount?.is_staff
        ? "Admin"
        : currentAccount?.is_premium
          ? "Premium User"
          : "User",
      provider: currentAccount?.auth_provider || "",
      password: currentAccount ? " " : "",
    }),
    [currentAccount]
  );

  const methods = useForm({
    resolver: yupResolver(NewAccountSchema),
    defaultValues,
  });

  const {
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentAccount) {
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
          `${endpoints.account.details}${currentAccount?.id}/`,
          updateData
        );
        if (response.status === HttpStatusCode.Ok) {
          enqueueSnackbar(t("form.update_success"));
          router.push(paths.dashboard.account.root);
        } else {
          enqueueSnackbar(t("form.update_failed", { data: response.data }), {
            variant: "error",
          });
        }
      } else {
        const createData: CreateData = {
          username: data.username,
          email: data.email,
          phone: data.phone,
          password: data.password,
          auth_provider: data.provider,
        };

        if (data.status === "banned") {
          createData.active_status = 0;
        }
        if (data.status === "active") {
          createData.is_active = true;
          createData.active_status = 1;
        }
        if (data.status === "pending") {
          createData.is_active = false;
          createData.active_status = 1;
        }
        if (data.role === "Admin") {
          createData.is_staff = true;
        }
        if (data.role === "Premium User") {
          createData.is_premium = true;
        }
        if (data.role === "User") {
          createData.is_staff = false;
          createData.is_premium = false;
        }
        const response = await axiosInstance.post(
          `${endpoints.account.create}`,
          createData
        );
        if (response.status === HttpStatusCode.Created) {
          enqueueSnackbar(t("form.create_success"));
          router.push(paths.dashboard.account.root);
        } else {
          enqueueSnackbar(t("form.create_failed", { data: response.data }), {
            variant: "error",
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {currentAccount && (
          <Grid xs={12} md={4}>
            <Card sx={{ pt: 3, pb: 3, px: 3 }}>
              {currentAccount && (
                <Label
                  color={
                    (values.status === "active" && "success") ||
                    (values.status === "banned" && "error") ||
                    "warning"
                  }
                  sx={{
                    position: "absolute",
                    bottom: 228,
                    right: 36,
                    zIndex: 9,
                  }}
                >
                  {values.status}
                </Label>
              )}

              {currentAccount && (
                <UserCard userProfile={currentAccount.profile} />
              )}
            </Card>
          </Grid>
        )}

        <Grid xs={12} md={currentAccount ? 8 : 12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField
                name="username"
                disabled={currentAccount ? true : false}
                label={t("form.label.username")}
              />
              <RHFTextField
                name="email"
                disabled={currentAccount ? true : false}
                label={t("form.label.email_address")}
              />

              {!currentAccount && (
                <RHFTextField
                  name="password"
                  type="password"
                  label={t("form.label.password")}
                />
              )}

              <RHFSelect name="status" label={t("form.label.status")}>
                {USER_STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField name="phone" label={t("form.label.phone_number")} />

              <RHFSelect name="role" label={t("form.label.role")}>
                {["Admin", "Premium User", "User"].map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFSelect name="provider" label={t("form.label.provider")}>
                {["Email", "Google"].map((value) => (
                  <MenuItem key={value} value={value.toLowerCase()}>
                    {value}
                  </MenuItem>
                ))}
              </RHFSelect>
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value === "active"}
                        onChange={(event) =>
                          field.onChange(
                            event.target.checked ? "active" : "pending"
                          )
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      {t("form.label.email_verified")}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {t("form.helper_text.verification_email")}
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 0, width: 1, justifyContent: "space-between" }}
              />

              {currentAccount && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          checked={field.value === "banned"}
                          onChange={(event) =>
                            field.onChange(
                              event.target.checked ? "banned" : "active"
                            )
                          }
                        />
                      )}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        {t("form.label.banned")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {t("form.helper_text.disable_account")}
                      </Typography>
                    </>
                  }
                  sx={{
                    mx: 0,
                    mb: 0,
                    width: 1,
                    justifyContent: "space-between",
                  }}
                />
              )}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!currentAccount
                  ? t("form.action.create_user")
                  : t("form.action.save_changes")}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
