/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMemo, useEffect, useCallback } from "react";

import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { useResponsive } from "@/hooks/use-responsive";

import { useSnackbar } from "@/components/snackbar";
import FormProvider, {
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
  RHFSelect,
} from "@/components/hook-form";

import { IMuscle, IPose } from "@/types/pose";
import { UploadBox } from "@/components/upload";
import Iconify from "@/components/iconify";
import { MenuItem } from "@mui/material";
import { LEVELS } from "@/constants/level";
import { useGetMuscles } from "@/api/muscle";

// ----------------------------------------------------------------------

type Props = {
  currentPose?: IPose;
};

export default function PoseNewEditForm({ currentPose }: Props) {
  const router = useRouter();

  const { muscles } = useGetMuscles();

  const mdUp = useResponsive("up", "md");

  const { enqueueSnackbar } = useSnackbar();

  const NewTourSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    instruction: Yup.string().required("Content is required"),
    image: Yup.mixed<any>().required("Image is required"),
    //
    muscles: Yup.array().min(1, "Must have at least 1 guide"),
    duration: Yup.number().required("Duration is required"),
    level: Yup.number().required("Level is required"),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentPose?.name || "",
      instruction: currentPose?.instruction || "",
      image: currentPose?.image || "",
      //
      muscles: currentPose?.muscles || [],
      duration: currentPose?.duration || 0,
      level: currentPose?.level || 1,
    }),
    [currentPose]
  );

  const methods = useForm({
    resolver: yupResolver(NewTourSchema),
    defaultValues,
  });

  const {
    // watch,
    reset,
    // control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();

  useEffect(() => {
    if (currentPose) {
      reset(defaultValues);
    }
  }, [currentPose, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentPose ? "Update success!" : "Create success!");
      router.push(paths.dashboard.tour.root);
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
        setValue("image", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue("image", null);
  }, [setValue]);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              {/* <Typography variant="subtitle2">Name</Typography> */}
              <RHFTextField name="name" label="Name" />
            </Stack>

            <Stack spacing={1.5}>
              {/* <Typography variant="subtitle2">Content</Typography> */}
              <RHFTextField name="instruction" label="Instruction" multiline />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Image</Typography>
              <RHFUpload
                thumbnail
                name="images"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onUpload={() => console.info("ON UPLOAD")}
              />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Keypoint</Typography>
              <UploadBox
                disabled
                placeholder={
                  <Stack spacing={0.5} alignItems="center">
                    <Iconify icon="eva:cloud-upload-fill" width={40} />
                    <Typography variant="body2">Upload .json file</Typography>
                  </Stack>
                }
                sx={{
                  flexGrow: 1,
                  height: "auto",
                  py: 2.5,
                  mb: 3,
                  width: "100%",
                }}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Additional functions and attributes...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Length
            </Typography>

            <RHFTextField name="length" label="Length" type="number" />

            <RHFSelect name="level" label="Level">
              {LEVELS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFTextField name="calories" label="Calories" type="number" />

            <RHFAutocomplete
              multiple
              name="muscles"
              label="Muscles"
              disableCloseOnSelect
              options={muscles}
              getOptionLabel={(option) => (option as IMuscle).name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderOption={(props, muscle) => (
                <li {...props} key={muscle.id}>
                  <Avatar
                    key={muscle.id}
                    alt={muscle.image}
                    src={muscle.image}
                    sx={{ width: 24, height: 24, flexShrink: 0, mr: 1 }}
                  />

                  {muscle.name}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((muscle, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={muscle.id}
                    size="small"
                    variant="soft"
                    label={muscle.name}
                    avatar={<Avatar alt={muscle.name} src={muscle.image} />}
                  />
                ))
              }
            />

            {/* <Stack spacing={1.5}>
              <Typography variant="subtitle2">Available</Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Controller
                  name="available.startDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="available.endDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
              </Stack>
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Duration</Typography>
              <RHFTextField
                name="durations"
                placeholder="Ex: 2 days, 4 days 3 nights..."
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Destination</Typography>
              <RHFAutocomplete
                name="destination"
                type="country"
                placeholder="+ Destination"
                options={countries.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2">Services</Typography>
              <RHFMultiCheckbox
                name="services"
                options={TOUR_SERVICE_OPTIONS}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                }}
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Tags</Typography>
              <RHFAutocomplete
                name="tags"
                placeholder="+ Tags"
                multiple
                freeSolo
                options={_tags.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
            </Stack> */}
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: "flex", alignItems: "center" }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPose ? "Create Tour" : "Save Changes"}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderProperties}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}
