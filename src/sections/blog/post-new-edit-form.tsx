/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useEffect, useCallback, useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
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
import { CustomFile } from "@/components/upload";
import { useSnackbar } from "@/components/snackbar";
import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
} from "@/components/hook-form";

import { IPost } from "@/types/blog";

import PostDetailsPreview from "./post-details-preview";
import axiosInstance, { endpoints } from "@/utils/axios";
import { useRouter } from "next/navigation";
import axios, { HttpStatusCode } from "axios";
import Iconify from "@/components/iconify";
import { slugify } from "@/utils/slugify";

// ----------------------------------------------------------------------

type Props = {
  currentPost?: IPost;
};

export const benefits = [
  "Fitness",
  "Nature",
  "Health",
  "Happy",
  "Sports",
  "Breath",
  "Mood",
  "Motivation",
];

export default function PostNewEditForm({ currentPost }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const [active, setActive] = useState(false); // Default checked

  // Loading states for AI generation
  const [loadingDescription, setLoadingDescription] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingSeo, setLoadingSeo] = useState(false);
  const [loadingExcerpt, setLoadingExcerpt] = useState(false);

  useEffect(() => {
    if (currentPost) {
      setActive(currentPost.active_status === 1 ? true : false);
    }
  }, [currentPost]);

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
    imageUrl: Yup.mixed<any>().nullable(),
    benefit: Yup.array().min(1, "Must have at least 1 tag"),
    active: Yup.string(),
    seoTitle: Yup.string(),
    seoDescription: Yup.string(),
    seoKeywords: Yup.string(),
    slug: Yup.string().required("Slug is required"),
    excerpt: Yup.string().required("Excerpt is required"),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentPost?.title || "",
      description: currentPost?.description || "",
      content: currentPost?.content || "",
      imageUrl: currentPost?.image_url || null,
      benefit: currentPost?.benefit
        ? (JSON.parse(currentPost.benefit) as [])
        : [],
      active: currentPost?.active_status + "" || "",
      seoTitle: currentPost?.seo_title || "",
      seoDescription: currentPost?.seo_description || "",
      seoKeywords: currentPost?.seo_keywords || "",
      slug: currentPost?.slug || "",
      excerpt: currentPost?.excerpt || "",
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

  const { getValues } = methods;

  const values = watch();

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues);
    }
  }, [currentPost, defaultValues, reset]);

  // Function to generate content using Gemini API
  const generateWithAI = async (
    field: string,
    prompt: string,
    context: string | null = null
  ) => {
    let loadingState;

    // Set appropriate loading state
    switch (field) {
      case "description":
        loadingState = setLoadingDescription;
        break;
      case "content":
        loadingState = setLoadingContent;
        break;
      case "seo":
        loadingState = setLoadingSeo;
        break;
      case "excerpt":
        loadingState = setLoadingExcerpt;
        break;
      default:
        loadingState = () => {};
    }

    loadingState(true);

    try {
      const response = await axios.post(endpoints.api.v1.gemini.root, {
        field,
        prompt,
        context,
      });

      if (response.status === 200) {
        const { content } = response.data;

        // Update the appropriate field
        switch (field) {
          case "description":
            setValue("description", content, { shouldValidate: true });
            break;
          case "content":
            setValue("content", content, { shouldValidate: true });
            break;
          case "seo":
            setValue("seoDescription", content, { shouldValidate: true });
            break;
          case "keywords":
            setValue("seoKeywords", content, { shouldValidate: true });
            break;
          case "excerpt":
            setValue("excerpt", content, { shouldValidate: true });
            break;
        }

        enqueueSnackbar(t("form.generation_success"), { variant: "success" });
      } else {
        enqueueSnackbar(t("form.generation_fail"), { variant: "error" });
      }
    } catch (error) {
      console.error("Error generating content:", error);
      enqueueSnackbar(t("form.generation_fail"), { variant: "error" });
    } finally {
      loadingState(false);
    }
  };

  // Generate description based on title
  const generateDescription = async () => {
    const title = getValues("title");
    if (!title) {
      enqueueSnackbar(t("form.title_required"), { variant: "warning" });
      return;
    }

    const prompt = `Write a compelling and concise blog post description (2-3 sentences) for a post titled: "${title}". 
    The description should be engaging and make readers want to read the full post.`;

    await generateWithAI("description", prompt, title);
  };

  // Generate content based on title and description
  const generateContent = async () => {
    const title = getValues("title");
    const description = getValues("description");

    if (!title || !description) {
      enqueueSnackbar(t("form.title_description_required"), {
        variant: "warning",
      });
      return;
    }

    const prompt = `Write a comprehensive blog post with the title: "${title}". 
    The post should expand on this description: "${description}".
    Include appropriate HTML formatting like <h2>, <h3>, <p>, <ul>, <li>, etc. 
    for a well-structured post not use h1 and return content only.
    The content should be engaging, informative, and around 800-1000 words.`;

    await generateWithAI("content", prompt, `${title}\n${description}`);
  };

  const generateSeoKeywords = async (title: string) => {
    if (!title) {
      enqueueSnackbar(t("form.title_required"), {
        variant: "warning",
      });
      return "";
    }

    const prompt = `Write an SEO-keyword meta upto 5 keywords for a blog post with the title: "${title}". 
    The meta keywords must include: "YogiTech", "Yoga Mobile App", separate each keyword with a comma.
    Return only the content`;

    await generateWithAI("keywords", prompt, `${title}`);
  };

  // Generate SEO description
  const generateSeoDescription = async () => {
    const title = getValues("title");

    if (!title) {
      enqueueSnackbar(t("form.title_required"), {
        variant: "warning",
      });
      return;
    }

    const prompt = `Write an SEO-optimized meta description (maximum 100 - 150 characters) for a blog post with the title: "${title}" . 
    The meta description should include relevant keywords and encourage clicks.`;

    await generateWithAI("seo", prompt, `${title}`);
  };

  // Generate excerpt
  const generateExcerpt = async () => {
    const title = getValues("title");
    const description = getValues("description");

    if (!title || !description) {
      enqueueSnackbar(t("form.title_description_required"), {
        variant: "warning",
      });
      return;
    }

    const prompt = `Create a brief, engaging excerpt (1-2 sentences) for a blog post with the title: "${title}" 
    and description: "${description}". The excerpt should entice readers to click and read the full post.`;

    await generateWithAI("excerpt", prompt, `${title}\n${description}`);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      // const access = sessionStorage.getItem("access");
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.imageUrl !== currentPost?.image_url) {
        formData.append("image", data.imageUrl); // Append the image file
      }
      formData.append("content", data.content);
      formData.append("benefit", JSON.stringify(data.benefit));
      formData.append("active_status", active ? "1" : "0");
      if (!data.seoTitle) {
        data.seoTitle = data.title;
      }
      if (!data.seoDescription) {
        data.seoDescription = data.description.slice(0, 160);
      }
      if (!data.seoKeywords) {
        data.seoKeywords = data.title.split(" ").join(", ");
      }
      if (!data.excerpt) {
        data.excerpt = data.description.slice(0, 160);
      }
      formData.append("seo_title", data.seoTitle);
      formData.append("seo_description", data.seoDescription);
      formData.append("seo_keywords", data.seoKeywords);
      formData.append("excerpt", data.excerpt);
      formData.append("slug", data.slug);
      formData.append("url", `/blog/${data.slug}/`);
      if (currentPost) {
        const response = await axiosInstance.patch(
          `${endpoints.post.update}${currentPost.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              // Authorization: `Bearer ${access}`,
            },
          }
        );
        if (response.status === HttpStatusCode.Ok) {
          enqueueSnackbar(t("form.update_success"), { variant: "success" });
        } else {
          enqueueSnackbar(t("form.update_fail"), { variant: "error" });
        }
      } else {
        const response = await axiosInstance.post(
          endpoints.post.create,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              // Authorization: `Bearer ${access}`,
            },
          }
        );
        if (response.status === HttpStatusCode.Created) {
          enqueueSnackbar(t("form.create_success"), { variant: "success" });
        } else {
          enqueueSnackbar(t("form.create_fail"), { variant: "error" });
        }
      }
      preview.onFalse();
      router.push(paths.dashboard.blog.root);
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
            {t("blogPage.postNewEditForm.details")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("blogPage.postNewEditForm.detailsDescription")}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && (
            <CardHeader title={t("blogPage.postNewEditForm.details")} />
          )}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField
              name="title"
              label={t("blogPage.postNewEditForm.postTitle")}
              onBlur={() => {
                const titleValue = getValues("title");
                if (!getValues("seoTitle")) {
                  setValue("seoTitle", titleValue + " | YogiTech");
                }
                if (!getValues("seoKeywords")) {
                  generateSeoKeywords(titleValue);
                }
                if (!getValues("slug")) {
                  setValue("slug", slugify(titleValue));
                }
              }}
            />

            <Stack direction="row" spacing={2} alignItems="flex-start">
              <RHFTextField
                name="description"
                label={t("blogPage.postNewEditForm.description")}
                multiline
                rows={3}
                sx={{ flex: 1 }}
                onBlur={() => {
                  const descValue = getValues("description");
                  if (!getValues("seoDescription")) {
                    setValue("seoDescription", descValue);
                  }
                  if (!getValues("excerpt")) {
                    setValue("excerpt", descValue);
                  }
                }}
              />
              <LoadingButton
                onClick={generateDescription}
                loading={loadingDescription}
                variant="contained"
                color="primary"
                startIcon={<Iconify icon={"ic:outline-auto-awesome"} />}
                sx={{ mt: 1 }}
              >
                AI
              </LoadingButton>
            </Stack>

            <Stack spacing={1.5}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle2">
                  {t("blogPage.postNewEditForm.content")}
                </Typography>
                <LoadingButton
                  onClick={generateContent}
                  loading={loadingContent}
                  variant="contained"
                  color="primary"
                  startIcon={<Iconify icon={"ic:outline-auto-awesome"} />}
                  size="small"
                >
                  Generate Content
                </LoadingButton>
              </Stack>
              <RHFEditor simple name="content" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Cover</Typography>
              <RHFUpload
                name="imageUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                onDelete={handleRemoveFile}
              />
            </Stack>

            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Stack spacing={3} sx={{ flex: 1 }}>
                <RHFTextField name="seoTitle" label="SEO Title" />
                <RHFTextField
                  name="seoDescription"
                  label="SEO Description"
                  multiline
                  rows={3}
                />
                <RHFTextField name="seoKeywords" label="SEO Keywords" />
              </Stack>
              <LoadingButton
                onClick={generateSeoDescription}
                loading={loadingSeo}
                variant="contained"
                color="primary"
                startIcon={<Iconify icon={"ic:outline-auto-awesome"} />}
                sx={{ mt: 1 }}
              >
                AI
              </LoadingButton>
            </Stack>
            <Stack spacing={1.5} direction="row" alignItems="flex-start">
              <RHFTextField name="excerpt" label="Excerpt" multiline rows={2} />
              <LoadingButton
                onClick={generateExcerpt}
                loading={loadingExcerpt}
                variant="contained"
                color="primary"
                startIcon={<Iconify icon={"ic:outline-auto-awesome"} />}
                sx={{ mt: 1 }}
              >
                AI
              </LoadingButton>
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
            {t("blogPage.postNewEditForm.properties")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t("blogPage.postNewEditForm.propertiesDescription")}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && (
            <CardHeader title={t("blogPage.postNewEditForm.properties")} />
          )}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFAutocomplete
              name="benefit"
              label={t("blogPage.postNewEditForm.benefits")}
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
          </Stack>
          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="slug" label="Slug" />
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
          label={t("blogPage.postNewEditForm.publish")}
          name="active"
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <Button
          color="inherit"
          variant="outlined"
          size="large"
          onClick={preview.onTrue}
        >
          {t("blogPage.postDetailsPreview.preview")}
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPost
            ? t("blogPage.postNewEditForm.createPost")
            : t("blogPage.postNewEditForm.saveChanges")}
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
