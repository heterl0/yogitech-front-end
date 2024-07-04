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
} from "@/components/hook-form";

import { IMuscle, IPose } from "@/types/pose";
import { MenuItem, TextField } from "@mui/material";
import { LEVELS } from "@/constants/level";
import { useGetMuscles } from "@/api/muscle";
import {
  FilesetResolver,
  NormalizedLandmark,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";
import axiosInstance, { endpoints } from "@/utils/axios";
import { HttpStatusCode } from "axios";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

type Props = {
  currentPose?: IPose;
};

export default function PoseNewEditForm({ currentPose }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const [keypoints, setKeypoints] = useState<NormalizedLandmark[]>([]);
  const [active, setActive] = useState(
    currentPose ? currentPose.active_status === 1 : true
  );

  useEffect(() => {
    if (currentPose?.keypoint_url) {
      fetch(currentPose.keypoint_url)
        .then((response) => response.json())
        .then((data) => setKeypoints(data))
        .catch((error) => console.error(error));
    }
  }, [currentPose]);

  const { muscles } = useGetMuscles();
  const [checkImageChange, setCheckImageChange] = useState(false);
  const mdUp = useResponsive("up", "md");

  const [model, setModel] = useState<PoseLandmarker>();

  const { enqueueSnackbar } = useSnackbar();

  const NewTourSchema = Yup.object().shape({
    name: Yup.string().required(
      t("posePage.poseNewEditForm.form.nameRequired")
    ),
    instruction: Yup.string().required(
      t("posePage.poseNewEditForm.form.instructionRequired")
    ),
    image: Yup.mixed<any>().required(
      t("posePage.poseNewEditForm.form.imageRequired")
    ),
    //
    muscles: Yup.array().min(1, t("posePage.poseNewEditForm.form.musclesMin")),
    duration: Yup.number()
      .required(t("posePage.poseNewEditForm.form.durationRequired"))
      .min(1, t("posePage.poseNewEditForm.form.durationMin")),
    level: Yup.number().required(
      t("posePage.poseNewEditForm.form.levelRequired")
    ),
    calories: Yup.number()
      .required(t("posePage.poseNewEditForm.form.caloriesRequired"))
      .min(1, t("posePage.poseNewEditForm.form.caloriesMin")),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentPose?.name || "",
      instruction: currentPose?.instruction || "",
      image: currentPose?.image_url || "",
      //
      muscles: currentPose?.muscles || [],
      duration: currentPose?.duration || 0,
      level: currentPose?.level || 1,
      calories: currentPose?.calories || 0,
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
      setActive(currentPose.active_status === 1);
    }
  }, [currentPose, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentPose) {
        const json = JSON.stringify(keypoints);

        // Create a Blob from the JSON string
        const blob = new Blob([json], { type: "application/json" });

        // Create a FormData object
        const formData = new FormData();

        formData.append("keypoint", blob, "results.json");
        formData.append("name", data.name);
        formData.append("instruction", data.instruction);
        formData.append("image", data.image);
        data.muscles?.forEach((m) =>
          formData.append("muscle_ids", m.id.toString())
        );
        formData.append("duration", data.duration + "");
        formData.append("level", data.level + "");
        formData.append("calories", data.calories + "");
        formData.append("active_status", active ? "1" : "0");

        const response = await axiosInstance.post(
          endpoints.pose.create,
          formData
        );
        if (response.status === HttpStatusCode.Created) {
          enqueueSnackbar("Create success!");
          router.push(paths.dashboard.pose.root);
        } else {
          enqueueSnackbar("Create failed!");
        }
      } else {
        const formData = new FormData();
        if (checkImageChange) {
          const json = JSON.stringify(keypoints);
          const blob = new Blob([json], { type: "application/json" });
          formData.append("keypoint", blob, "results.json");
          formData.append("image", data.image);
        }
        formData.append("name", data.name);
        formData.append("instruction", data.instruction);
        data.muscles?.forEach((m) =>
          formData.append("muscle_ids", m.id.toString())
        );
        formData.append("duration", data.duration + "");
        formData.append("level", data.level + "");
        formData.append("calories", data.calories + "");
        formData.append("active_status", active ? "1" : "0");
        const response = await axiosInstance.patch(
          endpoints.pose.update(currentPose.id + ""),
          formData
        );
        if (response.status === HttpStatusCode.Ok) {
          enqueueSnackbar("Upload success!");
          router.push(paths.dashboard.pose.root);
        } else {
          enqueueSnackbar("Upload failed!");
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    const loadModel = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      const poseLandmark = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/pose_landmarker_heavy.task",
        },
        runningMode: "IMAGE",
      });
      setModel(poseLandmark);
    };
    loadModel();
  }, []);

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("image", newFile, { shouldValidate: true });
        setCheckImageChange(true);

        const image = new Image();
        image.src = newFile.preview;
        await new Promise((resolve) => (image.onload = resolve));

        // Extract keypoints from the image
        if (model) {
          const results = model.detect(image);
          setKeypoints(results.landmarks[0]);
        }
      }
    },
    [model, setKeypoints, setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue("image", null);
  }, [setValue]);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {t("posePage.poseNewEditForm.properties.title")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("posePage.poseNewEditForm.properties.description")}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              {/* <Typography variant="subtitle2">Name</Typography> */}
              <RHFTextField
                name="name"
                label={t("posePage.poseNewEditForm.name")}
              />
            </Stack>

            <Stack spacing={1.5}>
              {/* <Typography variant="subtitle2">Content</Typography> */}
              <RHFTextField
                name="instruction"
                label={t("posePage.poseNewEditForm.instruction")}
                multiline
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">
                {t("posePage.poseNewEditForm.image")}
              </Typography>
              <RHFUpload
                thumbnail
                name="image"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onUpload={() => console.info("ON UPLOAD")}
              />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">
                {t("posePage.poseNewEditForm.keypoint")}
              </Typography>
              <TextField
                multiline
                disabled
                maxRows={8}
                value={JSON.stringify(keypoints)}
                sx={{
                  flexGrow: 1,
                  height: "auto",
                  py: 2.5,
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
            {t("posePage.poseNewEditForm.properties.title")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("posePage.poseNewEditForm.properties.description")}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            {/* <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Duration
            </Typography> */}

            <RHFTextField
              name="duration"
              label={t("posePage.poseNewEditForm.duration")}
              type="number"
            />

            <RHFSelect name="level" label={t("posePage.poseNewEditForm.level")}>
              {LEVELS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFTextField
              name="calories"
              label={t("posePage.poseNewEditForm.calories")}
              type="number"
            />

            <RHFAutocomplete
              multiple
              name="muscles"
              label={t("posePage.poseNewEditForm.muscles")}
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
          label={t("posePage.poseNewEditForm.active")}
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPose
            ? t("posePage.poseNewEditForm.createPose")
            : t("posePage.poseNewEditForm.updatePose")}
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
