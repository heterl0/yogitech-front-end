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
import axiosInstance, { endpoints } from "@/utils/axios";
import { HttpStatusCode } from "axios";
import { useSnackbar } from "notistack";
import { paths } from "@/routes/paths";
import { fShortenNumber } from "@/utils/format-number";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

type Props = {
  currentExercise?: IExercise;
  poses: IPose[];
};

export type ExerciseParams = {
  title?: string;
  image?: string;
  duration?: number;
  level?: number;
  poses_id?: { id: number; time: number; duration: number }[];
  benefit?: string;
  description?: string;
  calories?: string;
  number_poses?: number;
  point?: number;
  is_premium?: boolean;
  active_status?: number;
};

export default function ExerciseNewEditForm({ currentExercise, poses }: Props) {
  // const [keypoints, setKeypoints] = useState<NormalizedLandmark[]>([]);
  const router = useRouter();
  const [checkVideoChange, setCheckVideoChange] = useState(false);
  const [checkImageChange, setCheckImageChange] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [poseSelectedIndex, setPoseSelectedIndex] = useState(
    currentExercise?.poses ? 0 : -1
  );
  const [poseExercises, setPoseExercises] = useState<IPoseWithTime[]>(
    currentExercise?.poses || []
  );
  const [active, setActive] = useState(true);
  const { t } = useTranslation();
  const [isPremium, setIsPremium] = useState(false);

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
    title: Yup.string().required(t("exercisePage.nameIsRequired")),
    benefit: Yup.array().min(1, t("exercisePage.mustHaveAtLeastOneTag")),
    description: Yup.string().required(t("exercisePage.descriptionIsRequired")),
    image: Yup.mixed<any>().required(t("exercisePage.imageIsRequired")),
    //
    video: Yup.mixed<any>().required(t("exercisePage.videoIsRequired")),
    level: Yup.number().required(t("exercisePage.levelIsRequired")),
    point: Yup.number().required(t("exercisePage.pointIsRequired")),
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
        ? (JSON.parse(currentExercise?.benefit) as string[])
        : [],
      description: currentExercise?.description || "",
      image: currentExercise?.image_url || "",
      //
      video: currentExercise?.video_url || "",
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
      currentExercise?.image_url,
      currentExercise?.level,
      currentExercise?.point,
      currentExercise?.title,
      currentExercise?.video_url,
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
      setPoseExercises(currentExercise.poses || []);
      setPoseSelectedIndex(currentExercise.poses ? 0 : -1);
      setActive(currentExercise.active_status === 1);
      setIsPremium(currentExercise.is_premium);
    }
  }, [currentExercise, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);

      if (!currentExercise) {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("image", data.image);
        formData.append("video", data.video);
        let duration = 0;
        let calories = 0;
        poseExercises.forEach((p) => {
          formData.append("pose", p.pose.id.toString());
          formData.append("time", p.time + "");
          formData.append("duration", p.duration + "");
          duration += p.duration;
          calories += (p.pose.calories * p.duration) / p.pose.duration;
        });
        formData.append("duration", duration + "");
        formData.append("level", data.level + "");
        formData.append("calories", fShortenNumber(calories) + "");
        formData.append("active_status", active ? "1" : "0");
        formData.append("is_premium", isPremium ? "1" : "0");
        formData.append("point", data.point + "");
        formData.append("benefit", JSON.stringify(data.benefit));
        formData.append("number_poses", poseExercises.length + "");
        const response = await axiosInstance.post(
          endpoints.exercise.create,
          formData
        );
        if (response.status === HttpStatusCode.Created) {
          enqueueSnackbar(t("exercisePage.createSuccess"));
          router.push(paths.dashboard.exercise.root);
        } else {
          enqueueSnackbar(t("exercisePage.createFail"));
        }
      } else {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        if (checkImageChange) formData.append("image", data.image);
        if (checkVideoChange) formData.append("video", data.video);
        let duration = 0;
        let calories = 0;
        poseExercises.forEach((p) => {
          formData.append("pose", p.pose.id.toString());
          formData.append("time", p.time + "");
          formData.append("duration", p.duration + "");
          duration += p.duration;
          calories += (p.pose.calories * p.duration) / p.pose.duration;
        });
        formData.append("duration", duration + "");
        formData.append("level", data.level + "");
        formData.append("calories", fShortenNumber(calories) + "");
        formData.append("active_status", active ? "1" : "0");
        formData.append("is_premium", isPremium ? "1" : "0");
        formData.append("point", data.point + "");
        formData.append("benefit", JSON.stringify(data.benefit));
        formData.append("number_poses", poseExercises.length + "");
        const response = await axiosInstance.patch(
          endpoints.exercise.update(currentExercise.id + ""),
          formData
        );
        if (response.status === HttpStatusCode.Ok) {
          enqueueSnackbar(t("exercisePage.updateSuccess"));
          router.push(paths.dashboard.exercise.root);
        } else {
          enqueueSnackbar(t("exercisePage.updateFail"));
        }
      }
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
        setCheckImageChange(true);
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
        setCheckVideoChange(true);
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
    setValue("image", currentExercise?.image_url || null);
    setCheckImageChange(false);
  }, [currentExercise?.image_url, setValue]);

  const handleRemoveFileVideo = useCallback(() => {
    setValue("video", currentExercise?.video_url || null);
    setCheckImageChange(false);
  }, [currentExercise?.video_url, setValue]);

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
            {t("exercisePage.details")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("exercisePage.detailsDescription")}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title={t("exercisePage.details")} />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              {/* <Typography variant="subtitle2">Name</Typography> */}
              <RHFTextField name="title" label={t("exercisePage.title")} />
            </Stack>

            <RHFAutocomplete
              name="benefit"
              label={t("exercisePage.benefits")}
              placeholder={t("exercisePage.benefitsPlaceholder")}
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
              <Typography variant="subtitle2">
                {" "}
                {t("exercisePage.description")}
              </Typography>
              <RHFEditor simple name="description" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">
                {t("exercisePage.image")}
              </Typography>
              <RHFUpload
                thumbnail
                name="image"
                maxSize={3145728}
                onDrop={handleDrop}
                onDelete={handleRemoveFile}
                onUpload={() => console.info(t("exercisePage.upload"))}
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
            {t("exercisePage.properties")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("exercisePage.propertiesDescription")}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">
                {t("exercisePage.video")}
              </Typography>
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
              <Typography variant="subtitle2">
                {t("exercisePage.poses")}
              </Typography>
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
                    label={t("exercisePage.pose")}
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
                    label={t("exercisePage.minute")}
                    onBlur={handleInputTime}
                  />
                  <RHFTextField
                    type="number"
                    name="second"
                    label={t("exercisePage.second")}
                    onBlur={handleInputTime}
                  />
                  <RHFTextField
                    type="number"
                    disabled
                    name="inSecond"
                    label={t("exercisePage.inSecond")}
                  />
                </Box>
                <RHFTextField
                  type="number"
                  name="duration"
                  label={t("exercisePage.duration")}
                  onBlur={handleUpdateSelectedPose}
                />
              </>
            )}
            <RHFSelect name="level" label={t("exercisePage.level")}>
              {LEVELS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFTextField
              name="point"
              label={t("exercisePage.point")}
              type="number"
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
              checked={isPremium}
              onChange={(
                event: ChangeEvent<HTMLInputElement>,
                checked: boolean
              ) => setIsPremium(checked)}
            />
          }
          label={t("exercisePage.isPremium")}
          sx={{ flexGrow: 1, pl: 3 }}
        />
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
          label={t("exercisePage.active")}
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentExercise
            ? t("exercisePage.createExercise")
            : t("exercisePage.updateExercise")}
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
