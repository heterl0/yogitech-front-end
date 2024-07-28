/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
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
import { useTranslation } from "react-i18next";
import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { useResponsive } from "@/hooks/use-responsive";

import { useSnackbar } from "@/components/snackbar";
import FormProvider, {
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
  RHFEditor,
} from "@/components/hook-form";

import axiosInstance, { endpoints } from "@/utils/axios";
import { HttpStatusCode } from "axios";
import { IEvent } from "@/types/event";
import { IExercise } from "@/types/exercise";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocales } from "@/locales";
import { format } from "date-fns";
// ----------------------------------------------------------------------

type Props = {
  currentEvent?: IEvent;
  exercises: IExercise[];
};

export default function EventNewEditForm({ currentEvent, exercises }: Props) {
  const router = useRouter();
  const [active, setActive] = useState(
    currentEvent ? currentEvent.active_status === 1 : true
  );
  const { t } = useTranslation();
  const [checkImageChange, setCheckImageChange] = useState(false);
  const mdUp = useResponsive("up", "md");
  const { currentLang } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const NewEventSchema = Yup.object().shape({
    title: Yup.string().required(t("eventPage.formHelper.titleRequired")),
    description: Yup.string().required(
      t("eventPage.formHelper.descriptionRequired")
    ),
    image: Yup.mixed<any>().required(t("eventPage.formHelper.imageRequired")),
    //
    exercise: Yup.array().min(1, t("eventPage.formHelper.exerciseAtLeastOne")),
    available: Yup.object().shape({
      startDate: Yup.mixed<any>()
        .nullable()
        .required(t("eventPage.formHelper.startDateRequired")),
      endDate: Yup.mixed<any>()
        .required(t("eventPage.formHelper.endDateRequired"))
        .test(
          "date-min",
          t("eventPage.formHelper.endDateError"),
          (value, { parent }) => value.getTime() > parent.startDate.getTime()
        ),
    }),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentEvent?.title || "",
      description: currentEvent?.description || "",
      image: currentEvent?.image_url || "",
      //
      exercise: currentEvent?.exercises || [],
      available: {
        startDate: currentEvent?.start_date
          ? new Date(currentEvent?.start_date)
          : null,
        endDate: currentEvent?.exercises
          ? new Date(currentEvent?.expire_date)
          : null,
      },
    }),
    [currentEvent]
  );

  const dateFormatter = useCallback(
    (weekday: Date) =>
      format(weekday, "iiiiii", { locale: currentLang.adapterLocale }),
    [currentLang]
  );

  const methods = useForm({
    resolver: yupResolver(NewEventSchema),
    defaultValues,
  });

  const {
    // watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();

  useEffect(() => {
    if (currentEvent) {
      reset(defaultValues);
      setActive(currentEvent.active_status === 1);
    }
  }, [currentEvent, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentEvent) {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("image", data.image);
        data.exercise?.forEach((exericse) =>
          formData.append("exercise_ids", exericse.id.toString())
        );
        formData.append("active_status", active ? "1" : "0");
        formData.append("start_date", data.available.startDate.toISOString());
        formData.append("expire_date", data.available.endDate.toISOString());

        const response = await axiosInstance.post(
          endpoints.event.create,
          formData
        );
        if (response.status === HttpStatusCode.Created) {
          enqueueSnackbar(t("form.create_success"), { variant: "success" });
          setTimeout(() => router.push(paths.dashboard.event.root), 2000);
        } else {
          enqueueSnackbar(t("form.create_failed"), { variant: "error" });
        }
      } else {
        const formData = new FormData();
        if (checkImageChange) {
          formData.append("image", data.image);
        }
        formData.append("title", data.title);
        formData.append("description", data.description);
        data.exercise?.forEach((exericse) =>
          formData.append("exercise_ids", exericse.id.toString())
        );
        formData.append("active_status", active ? "1" : "0");
        formData.append("start_date", data.available.startDate.toISOString());
        formData.append("expire_date", data.available.endDate.toISOString());
        const response = await axiosInstance.patch(
          endpoints.event.update(currentEvent.id + ""),
          formData
        );
        if (response.status === HttpStatusCode.Ok) {
          enqueueSnackbar(t("form.update_success"), { variant: "success" });
          router.push(paths.dashboard.event.root);
        } else {
          enqueueSnackbar(t("form.update_failed"), { variant: "error" });
        }
      }
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

  const handleRemoveFile = useCallback(() => {
    setValue("image", null);
  }, [setValue]);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {t("eventPage.newEditForm.details")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("eventPage.newEditForm.detailsDescription")}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title={t("eventPage.newEditForm.details")} />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <RHFTextField
                name="title"
                label={t("eventPage.newEditForm.title")}
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">
                {t("eventPage.newEditForm.content")}
              </Typography>
              <RHFEditor simple name="description" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">
                {t("eventPage.newEditForm.image")}
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
            {t("eventPage.newEditForm.properties")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("eventPage.newEditForm.propertiesDescription")}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && (
            <CardHeader title={t("eventPage.newEditForm.properties")} />
          )}

          <Stack spacing={3} sx={{ p: 3 }}>
            {/* <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Duration
            </Typography> */}
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">
                {t("eventPage.newEditForm.available")}
              </Typography>
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
                      dayOfWeekFormatter={dateFormatter}
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

            <RHFAutocomplete
              multiple
              name="exercise"
              label="Exercise"
              disableCloseOnSelect
              options={exercises}
              getOptionLabel={(option) => (option as IExercise).title}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderOption={(props, exercise) => (
                <li {...props} key={exercise.id}>
                  <Avatar
                    key={exercise.id}
                    alt={exercise.image_url}
                    src={exercise.image_url}
                    sx={{ width: 24, height: 24, flexShrink: 0, mr: 1 }}
                  />

                  {exercise.title}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((exercise, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={exercise.id}
                    size="small"
                    variant="soft"
                    label={exercise.title}
                    avatar={
                      <Avatar alt={exercise.title} src={exercise.image_url} />
                    }
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
          label={t("eventPage.newEditForm.active")}
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentEvent
            ? t("eventPage.newEditForm.createEvent")
            : t("eventPage.newEditForm.updateEvent")}
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
