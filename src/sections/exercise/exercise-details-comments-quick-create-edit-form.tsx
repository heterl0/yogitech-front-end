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
import { usePathname, useRouter } from "next/navigation";
import { IComment } from "@/types/exercise";
// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentComment?: IComment;
};

export default function ExerciseCommentQuickCreateEditForm({
  currentComment,
  open,
  onClose,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  // const { enqueueSnackbar } = useSnackbar();
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
      console.log(data);
      // const fromData = new FormData();
      // fromData.append("title", data.title);
      // fromData.append("body", data.body);
      // fromData.append("time", date.toISOString());
      // fromData.append("active_status", data.status.toString());
      // fromData.append("is_admin", data.is_admin ? 1 + "" : 0 + "");
      // if (currentComment) {
      //   const res = await axiosInstance.put(
      //     endpoints.comment.update(currentComment.id.toString()),
      //     fromData
      //   );
      //   if (res.status === HttpStatusCode.Ok) {
      //     enqueueSnackbar("Comment updated successfully", {
      //       variant: "success",
      //     });
      //     onClose();
      //   }
      // } else {
      //   const res = await axiosInstance.post(
      //     endpoints.comment.create,
      //     fromData
      //   );
      //   if (res.status === HttpStatusCode.Created) {
      //     enqueueSnackbar("Comment created successfully", {
      //       variant: "success",
      //     });
      //     onClose();
      //   }
      // }
      router.push(pathname);
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
            <RHFTextField name="content" label="Content" multiline rows={4} />
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
