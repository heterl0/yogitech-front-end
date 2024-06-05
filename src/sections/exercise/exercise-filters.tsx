/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";

import Iconify from "@/components/iconify";
import Scrollbar from "@/components/scrollbar";

import Image from "@/components/image";
import { LEVELS } from "@/constants/level";
import { MenuItem } from "@mui/material";
import { NOTIFICATION_STATUS } from "@/types/notification";
import Label, { LabelColor } from "@/components/label";
import { IExerciseFilterValue, IExerciseFilters } from "@/types/exercise";
import { benefits } from "../blog/post-new-edit-form";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  //
  filters: IExerciseFilters;
  onFilters: (name: string, value: IExerciseFilterValue) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
};

export default function ExerciseFilters({
  open,
  onOpen,
  onClose,
  //
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
}: Props) {
  const handleFilterLevel = useCallback(
    (newValue: number) => {
      onFilters("level", newValue);
    },
    [onFilters]
  );

  const handleFilterStatus = useCallback(
    (newValue: number) => {
      onFilters("status", newValue);
    },
    [onFilters]
  );

  const { t } = useTranslation();

  const handleFilterMuscle = useCallback(
    (newValue: string[]) => {
      onFilters("benefits", newValue);
    },
    [onFilters]
  );

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {t("exercisePage.exerciseCommentListView.filtersResult.filters")}
      </Typography>

      <Tooltip
        title={t("exercisePage.exerciseCommentListView.filtersResult.clear")}
      >
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

  const renderLevel = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        {t("exercisePage.exerciseDetailsContent.level")}
      </Typography>

      <TextField
        select
        fullWidth
        value={filters.level}
        onChange={(event) => handleFilterLevel(parseInt(event.target.value))}
        placeholder={t("exercisePage.exerciseCommentListView.filters.all")}
      >
        {[
          {
            label: t("exercisePage.exerciseCommentListView.filters.all"),
            value: -1,
          },
          ...LEVELS,
        ].map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );

  const renderStatus = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        {t("exercisePage.exerciseCommentListView.filters.status")}
      </Typography>

      <TextField
        select
        fullWidth
        value={filters.status}
        onChange={(event) => handleFilterStatus(parseInt(event.target.value))}
        placeholder={t("exercisePage.exerciseCommentListView.filters.status")}
      >
        {[
          {
            label: t("exercisePage.exerciseCommentListView.filters.all"),
            value: -1,
            color: "default" as LabelColor,
          },
          ...NOTIFICATION_STATUS,
        ].map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Label color={option.color}>{option.label}</Label>
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );

  const renderTourGuide = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        {t("exercisePage.exerciseCommentListView.filters.muscle")}
      </Typography>

      <Autocomplete
        multiple
        disableCloseOnSelect
        options={benefits}
        value={filters.benefits}
        onChange={(event, newValue) => handleFilterMuscle(newValue)}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            placeholder={t(
              "exercisePage.exerciseCommentListView.filters.searchPlaceholder"
            )}
            {...params}
          />
        )}
        renderOption={(props, benefit) => (
          <li {...props} key={benefit}>
            {benefit}
          </li>
        )}
        renderTags={(selected, getTagProps) =>
          selected.map((benefit, index) => (
            <Chip
              {...getTagProps({ index })}
              key={benefit}
              size="small"
              variant="soft"
              label={benefit}
              avatar={<Image alt={benefit} src={benefit} />}
            />
          ))
        }
      />
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
        {t("exercisePage.exerciseCommentListView.filtersResult.filters")}
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
            {renderTourGuide} {renderLevel} {renderStatus}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
