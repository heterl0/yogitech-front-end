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
import { GENDER } from "@/constants/gender";
// import { set } from "lodash";
import { fShortenNumber } from "@/utils/format-number";
import Label from "@/components/label";
import BmiScore from "../../constants/bmi-score";
import axiosInstance, { endpoints } from "@/utils/axios";
import { HttpStatusCode } from "axios";
import { paths } from "@/routes/paths";
// ----------------------------------------------------------------------

type Props = {
  currentProfile?: IProfile;
};

export default function ProfileEditForm({ currentProfile }: Props) {
  const router = useRouter();

  const [date, setDate] = useState(
    currentProfile?.birthdate ? new Date(currentProfile?.birthdate) : new Date()
  );

  const { enqueueSnackbar } = useSnackbar();

  const ProfileSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    avatar: Yup.mixed<any>().nullable(),
    gender: Yup.number().required("Gender is require"),
    height: Yup.number().required("Height is required"),
    weight: Yup.number().required("Weight is required"),
    level: Yup.number().required("Level is required"),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: currentProfile?.first_name || "",
      last_name: currentProfile?.last_name || "",
      avatar: currentProfile?.avatar_url || "",
      gender: currentProfile?.gender || -1,
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
      formData.append("avatar", data.avatar);
      formData.append("bmi", fShortenNumber(bmi) + "");
      const response = await axiosInstance.patch(
        endpoints.profile.details(currentProfile?.id + ""),
        formData
      );

      if (response.status === HttpStatusCode.Ok) {
        enqueueSnackbar("Update success!");
        router.push(paths.dashboard.user.root);
      } else {
        enqueueSnackbar("Update failed!", { variant: "error" });
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
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} gap={1} className="!flex-nowrap">
        <Grid xs={12} md={4}>
          <Card sx={{ p: 3, pt: 4 }}>
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
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
            <Grid container spacing={3} sx={{ p: 4 }}>
              <Grid xs={6} justifyContent={"center"} alignItems={"center"}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 0.5, textAlign: "center" }}
                >
                  Experience Point
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  {currentProfile?.exp}
                </Typography>
              </Grid>
              <Grid xs={6} justifyContent={"center"} alignItems={"center"}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 0.5, textAlign: "center" }}
                >
                  Point
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  {currentProfile?.point}
                </Typography>
              </Grid>
              <Grid xs={6} justifyContent={"center"} alignItems={"center"}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 0.5, textAlign: "center" }}
                >
                  Streak
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  {currentProfile?.streak}
                </Typography>
              </Grid>
              <Grid xs={6} justifyContent={"center"} alignItems={"center"}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 0.5, textAlign: "center" }}
                >
                  BMI
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  <Label color={BmiScore(bmi).color}>
                    {fShortenNumber(bmi) || 0}
                  </Label>
                </Typography>
              </Grid>
            </Grid>
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
              <RHFTextField name="last_name" label="Last Name" />
              <RHFTextField name="first_name" label="First Name" />
              <RHFSelect name="gender" label="Gender">
                {GENDER.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <DesktopDatePicker
                label="Birth Date"
                name="birthdate"
                value={date}
                onChange={(value) => setDate(value as Date)}
                maxDate={new Date()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
              <RHFTextField name="height" label="Height (cm)" type="number" />
              <RHFTextField name="weight" label="Weight (kg)" type="number" />
              <RHFSelect name="level" label="Level">
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
                {!currentProfile ? "Create User" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
