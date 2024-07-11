import { useCallback } from "react";

import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
// import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useTranslation } from "react-i18next";
import Iconify from "@/components/iconify";
import CustomPopover, { usePopover } from "@/components/custom-popover";
import {
  IExerciseLogTableFilters,
  IExerciseLogTableFilterValue,
} from "@/types/exercise";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocales } from "@/locales";
import { format } from "date-fns";

// ----------------------------------------------------------------------

type Props = {
  filters: IExerciseLogTableFilters;
  onFilters: (name: string, value: IExerciseLogTableFilterValue) => void;
  dateError: boolean;
};

export default function ActivityTableToolbar({
  filters,
  onFilters,
  dateError,
}: Props) {
  const { t } = useTranslation();

  const { currentLang } = useLocales();

  const dateFormatter = useCallback(
    (weekday: Date) =>
      format(weekday, "iiiiii", { locale: currentLang.adapterLocale }),
    [currentLang]
  );
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters("id", event.target.value);
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
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          flexGrow={1}
          sx={{ width: 1 }}
        >
          <TextField
            fullWidth
            value={filters.id}
            onChange={handleFilterName}
            placeholder={t("notiPage.Search...")}
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
        </Stack>
        <Stack spacing={2.5} direction="row">
          <DatePicker
            label={t("eventPage.listView.filters.startDate")}
            value={filters.startDate}
            onChange={handleFilterStartDate}
            dayOfWeekFormatter={dateFormatter}
            format="dd/MM/yyyy"
          />

          <DatePicker
            label={t("eventPage.listView.filters.endDate")}
            value={filters.endDate}
            onChange={handleFilterEndDate}
            dayOfWeekFormatter={dateFormatter}
            format="dd/MM/yyyy"
            slotProps={{
              textField: {
                error: dateError,
                helperText:
                  dateError && t("eventPage.listView.filters.endDateError"),
              },
            }}
          />
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
          {t("notiPage.Print")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          {t("notiPage.Import")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          {t("notiPage.Export")}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
