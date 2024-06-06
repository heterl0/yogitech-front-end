import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";

import Iconify from "@/components/iconify";
import FormProvider, { RHFTextField } from "@/components/hook-form";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function PostCommentForm() {
  const { t } = useTranslation();

  const CommentSchema = Yup.object().shape({
    comment: Yup.string().required(
      t("blogPage.postCommentForm.commentRequired")
    ),
    name: Yup.string().required(t("blogPage.postCommentForm.nameRequired")),
    email: Yup.string()
      .required(t("blogPage.postCommentForm.emailRequired"))
      .email(t("blogPage.postCommentForm.invalidEmail")),
  });

  const defaultValues = {
    comment: "",
    name: "",
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(CommentSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <RHFTextField
          name="comment"
          placeholder={t("blogPage.postCommentForm.placeholder")}
          multiline
          rows={4}
        />

        <Stack direction="row" alignItems="center">
          <Stack direction="row" alignItems="center" flexGrow={1}>
            <IconButton>
              <Iconify icon="solar:gallery-add-bold" />
            </IconButton>

            <IconButton>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>

            <IconButton>
              <Iconify icon="eva:smiling-face-fill" />
            </IconButton>
          </Stack>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t("blogPage.postCommentForm.postComment")}
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
