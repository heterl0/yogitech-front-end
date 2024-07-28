import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack, { StackProps } from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

import { RouterLink } from "@/routes/components";

import Iconify from "@/components/iconify";
import CustomPopover, { usePopover } from "@/components/custom-popover";

// ----------------------------------------------------------------------

type Props = StackProps & {
  backLink: string;
  editLink: string;
  publish: number;
  onChangePublish: (newValue: number) => void;
  publishOptions: {
    value: number;
    label: string;
  }[];
};

export default function PostDetailsToolbar({
  publish,
  backLink,
  editLink,
  publishOptions,
  onChangePublish,
  sx,
  ...other
}: Props) {
  const { t } = useTranslation();

  const popover = usePopover();

  return (
    <>
      <Stack
        spacing={1.5}
        direction="row"
        sx={{ mb: { xs: 3, md: 5 }, ...sx }}
        {...other}
      >
        <Button
          component={RouterLink}
          href={backLink}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          {t("blogPage.postDetailsToolbar.back")}
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        {/* {publish === 1 && (
          <Tooltip title={t("blogPage.postDetailsToolbar.goLive")}>
            <IconButton component={RouterLink} href={liveLink}>
              <Iconify icon="eva:external-link-fill" />
            </IconButton>
          </Tooltip>
        )} */}

        <Tooltip title={t("blogPage.postDetailsToolbar.edit")}>
          <IconButton component={RouterLink} href={editLink}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>

        <LoadingButton
          color={
            publish === 1 ? "primary" : publish === 0 ? "inherit" : "error"
          }
          variant="contained"
          loading={false}
          loadingIndicator={t("blogPage.postDetailsToolbar.loading")}
          endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
          onClick={popover.onOpen}
          sx={{ textTransform: "capitalize" }}
        >
          {t("blogPage.postDetailsToolbar.changeStatus")}
        </LoadingButton>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-right"
        sx={{ width: 140 }}
      >
        {publishOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === publish}
            onClick={() => {
              popover.onClose();
              onChangePublish(option.value);
            }}
            sx={{
              color:
                option.value === 1
                  ? "primary.main"
                  : option.value === 0
                    ? "gray.main"
                    : "error.main",
            }}
          >
            {option.value === 1 && <Iconify icon="eva:cloud-upload-fill" />}
            {option.value === 0 && <Iconify icon="solar:file-text-bold" />}
            {option.value === 2 && (
              <Iconify icon="solar:trash-bin-trash-bold" />
            )}
            {t(
              `blogPage.postDetailsToolbar.${option.value === 1 ? "publish" : option.value === 0 ? "draft" : "trash"}`
            )}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
