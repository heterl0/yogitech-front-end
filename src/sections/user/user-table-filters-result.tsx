import { useCallback } from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack, { StackProps } from "@mui/material/Stack";

import Iconify from "@/components/iconify";

import { IUserTableFilters, IUserTableFilterValue } from "@/types/user";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: IUserTableFilters;
  onFilters: (name: string, value: IUserTableFilterValue) => void;
  //
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function UserTableFiltersResult({
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
    onFilters("name", "");
  }, [onFilters]);

  const handleRemoveStatus = useCallback(() => {
    onFilters("status", "all");
  }, [onFilters]);

  const handleRemoveRole = useCallback(
    (inputValue: string) => {
      const newValue = filters.role.filter((item) => item !== inputValue);

      onFilters("role", newValue);
    },
    [filters.role, onFilters]
  );

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: "body2" }}>
        <strong>{`${results} `}</strong>
        <Box component="span" sx={{ color: "text.secondary", ml: 0.25 }}>
          {t("filterResults.resultsFound", { num: results })}
        </Box>
      </Box>

      <Stack
        flexGrow={1}
        spacing={1}
        direction="row"
        flexWrap="wrap"
        alignItems="center"
      >
        {filters.status !== "all" && (
          <Block label={t("filterResults.status")}>
            <Chip
              size="small"
              label={t(`accountListView.statusOptions.${filters.status}`)}
              onDelete={handleRemoveStatus}
            />
          </Block>
        )}

        {!!filters.role.length && (
          <Block label={t("filterResults.role")}>
            {filters.role.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveRole(item)}
              />
            ))}
          </Block>
        )}

        {!!filters.name && (
          <Block label={t("filterResults.keyword")}>
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
          {t("filterResults.clear")}
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
