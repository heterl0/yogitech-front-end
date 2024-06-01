/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from "react";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Iconify from "@/components/iconify";
import Scrollbar from "@/components/scrollbar";

import { MenuItem } from "@mui/material";
import { NOTIFICATION_STATUS } from "@/types/notification";
import Label, { LabelColor } from "@/components/label";
import { IEventFilterValue, IEventFilters } from "@/types/event";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  //
  filters: IEventFilters;
  onFilters: (name: string, value: IEventFilterValue) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
  dateError: boolean;
};

export default function EventFilters({
  open,
  onOpen,
  onClose,
  //
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  dateError,
  //
}: Props) {
  const handleFilterStatus = useCallback(
    (newValue: number) => {
      onFilters("status", newValue);
    },
    [onFilters]
  );

  const handleFilterStartDate = useCallback(
    (newValue: Date | null) => {
      onFilters("startDate", newValue);
    },
    [onFilters]
  );

  const handleFilterEndDate = useCallback(
    (newValue: Date | null) => {
      onFilters("endDate", newValue);
    },
    [onFilters]
  );

  const renderDateRange = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Durations
      </Typography>
      <Stack spacing={2.5}>
        <DatePicker
          label="Start date"
          value={filters.startDate}
          onChange={handleFilterStartDate}
        />

        <DatePicker
          label="End date"
          value={filters.endDate}
          onChange={handleFilterEndDate}
          slotProps={{
            textField: {
              error: dateError,
              helperText: dateError && "End date must be later than start date",
            },
          }}
        />
      </Stack>
    </Stack>
  );

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Filters
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={onResetFilters}>
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <IconButton onClick={onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const renderStatus = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Status
      </Typography>

      <TextField
        select
        fullWidth
        value={filters.status}
        onChange={(event) => handleFilterStatus(parseInt(event.target.value))}
        placeholder="Select Status"
      >
        {[
          { label: "All", value: -1, color: "default" as LabelColor },
          ...NOTIFICATION_STATUS,
        ].map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Label color={option.color}>{option.label}</Label>
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpen}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 280 },
        }}
      >
        {renderHead}

        <Divider />

        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {renderDateRange}

            {renderStatus}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
