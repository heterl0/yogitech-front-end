import * as Yup from "yup";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from "react-i18next";

// import { countries } from "@/assets/data";
import FormProvider, {
  RHFSelect,
  RHFTextField,
  // RHFAutocomplete,
} from "@/components/hook-form";

import { NOTIFICATION_STATUS } from "@/types/notification";
import { IComment } from "@/types/exercise";
// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentComment?: IComment;
  onCreate?: (text: string) => void;
  onEditRow?: (data: { active_status: number; text: string }) => void;
};

export default function ExerciseCommentQuickCreateEditForm({
  currentComment,
  open,

  onEditRow,
  onClose,
  onCreate,
}: Props) {
  const NewAccountSchema = Yup.object().shape({
    status: Yup.number().required("Status is required"),
    text: Yup.string().required("Content is required"),
  });

  const defaultValues = useMemo(
    () => ({
      status: currentComment?.active_status ?? 1,
      text: currentComment?.text || "",
    }),
    [currentComment]
  );

  const methods = useForm({
    resolver: yupResolver(NewAccountSchema),
    defaultValues,
  });

  const { t } = useTranslation();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentComment) {
        onCreate?.(data.text);
        onClose();
      } else {
        onEditRow?.({
          active_status: data.status,
          text: data.text,
        });
      }
    } catch (error) {
      reset();
      onClose();
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>
          {currentComment
            ? t(
                "exercisePage.exerciseCommentListView.quickCreateEditForm.editTitle"
              )
            : t(
                "exercisePage.exerciseCommentListView.quickCreateEditForm.createTitle"
              )}
        </DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            {t(
              "exercisePage.exerciseCommentListView.quickCreateEditForm.infoAlert"
            )}
          </Alert>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <RHFSelect
              name="status"
              label={t(
                "exercisePage.exerciseCommentListView.quickCreateEditForm.statusLabel"
              )}
            >
              {NOTIFICATION_STATUS.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField
              name="text"
              label={t(
                "exercisePage.exerciseCommentListView.quickCreateEditForm.contentLabel"
              )}
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {t(
              "exercisePage.exerciseCommentListView.quickCreateEditForm.cancelButton"
            )}
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {currentComment
              ? t(
                  "exercisePage.exerciseCommentListView.quickCreateEditForm.updateButton"
                )
              : t(
                  "exercisePage.exerciseCommentListView.quickCreateEditForm.createButton"
                )}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
