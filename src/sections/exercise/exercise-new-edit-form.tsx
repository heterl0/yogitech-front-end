/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMemo, useEffect, useCallback, useState, ChangeEvent } from "react";

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
  RHFEditor,
  RHFUploadVideo,
} from "@/components/hook-form";

import { IMuscle } from "@/types/pose";
import { CardContent, CardMedia, MenuItem, TextField } from "@mui/material";
import { LEVELS } from "@/constants/level";
import { useGetMuscles } from "@/api/muscle";
import axiosInstance, { endpoints } from "@/utils/axios";
import { HttpStatusCode } from "axios";
import { IExercise } from "@/types/exercise";
import { benefits } from "../blog/post-new-edit-form";
// ----------------------------------------------------------------------

type Props = {
  currentExercise?: IExercise;
};

export default function ExerciseNewEditForm({ currentExercise }: Props) {
  const router = useRouter();
  // const [keypoints, setKeypoints] = useState<NormalizedLandmark[]>([]);
  const [active, setActive] = useState(
    currentExercise ? currentExercise.active_status === 1 : true
  );

  // useEffect(() => {
  //   if (currentExercise?.keypoint_url) {
  //     fetch(currentExercise.keypoint_url)
  //       .then((response) => response.json())
  //       .then((data) => setKeypoints(data))
  //       .catch((error) => console.error(error));
  //   }
  // }, [currentExercise]);

  const { muscles } = useGetMuscles();
  const [checkImageChange, setCheckImageChange] = useState(false);
  const mdUp = useResponsive("up", "md");
  const [video, setVideo] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const NewExerciseSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
    benefit: Yup.array().min(1, "Must have at least 1 tag"),
    description: Yup.string().required("Content is required"),
    image: Yup.mixed<any>().required("Image is required"),
    //
    video: Yup.mixed<any>().required("Image is required"),
    level: Yup.number().required("Level is required"),
    point: Yup.number().required("Point is required"),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentExercise?.title || "",
      benefit: currentExercise?.benefit
        ? (JSON.parse(currentExercise.benefit) as string[])
        : [],
      description: currentExercise?.description || "",
      image: currentExercise?.image || "",
      //
      video: "",
      level: currentExercise?.level || 1,
      point: currentExercise?.point || 0,
    }),
    [currentExercise]
  );

  const methods = useForm({
    resolver: yupResolver(NewExerciseSchema),
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
    if (currentExercise) {
      reset(defaultValues);
    }
  }, [currentExercise, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);

      // if (!currentExercise) {
      //   const json = JSON.stringify(keypoints);
      //   // Create a Blob from the JSON string
      //   const blob = new Blob([json], { type: "application/json" });
      //   // Create a FormData object
      //   const formData = new FormData();
      //   formData.append("keypoint", blob, "results.json");
      //   formData.append("name", data.name);
      //   formData.append("instruction", data.instruction);
      //   formData.append("image", data.image);
      //   data.muscles?.forEach((m) =>
      //     formData.append("muscle_ids", m.id.toString())
      //   );
      //   formData.append("duration", data.duration + "");
      //   formData.append("level", data.level + "");
      //   formData.append("calories", data.calories + "");
      //   formData.append("active_status", active ? "1" : "0");
      //   const response = await axiosInstance.post(
      //     endpoints.pose.create,
      //     formData
      //   );
      //   if (response.status === HttpStatusCode.Created) {
      //     enqueueSnackbar("Create success!");
      //     setTimeout(() => router.push(paths.dashboard.exercise.pose), 2000);
      //   } else {
      //     enqueueSnackbar("Create failed!");
      //   }
      // } else {
      //   const formData = new FormData();
      //   if (checkImageChange) {
      //     const json = JSON.stringify(keypoints);
      //     const blob = new Blob([json], { type: "application/json" });
      //     formData.append("keypoint", blob, "results.json");
      //     formData.append("image", data.image);
      //   }
      //   formData.append("name", data.name);
      //   formData.append("instruction", data.instruction);
      //   formData.append("image", data.image);
      //   data.muscles?.forEach((m) =>
      //     formData.append("muscle_ids", m.id.toString())
      //   );
      //   formData.append("duration", data.duration + "");
      //   formData.append("level", data.level + "");
      //   formData.append("calories", data.calories + "");
      //   formData.append("active_status", active ? "1" : "0");
      //   const response = await axiosInstance.patch(
      //     endpoints.pose.update(currentExercise.id + ""),
      //     formData
      //   );
      //   if (response.status === HttpStatusCode.Created) {
      //     enqueueSnackbar("Upload success!");
      //   } else {
      //     enqueueSnackbar("Upload failed!");
      //   }
      // }
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("image", newFile, { shouldValidate: true });
        setCheckImageChange(true);
      }
    },
    [setValue]
  );

  const handleDropVideo = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setVideo(newFile.preview);

      // const newFile = Object.assign(file, {
      //   preview: () => {
      //     return new Promise((resolve, reject) => {
      //       const reader = new FileReader();
      //       reader.onloadend = () => resolve(reader.result);
      //       reader.onerror = reject;
      //       reader.readAsDataURL(file);
      //     });
      //   },
      // });
      console.log(newFile);

      if (file) {
        setValue("video", newFile, { shouldValidate: true });
        setCheckImageChange(true);
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue("image", null);
  }, [setValue]);

  const handleRemoveFileVideo = useCallback(() => {
    setValue("video", null);
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
              <RHFTextField name="title" label="Title" />
            </Stack>

            <RHFAutocomplete
              name="benefit"
              label="Benefits"
              placeholder="+ Benefits"
              multiple
              freeSolo
              options={benefits.map((option) => option)}
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

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Description</Typography>
              <RHFEditor simple name="description" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Image</Typography>
              <RHFUpload
                thumbnail
                name="image"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onUpload={() => console.info("ON UPLOAD")}
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
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Video</Typography>
              <RHFUploadVideo
                thumbnail
                name="video"
                // maxSize={3145728}
                onDrop={handleDropVideo}
                onRemove={handleRemoveFileVideo}
                onUpload={() => console.info("ON UPLOAD")}
              />
            </Stack>

            <RHFTextField name="duration" label="Length" type="number" />

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
          control={
            <Switch
              checked={active}
              onChange={(
                event: ChangeEvent<HTMLInputElement>,
                checked: boolean
              ) => setActive(checked)}
            />
          }
          label="Active"
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentExercise ? "Create Pose" : "Update Pose"}
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
