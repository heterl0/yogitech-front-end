/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { useMemo, useCallback } from "react";
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
  RHFTextField,
  RHFUploadAvatar,
} from "@/components/hook-form";

import { IProfile } from "@/types/user";
import { Grid } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  currentProfile?: IProfile;
};

export default function ProfileEditForm({ currentProfile }: Props) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const ProfileSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    point: Yup.number().required("Point is required"),
    exp: Yup.number().required("Exp is required"),
    streak: Yup.number().required("Streak is required"),
    avatar: Yup.string().required("Avatar is required"),
    gender: Yup.string().required("Gender is require"),
    birthdate: Yup.string().required("Birthdate is required"),
    height: Yup.number().required("Height is required"),
    weight: Yup.number().required("Weight is required"),
    bmi: Yup.number().required("BMI is required"),
    active_status: Yup.number().required("Active status is required"),
    level: Yup.number().required("Level is required"),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: currentProfile?.first_name || "",
      last_name: currentProfile?.last_name || "",
      point: currentProfile?.point || 0,
      exp: currentProfile?.exp || 0,
      streak: currentProfile?.streak || 0,
      avatar: currentProfile?.avatar || "",
      gender: currentProfile?.gender
        ? currentProfile.gender === 0
          ? "Female"
          : "Male"
        : "Not set",
      birthdate: currentProfile?.birthdate || "",
      height: currentProfile?.height || 0,
      weight: currentProfile?.weight || 0,
      bmi: currentProfile?.bmi || 0,
      active_status: currentProfile?.active_status || 0,
      level: currentProfile?.level,
    }),
    [currentProfile]
  );

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentProfile ? "Update success!" : "Create success!");
      // router.push(paths.dashboard.user.list);
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

      // if (file) {
      //   setValue("avatar", newFile, { shouldValidate: true });
      // }
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
                  {currentProfile?.bmi}
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
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="height" label="Height" type="number" />
              <RHFTextField name="weight" label="Weight" type="number" />
              <RHFTextField name="level" label="Level" type="number" />
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
