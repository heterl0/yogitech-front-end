import { useCallback } from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack, { StackProps } from "@mui/material/Stack";
import Iconify from "@/components/iconify";
import {
  ICommentTableFilterValue,
  ICommentTableFilters,
} from "@/types/exercise";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: ICommentTableFilters;
  onFilters: (name: string, value: ICommentTableFilterValue) => void;
  //
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function ExerciseCommentTableFiltersResult({
  filters,
  onFilters,
  //
  onResetFilters,
  //
  results,
  ...other
}: Props) {
  const handleRemoveKeyword = useCallback(() => {
    onFilters("name", "");
  }, [onFilters]);

  const { t } = useTranslation();
  const handleRemoveStatus = useCallback(
    (inputValue: string) => {
      const newValue = filters.status.filter(
        (item: string) => item !== inputValue
      );

      onFilters("status", newValue);
    },
    [filters.status, onFilters]
  );

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: "body2" }}>
        {/* <strong>{`${results} `}</strong> */}
        <Box component="span" sx={{ color: "text.secondary", ml: 0.25 }}>
          {t(
            "exercisePage.exerciseCommentListView.filtersResult.resultsFound",
            { num: results }
          )}
        </Box>
      </Box>

      <Stack
        flexGrow={1}
        spacing={1}
        direction="row"
        flexWrap="wrap"
        alignItems="center"
      >
        {!!filters.status.length && (
          <Block
            label={t(
              "exercisePage.exerciseCommentListView.filtersResult.status"
            )}
          >
            {filters.status.map((item: string) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveStatus(item)}
              />
            ))}
          </Block>
        )}

        {!!filters.name && (
          <Block
            label={t(
              "exercisePage.exerciseCommentListView.filtersResult.keyword"
            )}
          >
            <Chip
              label={filters.name}
              size="small"
              onDelete={handleRemoveKeyword}
            />
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          {t("exercisePage.exerciseCommentListView.filtersResult.clear")}
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
