import { Controller, useFormContext } from "react-hook-form";

import FormHelperText from "@mui/material/FormHelperText";

import { Upload, UploadBox, UploadProps, UploadAvatar } from "../upload";
import UploadVideo from "../upload/upload-video";
import { SingleFileVideoPreview } from "../upload/preview-single-file";
import { Box, Button, alpha } from "@mui/material";
import Iconify from "../iconify";
import { useDropzone } from "react-dropzone";

// ----------------------------------------------------------------------

interface Props extends Omit<UploadProps, "file"> {
  name: string;
  multiple?: boolean;
}

// ----------------------------------------------------------------------

export function RHFUploadAvatar({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <UploadAvatar error={!!error} file={field.value} {...other} />

          {!!error && (
            <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadBox({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox files={field.value} error={!!error} {...other} />
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUpload({ name, multiple, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <Upload
            multiple
            accept={{ "image/*": [] }}
            files={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        ) : (
          <Upload
            accept={{ "image/*": [] }}
            file={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        )
      }
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadVideo({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();
  const { getRootProps, getInputProps } = useDropzone({
    ...other,
  });
  const { onDelete } = other;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        field.value ? (
          <div className="flex flex-col gap-5">
            <Box sx={{ width: 1, position: "relative" }}>
              <Box
                sx={{
                  height: "330px",
                  p: 5,
                  outline: "none",
                  borderRadius: 1,
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
                  border: (theme) =>
                    `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
                  transition: (theme) =>
                    theme.transitions.create(["opacity", "padding"]),
                  "&:hover": {
                    opacity: 0.72,
                  },
                }}
              >
                <SingleFileVideoPreview
                  videoUrl={
                    typeof field.value === "string"
                      ? field.value
                      : field.value?.preview
                  }
                />
              </Box>
            </Box>
            <div className="flex flex-row justify-end gap-3">
              <Button variant="outlined" color="primary" onClick={onDelete}>
                Remove
              </Button>
              <Button
                startIcon={<Iconify icon="eva:cloud-upload-fill" />}
                color="primary"
                className="px-2"
                variant="contained"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                Upload
              </Button>
            </div>
          </div>
        ) : (
          <UploadVideo
            accept={{ "video/*": [] }}
            file={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        )
      }
    />
  );
}
