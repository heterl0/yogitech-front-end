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

// import { countries } from "@/assets/data";
import FormProvider, {
  RHFSelect,
  RHFTextField,
  // RHFAutocomplete,
} from "@/components/hook-form";

import { NOTIFICATION_STATUS } from "@/types/notification";
import { IComment } from "@/types/exercise";
import { useSnackbar } from "notistack";
import axiosInstance, { endpoints } from "@/utils/axios";
// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentComment?: IComment;
  onChangeStatus: (status: number) => void;
};

export default function ExerciseCommentQuickCreateEditForm({
  currentComment,
  open,
  onClose,
  onChangeStatus,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
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

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentComment?.active_status !== data.status) {
        await axiosInstance.patch(
          endpoints.comment.update(currentComment?.id + ""),
          {
            active_status: data.status,
            text: data.text,
          }
        );
        onChangeStatus(data.status);
        enqueueSnackbar("Comment status has been updated");
        onClose();
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
          {currentComment ? "Edit comment" : "Create comment"}
        </DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Comment is waiting for confirmation
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
            <RHFSelect name="status" label="Status">
              {NOTIFICATION_STATUS.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField
              name="text"
              label="Content"
              multiline
              rows={4}
              disabled
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {currentComment ? "Update" : "Create"}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
