import { useCallback } from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack, { StackProps } from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import Iconify from "@/components/iconify";
import {
  IExerciseLogTableFilters,
  IExerciseLogTableFilterValue,
} from "@/types/exercise";
import { shortDateLabel } from "@/components/custom-date-range-picker";
import { useLocales } from "@/locales";

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: IExerciseLogTableFilters;
  onFilters: (name: string, value: IExerciseLogTableFilterValue) => void;
  //
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function ActivityTableFiltersResult({
  filters,
  onFilters,
  //
  onResetFilters,
  //
  results,
  ...other
}: Props) {
  const { t } = useTranslation();
  const handleRemoveKeyword = useCallback(() => {
    onFilters("id", "");
  }, [onFilters]);

  const handleRemoveAvailable = () => {
    onFilters("startDate", null);
    onFilters("endDate", null);
  };

  const { currentLang } = useLocales();

  const shortLabel = shortDateLabel(
    filters.startDate,
    filters.endDate,
    currentLang.adapterLocale
  );
  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: "body2" }}>
        <strong>{`${results} `}</strong>
        <Box component="span" sx={{ color: "text.secondary", ml: 0.25 }}>
          {t("notiPage.results found")}
        </Box>
      </Box>

      <Stack
        flexGrow={1}
        spacing={1}
        direction="row"
        flexWrap="wrap"
        alignItems="center"
      >
        {!!filters.id && (
          <Block label="Ids:">
            <Chip
              label={filters.id}
              size="small"
              onDelete={handleRemoveKeyword}
            />
          </Block>
        )}

        {filters.startDate && filters.endDate && (
          <Block label={t("filterResults.available")}>
            <Chip
              size="small"
              label={shortLabel}
              onDelete={handleRemoveAvailable}
            />
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          {t("notiPage.Clear")}
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: "hidden",
        borderStyle: "dashed",
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: "subtitle2" }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
