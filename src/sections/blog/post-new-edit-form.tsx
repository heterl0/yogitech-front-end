/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useEffect, useCallback, useState, ChangeEvent } from "react";

import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";

import { paths } from "@/routes/paths";

import { useBoolean } from "@/hooks/use-boolean";
import { useResponsive } from "@/hooks/use-responsive";

import { _tags } from "@/_mock";

import { CustomFile } from "@/components/upload";
import { useSnackbar } from "@/components/snackbar";
import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
} from "@/components/hook-form";

import { IBlog } from "@/types/blog";

import PostDetailsPreview from "./post-details-preview";
import axiosInstance, { endpoints } from "@/utils/axios";
import { useRouter } from "next/navigation";

// ----------------------------------------------------------------------

type Props = {
  currentPost?: IBlog;
};

export default function PostNewEditForm({ currentPost }: Props) {
  const router = useRouter();
  const [active, setActive] = useState(
    currentPost?.active_status === 1 ? true : false
  ); // Default checked

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setActive(checked);
  };
  const mdUp = useResponsive("up", "md");

  const { enqueueSnackbar } = useSnackbar();

  const preview = useBoolean();

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    content: Yup.string().required("Content is required"),
    imageUrl: Yup.mixed<any>().nullable().required("Cover is required"),
    benefit: Yup.array().min(1, "Must have at least 1 tag"),
    active: Yup.string(),
    // not required
  });

  const defaultValues = useMemo(
    () => ({
      title: currentPost?.title || "",
      description: currentPost?.description || "",
      content: currentPost?.content || "",
      imageUrl: currentPost?.image_url || null,
      benefit: [],
      active: currentPost?.active_status + "" || "",
    }),
    [currentPost]
  );

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues);
    }
  }, [currentPost, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const access = sessionStorage.getItem("access");
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("image", data.imageUrl); // Append the image file
      formData.append("content", data.content);
      formData.append("benefit", JSON.stringify(data.benefit));
      formData.append("active_status", active ? "1" : "0");
      const response = await axiosInstance.post(
        endpoints.post.create,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access}`,
          },
        }
      );
      // preview.onFalse();
      enqueueSnackbar(currentPost ? "Update success!" : "Create success!");
      router.push(paths.dashboard.post.root);
      console.info("DATA", response);
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
        setValue("imageUrl", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue("imageUrl", null);
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
            <RHFTextField name="title" label="Post Title" />

            <RHFTextField
              name="description"
              label="Description"
              multiline
              rows={3}
            />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="content" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Cover</Typography>
              <RHFUpload
                name="coverUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                onDelete={handleRemoveFile}
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
            <RHFAutocomplete
              name="benefit"
              label="Benefits"
              placeholder="+ Benefits"
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
          control={<Switch checked={active} onChange={handleChange} />}
          label="Publish"
          name="active"
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <Button
          color="inherit"
          variant="outlined"
          size="large"
          onClick={preview.onTrue}
        >
          Preview
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPost ? "Create Post" : "Save Changes"}
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

      <PostDetailsPreview
        title={values.title}
        content={values.content}
        description={values.description}
        coverUrl={
          typeof values.imageUrl === "string"
            ? values.imageUrl
            : `${(values.imageUrl as CustomFile)?.preview}`
        }
        //
        open={preview.value}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={preview.onFalse}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
}
