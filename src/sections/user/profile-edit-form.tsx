/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { useMemo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";
import { useRouter } from "@/routes/hooks";

import { fData } from "@/utils/format-number";

import { useSnackbar } from "@/components/snackbar";
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from "@/components/hook-form";

import { IProfile } from "@/types/user";
import { Grid, MenuItem } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LEVELS } from "@/constants/level";
// import { set } from "lodash";
import { fShortenNumber } from "@/utils/format-number";
import Label from "@/components/label";
import BmiScore from "../../constants/bmi-score";
import axiosInstance, { endpoints } from "@/utils/axios";
import { HttpStatusCode } from "axios";
import { paths } from "@/routes/paths";
import { useBoolean } from "@/hooks/use-boolean";
import { KeyedMutator } from "swr";
import { useLocales } from "@/locales";
import { format } from "date-fns";
// ----------------------------------------------------------------------

type Props = {
  currentProfile?: IProfile;
  mutate: KeyedMutator<any>;
};

export default function ProfileEditForm({ currentProfile, mutate }: Props) {
  const { t } = useTranslation();
  const router = useRouter();

  const [date, setDate] = useState(
    currentProfile?.birthdate ? new Date(currentProfile?.birthdate) : new Date()
  );

  const { currentLang } = useLocales();

  const dateFormatter = useCallback(
    (weekday: Date) =>
      format(weekday, "iiiiii", { locale: currentLang.adapterLocale }),
    [currentLang]
  );

  const GENDER = [
    { label: t("userPage.male"), value: 1 },
    { label: t("userPage.female"), value: 0 },
    { label: t("userPage.other"), value: 2 },
  ];

  const changeImage = useBoolean(false);

  const { enqueueSnackbar } = useSnackbar();

  const ProfileSchema = Yup.object().shape({
    first_name: Yup.string().required(t("userPage.first_name_required")),
    last_name: Yup.string().required(t("userPage.last_name_required")),
    avatar: Yup.mixed<any>().nullable(),
    gender: Yup.number().required(t("userPage.gender_required")),
    height: Yup.number().required(t("userPage.height_required")),
    weight: Yup.number().required(t("userPage.weight_required")),
    level: Yup.number().required(t("userPage.level_required")),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: currentProfile?.first_name || "",
      last_name: currentProfile?.last_name || "",
      avatar: currentProfile?.avatar_url || "",
      gender: currentProfile?.gender || 0,
      height: currentProfile?.height || 0,
      weight: currentProfile?.weight || 0,
      level: currentProfile?.level || 1,
    }),
    [currentProfile]
  );

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const bmi = useMemo(() => {
    const height = values.height / 100;
    const weight = values.weight;
    return weight / (height * height);
  }, [values.height, values.weight]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("gender", data.gender + "");
      formData.append("height", data.height + "");
      formData.append("weight", data.weight + "");
      formData.append("level", data.level + "");
      formData.append("birthdate", date.toISOString());
      if (changeImage.value) formData.append("avatar", data.avatar);
      formData.append("bmi", bmi.toFixed(2) + "");
      const response = await axiosInstance.patch(
        endpoints.profile.details(currentProfile?.id + ""),
        formData
      );

      if (response.status === HttpStatusCode.Ok) {
        enqueueSnackbar(t("userPage.update_success"));
        mutate({
          ...currentProfile,
          ...response.data,
        });
        router.push(paths.dashboard.user.root);
      } else {
        enqueueSnackbar(t("userPage.update_failed"), { variant: "error" });
      }
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
        changeImage.onTrue();
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [changeImage, setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} gap={3} className="!flex-nowrap">
        <Grid xs={12} md={4}>
          <Card sx={{ pb: 5, pt: 10, px: 3 }} className="flex flex-col gap-10">
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatar"
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
                    {t("userPage.allowed_file_types")}
                    <br /> {t("userPage.max_size", { size: fData(3145728) })}
                  </Typography>
                }
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ color: "text.secondary", textAlign: "center" }}
            >
              {currentProfile?.exp} {t("userPage.exp")}
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              paddingX={3}
              paddingY={2}
            >
              <Stack direction={"column"} gap={0.5} width={1 / 3}>
                <Typography
                  variant="caption"
                  sx={{ mb: 0.5, textAlign: "center" }}
                >
                  {t("userPage.point")}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  {currentProfile?.point}
                </Typography>
              </Stack>
              <Stack direction={"column"} gap={0.5} width={1 / 3}>
                <Typography
                  variant="caption"
                  sx={{ mb: 0.5, textAlign: "center" }}
                >
                  {t("userPage.streak")}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  {currentProfile?.streak}
                </Typography>
              </Stack>
              <Stack direction={"column"} gap={0.5} width={1 / 3}>
                <Typography
                  variant="caption"
                  sx={{ mb: 0.5, textAlign: "center" }}
                >
                  {t("userPage.bmi")}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  <Label color={BmiScore(bmi).color}>
                    {fShortenNumber(bmi) || 0}
                  </Label>
                </Typography>
              </Stack>
            </Stack>
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
              <RHFTextField name="last_name" label={t("userPage.last_name")} />
              <RHFTextField
                name="first_name"
                label={t("userPage.first_name")}
              />
              <RHFSelect name="gender" label={t("userPage.gender")}>
                {GENDER.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <DesktopDatePicker
                label={t("userPage.birth_date")}
                name="birthdate"
                value={date}
                onChange={(value) => setDate(value as Date)}
                maxDate={new Date()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
                dayOfWeekFormatter={dateFormatter}
              />
              <RHFTextField
                name="height"
                label={t("userPage.height")}
                type="number"
              />
              <RHFTextField
                name="weight"
                label={t("userPage.weight")}
                type="number"
              />
              <RHFSelect name="level" label={t("userPage.level")}>
                {LEVELS.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!currentProfile
                  ? t("userPage.create_user")
                  : t("userPage.save_changes")}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
