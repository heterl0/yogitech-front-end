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

import { useResponsive } from "@/hooks/use-responsive";

import FormProvider, {
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
  RHFSelect,
  RHFEditor,
  RHFUploadVideo,
} from "@/components/hook-form";

import { IPose } from "@/types/pose";
import { Box, MenuItem } from "@mui/material";
import { LEVELS } from "@/constants/level";
import { IExercise, IPoseWithTime } from "@/types/exercise";
import { benefits } from "../blog/post-new-edit-form";
import ExercisePoseList from "./exercise-pose-list";
// ----------------------------------------------------------------------

type Props = {
  currentExercise?: IExercise;
  poses: IPose[];
};

export default function ExerciseNewEditForm({ currentExercise, poses }: Props) {
  // const [keypoints, setKeypoints] = useState<NormalizedLandmark[]>([]);

  const [poseSelectedIndex, setPoseSelectedIndex] = useState(-1);
  const [poseExercises, setPoseExercises] = useState<IPoseWithTime[]>([]);
  const [active, setActive] = useState(
    currentExercise ? currentExercise.active_status === 1 : true
  );

  const handleRemovePose = useCallback(
    (index: number) => {
      setPoseExercises((prevPoseExercises) =>
        prevPoseExercises.filter((_, i) => i !== index)
      );
      setPoseSelectedIndex(
        index === poseSelectedIndex
          ? poseSelectedIndex === 0
            ? poseSelectedIndex
            : poseSelectedIndex - 1
          : poseSelectedIndex
      );
    },
    [poseSelectedIndex]
  );

  const mdUp = useResponsive("up", "md");

  const NewExerciseSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
    benefit: Yup.array().min(1, "Must have at least 1 tag"),
    description: Yup.string().required("Content is required"),
    image: Yup.mixed<any>().required("Image is required"),
    //
    video: Yup.mixed<any>().required("Image is required"),
    level: Yup.number().required("Level is required"),
    point: Yup.number().required("Point is required"),
    pose: Yup.mixed<any>(),
    minute: Yup.number(),
    second: Yup.number(),
    inSecond: Yup.number(),
    duration: Yup.number(),
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
      pose: poses[0] || { id: -1, name: "Not Select" },
      minute: 0,
      second: 0,
      inSecond: 0,
      duration: 0,
    }),
    [
      currentExercise?.benefit,
      currentExercise?.description,
      currentExercise?.image,
      currentExercise?.level,
      currentExercise?.point,
      currentExercise?.title,
      poses,
    ]
  );

  const methods = useForm({
    resolver: yupResolver(NewExerciseSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    // control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

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

  const handleSelectedPose = useCallback((index: number) => {
    setPoseSelectedIndex(index);
  }, []);

  const handleAppendPose = useCallback(() => {
    const pose = poses[0];
    if (pose) {
      setPoseExercises((prev) => [
        ...prev,
        {
          pose: pose,
          duration: pose.duration,
          time: 0,
        },
      ]);
      setPoseSelectedIndex(poseExercises.length);
    }
  }, [poseExercises.length, poses]);

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
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

  const handleDropVideo = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      console.log(newFile);

      if (file) {
        setValue("video", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (poseSelectedIndex !== -1) {
      const poseWithTime = poseExercises[poseSelectedIndex];
      setValue("pose", poseWithTime.pose, { shouldValidate: true });
      setValue("second", poseWithTime.time % 60);
      setValue("minute", (poseWithTime.time - (poseWithTime.time % 60)) / 60);
      setValue("inSecond", poseWithTime.time);
      setValue("duration", poseWithTime.duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poseSelectedIndex]);

  const handleRemoveFile = useCallback(() => {
    setValue("image", null);
  }, [setValue]);

  const handleRemoveFileVideo = useCallback(() => {
    setValue("video", null);
  }, [setValue]);

  const handleUpdateSelectedPose = useCallback(() => {
    const updatedPoseExercises = [...poseExercises];
    if (values.pose) {
      const newPoseWithTime: IPoseWithTime = {
        duration: 0,
        time: 0,
        pose: values.pose,
      };
      if (values.duration) {
        newPoseWithTime.duration = values.duration;
      }
      if (values.inSecond) {
        newPoseWithTime.time = values.inSecond;
      }
      updatedPoseExercises[poseSelectedIndex] = {
        ...updatedPoseExercises[poseSelectedIndex],
        ...newPoseWithTime,
      };
      setPoseExercises(updatedPoseExercises);
    }
  }, [
    poseExercises,
    poseSelectedIndex,
    values.duration,
    values.inSecond,
    values.pose,
  ]);

  const handleInputTime = useCallback(() => {
    let inSecond = 0;
    if (values.minute || values.minute === 0) {
      inSecond = values.minute * 60;
    }
    if (values.second || values.second === 0) {
      inSecond = inSecond + values.second;
    }
    setValue("inSecond", inSecond);
    handleUpdateSelectedPose();
  }, [handleUpdateSelectedPose, setValue, values.minute, values.second]);

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
                onDelete={handleRemoveFile}
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
                onDelete={handleRemoveFileVideo}
                onUpload={() => console.info("ON UPLOAD")}
              />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Poses</Typography>
              <ExercisePoseList
                poseSelectedIndex={poseSelectedIndex}
                onRemove={handleRemovePose}
                onSelect={handleSelectedPose}
                posesWithTime={poseExercises}
                onAppend={handleAppendPose}
              />
            </Stack>
            {poseSelectedIndex !== -1 && poseExercises.length > 0 && (
              <>
                <Stack spacing={1.5}>
                  <RHFAutocomplete
                    name="pose"
                    label="Pose"
                    options={poses}
                    onSelect={handleUpdateSelectedPose}
                    getOptionLabel={(option) => (option as IPose).name}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderOption={(props, pose) => (
                      <li {...props} key={pose.id}>
                        <Avatar
                          key={pose.id}
                          alt={pose.image_url}
                          src={pose.image_url}
                          sx={{ width: 24, height: 24, flexShrink: 0, mr: 1 }}
                        />

                        {pose.name}
                      </li>
                    )}
                    renderTags={(selected, getTagProps) =>
                      selected.map((pose, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={pose.id}
                          size="small"
                          variant="soft"
                          label={pose.name}
                          avatar={
                            <Avatar alt={pose.name} src={pose.image_url} />
                          }
                        />
                      ))
                    }
                  />
                </Stack>

                <Box
                  gap={3}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                >
                  <RHFTextField
                    type="number"
                    name="minute"
                    label="Minute"
                    onBlur={handleInputTime}
                  />
                  <RHFTextField
                    type="number"
                    name="second"
                    label="Second"
                    onBlur={handleInputTime}
                  />
                  <RHFTextField
                    type="number"
                    disabled
                    name="inSecond"
                    label="In Seconds"
                  />
                </Box>
                <RHFTextField
                  type="number"
                  name="duration"
                  label="Duration"
                  onBlur={handleUpdateSelectedPose}
                />
              </>
            )}
            <RHFSelect name="level" label="Level">
              {LEVELS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFTextField name="calories" label="Calories" type="number" />
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
