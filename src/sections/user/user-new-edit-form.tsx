/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { useMemo, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTranslation } from "react-i18next";
import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { fData } from "@/utils/format-number";

import { countries } from "@/assets/data";

import Label from "@/components/label";
import { useSnackbar } from "@/components/snackbar";
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from "@/components/hook-form";

import { IUserItem } from "@/types/user";

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem;
};

export default function UserNewEditForm({ currentUser }: Props) {
  const { t } = useTranslation();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required(t("form.validation.name_required")),
    email: Yup.string()
      .required(t("form.validation.email_required"))
      .email(t("form.validation.email_invalid")),
    phoneNumber: Yup.string().required(t("form.validation.phone_required")),
    address: Yup.string().required(t("form.validation.address_required")),
    country: Yup.string().required(t("form.validation.country_required")),
    company: Yup.string().required(t("form.validation.company_required")),
    state: Yup.string().required(t("form.validation.state_required")),
    city: Yup.string().required(t("form.validation.city_required")),
    role: Yup.string().required(t("form.validation.role_required")),
    zipCode: Yup.string().required(t("form.validation.zip_required")),
    avatarUrl: Yup.mixed<any>()
      .nullable()
      .required(t("form.validation.avatar_required")),
    // not required
    status: Yup.string(),
    isVerified: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || "",
      city: currentUser?.city || "",
      role: currentUser?.role || "",
      email: currentUser?.email || "",
      state: currentUser?.state || "",
      status: currentUser?.status || "",
      address: currentUser?.address || "",
      country: currentUser?.country || "",
      zipCode: currentUser?.zipCode || "",
      company: currentUser?.company || "",
      avatarUrl: currentUser?.avatarUrl || null,
      phoneNumber: currentUser?.phoneNumber || "",
      isVerified: currentUser?.isVerified || true,
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(
        currentUser ? t("form.update_success") : t("form.create_success")
      );
      router.push(paths.dashboard.user.list);
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatarUrl", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === "active" && "success") ||
                  (values.status === "banned" && "error") ||
                  "warning"
                }
                sx={{ position: "absolute", top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.disabled",
                    }}
                  >
                    {t("form.helper_text.avatar")}
                    <br />{" "}
                    {t("form.helper_text.max_size", { size: fData(3145728) })}
                  </Typography>
                }
              />
            </Box>

            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== "active"}
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
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: "space-between" }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    {t("form.label.email_verified")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {t("form.helper_text.verification_email")}
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: "space-between" }}
            />

            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  {t("form.action.delete_user")}
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
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
              <RHFTextField name="name" label={t("form.label.full_name")} />
              <RHFTextField
                name="email"
                label={t("form.label.email_address")}
              />
              <RHFTextField
                name="phoneNumber"
                label={t("form.label.phone_number")}
              />

              <RHFAutocomplete
                name="country"
                type="country"
                label={t("form.label.country")}
                placeholder={t("form.placeholder.choose_country")}
                fullWidth
                options={countries.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField name="state" label={t("form.label.state_region")} />
              <RHFTextField name="city" label={t("form.label.city")} />
              <RHFTextField name="address" label={t("form.label.address")} />
              <RHFTextField name="zipCode" label={t("form.label.zip_code")} />
              <RHFTextField name="company" label={t("form.label.company")} />
              <RHFTextField name="role" label={t("form.label.role")} />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!currentUser
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
