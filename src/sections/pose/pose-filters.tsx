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

import { IMuscle, IPoseFilterValue, IPoseFilters } from "@/types/pose";
import Image from "@/components/image";
import { LEVELS } from "@/constants/level";
import { MenuItem } from "@mui/material";
import { NOTIFICATION_STATUS } from "@/types/notification";
import Label, { LabelColor } from "@/components/label";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  //
  filters: IPoseFilters;
  onFilters: (name: string, value: IPoseFilterValue) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
  //
  muscleOptions: IMuscle[];
};

export default function PoseFilters({
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
  muscleOptions,
}: Props) {
  const { t } = useTranslation();

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

  const handleFilterMuscle = useCallback(
    (newValue: IMuscle[]) => {
      onFilters("muscles", newValue);
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
        {t("posePage.poseFilters.filters")}
      </Typography>

      <Tooltip title={t("posePage.poseFilters.reset")}>
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
        {t("posePage.poseFilters.levels")}
      </Typography>

      <TextField
        select
        fullWidth
        value={filters.level}
        onChange={(event) => handleFilterLevel(parseInt(event.target.value))}
        placeholder={t("posePage.poseFilters.selectLevel")}
      >
        {[{ label: t("posePage.poseFilters.all"), value: -1 }, ...LEVELS].map(
          (option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          )
        )}
      </TextField>
    </Stack>
  );

  const renderStatus = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        {t("posePage.poseFilters.status")}
      </Typography>

      <TextField
        select
        fullWidth
        value={filters.status}
        onChange={(event) => handleFilterStatus(parseInt(event.target.value))}
        placeholder={t("posePage.poseFilters.selectStatus")}
      >
        {[
          {
            label: t("posePage.poseFilters.all"),
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

  const renderMuscles = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        {t("posePage.poseFilters.muscles")}
      </Typography>

      <Autocomplete
        multiple
        disableCloseOnSelect
        options={muscleOptions}
        value={filters.muscles}
        onChange={(event, newValue) => handleFilterMuscle(newValue)}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            placeholder={t("posePage.poseFilters.selectMuscles")}
            {...params}
          />
        )}
        renderOption={(props, muscle) => (
          <li {...props} key={muscle.id}>
            <Image
              key={muscle.id}
              alt={muscle.image}
              src={muscle.image}
              sx={{ width: 24, height: 24, flexShrink: 0, mr: 1 }}
            />

            {muscle.name}
          </li>
        )}
        renderTags={(selected, getTagProps) =>
          selected.map((muscle, index) => (
            <Chip
              {...getTagProps({ index })}
              key={muscle.id}
              size="small"
              variant="soft"
              label={muscle.name}
              avatar={<Image alt={muscle.name} src={muscle.image} />}
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
        {t("posePage.poseFilters.filters")}
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
            {renderMuscles} {renderLevel} {renderStatus}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
