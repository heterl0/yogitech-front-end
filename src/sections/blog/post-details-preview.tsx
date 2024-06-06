/* eslint-disable react/no-children-prop */
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogActions from "@mui/material/DialogActions";

import Markdown from "@/components/markdown";
import Scrollbar from "@/components/scrollbar";
import EmptyContent from "@/components/empty-content";
import { useTranslation } from "react-i18next";
import PostDetailsHero from "./post-details-hero";

// ----------------------------------------------------------------------

type Props = {
  title: string;
  content: string;
  description: string;
  coverUrl: string;
  //
  open: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
};

export default function PostDetailsPreview({
  title,
  coverUrl,
  content,
  description,
  //
  open,
  isValid,
  onClose,
  onSubmit,
  isSubmitting,
}: Props) {
  const { t } = useTranslation();
  const hasContent = title || description || content || coverUrl;

  const hasHero = title || coverUrl;

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {t("blogPage.postDetailsPreview.preview")}
        </Typography>

        <Button variant="outlined" color="inherit" onClick={onClose}>
          {t("blogPage.postDetailsPreview.cancel")}
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          disabled={!isValid}
          loading={isSubmitting}
          onClick={onSubmit}
        >
          {t("blogPage.postDetailsPreview.post")}
        </LoadingButton>
      </DialogActions>

      <Divider />

      {hasContent ? (
        <Scrollbar>
          {hasHero && <PostDetailsHero title={title} coverUrl={coverUrl} />}

          <Container sx={{ mt: 5, mb: 10 }}>
            <Stack
              sx={{
                maxWidth: 720,
                mx: "auto",
              }}
            >
              <Typography variant="h6" sx={{ mb: 5 }}>
                {description}
              </Typography>

              <Markdown children={content} />
            </Stack>
          </Container>
        </Scrollbar>
      ) : (
        <EmptyContent
          filled
          title={t("blogPage.postDetailsPreview.emptyContent")}
        />
      )}
    </Dialog>
  );
}
