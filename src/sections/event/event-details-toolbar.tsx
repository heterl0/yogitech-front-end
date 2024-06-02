import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack, { StackProps } from "@mui/material/Stack";

import { RouterLink } from "@/routes/components";

import Iconify from "@/components/iconify";
import CustomPopover, { usePopover } from "@/components/custom-popover";
import { LabelColor } from "@/components/label";
import { EVENT_STATUS } from "@/types/event";

// ----------------------------------------------------------------------

type Props = StackProps & {
  backLink: string;
  editLink: string;
  status: number;
  onChangeStatus: (newValue: number) => void;
  statusOptions: {
    value: number;
    label: string;
    color: LabelColor;
  }[];
};

export default function EventDetailsToolbar({
  backLink,
  editLink,
  onChangeStatus,
  statusOptions,
  status,
  sx,
  ...other
}: Props) {
  const popover = usePopover();

  return (
    <>
      <Stack
        spacing={1.5}
        direction="row"
        sx={{
          mb: { xs: 3, md: 5 },
          ...sx,
        }}
        {...other}
      >
        <Button
          component={RouterLink}
          href={backLink}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          Back
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Edit">
          <IconButton component={RouterLink} href={editLink}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>

        <LoadingButton
          color="inherit"
          variant="contained"
          // loading={!status}
          loadingIndicator="Loading…"
          endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
          onClick={popover.onOpen}
          sx={{ textTransform: "capitalize" }}
        >
          {EVENT_STATUS[status].label}
        </LoadingButton>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-right"
        sx={{ width: 140 }}
      >
        {statusOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === status}
            onClick={() => {
              popover.onClose();
              onChangeStatus(option.value);
            }}
          >
            {option.value === 0 && <Iconify icon="eva:cloud-upload-fill" />}
            {option.value === 1 && <Iconify icon="solar:file-text-bold" />}
            {option.value === 2 && <Iconify icon="solar:file-text-bold" />}
            {option.value === 3 && <Iconify icon="solar:file-text-bold" />}
            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
