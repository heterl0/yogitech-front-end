import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
// import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Iconify from "@/components/iconify";
import CustomPopover, { usePopover } from "@/components/custom-popover";

import {
  ICommentTableFilterValue,
  ICommentTableFilters,
} from "@/types/exercise";

// ----------------------------------------------------------------------

type Props = {
  filters: ICommentTableFilters;
  onFilters: (name: string, value: ICommentTableFilterValue) => void;
  //
  StatusOptions: string[];
};

export default function ExerciseCommentTableToolbar({
  filters,
  onFilters,
  //
  StatusOptions,
}: Props) {
  const { t } = useTranslation();
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters("name", event.target.value);
    },
    [onFilters]
  );

  const handleFilterStatus = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        "status",
        typeof event.target.value === "string"
          ? event.target.value.split(",")
          : event.target.value
      );
    },
    [onFilters]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: "flex-end", md: "center" }}
        direction={{
          xs: "column",
          md: "row",
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>
            {t("exercisePage.exerciseCommentListView.filters.status")}
          </InputLabel>

          <Select
            multiple
            value={filters.status}
            onChange={handleFilterStatus}
            input={
              <OutlinedInput
                label={t("exercisePage.exerciseCommentListView.filters.status")}
              />
            }
            renderValue={(selected) =>
              selected.map((value) => value).join(", ")
            }
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {StatusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={filters.status.includes(option)}
                />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          flexGrow={1}
          sx={{ width: 1 }}
        >
          <TextField
            fullWidth
            value={filters.name}
            onChange={handleFilterName}
            placeholder={t(
              "exercisePage.exerciseCommentListView.filters.searchPlaceholder"
            )}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          {/* <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          {t("exercisePage.exerciseCommentListView.tableRow.quickEdit")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          {t("exercisePage.exerciseCommentListView.tableRow.edit")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          {t("exercisePage.exerciseCommentListView.tableRow.ban")}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
