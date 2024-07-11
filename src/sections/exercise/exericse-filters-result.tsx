import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack, { StackProps } from "@mui/material/Stack";

import Iconify from "@/components/iconify";
import { LEVELS } from "@/constants/level";
import { NOTIFICATION_STATUS } from "@/types/notification";
import { IExerciseFilterValue, IExerciseFilters } from "@/types/exercise";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: IExerciseFilters;
  onFilters: (name: string, value: IExerciseFilterValue) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function ExerciseFiltersResult({
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  results,
  ...other
}: Props) {
  // const shortLabel = shortDateLabel(filters.startDate, filters.endDate);

  const { t } = useTranslation();

  const handleRemoveLevel = () => {
    onFilters("level", -1);
  };

  const handleRemoveStatus = () => {
    onFilters("status", -1);
  };

  // const handleRemoveAvailable = () => {
  //   onFilters("startDate", null);
  //   onFilters("endDate", null);
  // };

  const handleRemoveMuscles = (inputValue: string) => {
    const newValue = filters.benefits.filter((item) => item !== inputValue);
    onFilters("benefits", newValue);
  };

  // const handleRemoveDestination = (inputValue: string) => {
  //   const newValue = filters.destination.filter((item) => item !== inputValue);
  //   onFilters("destination", newValue);
  // };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: "body2" }}>
        <strong>{`${results} `}</strong>
        <Box component="span" sx={{ color: "text.secondary", ml: 0.25 }}>
          {t("filterResults.resultsFound")}
        </Box>
      </Box>

      <Stack
        flexGrow={1}
        spacing={1}
        direction="row"
        flexWrap="wrap"
        alignItems="center"
      >
        {/* {filters.startDate && filters.endDate && (
          <Block label="Available:">
            <Chip
              size="small"
              label={shortLabel}
              onDelete={handleRemoveAvailable}
            />
          </Block>
        )} */}

        {!!filters.benefits.length && (
          <Block label={t("filterResults.benefit")}>
            {filters.benefits.map((item) => (
              <Chip
                key={item}
                size="small"
                // avatar={<Avatar alt={item} src={item.image} />}
                label={item}
                onDelete={() => handleRemoveMuscles(item)}
              />
            ))}
          </Block>
        )}

        {filters.level !== -1 && (
          <Block label={t("filterResults.level")}>
            <Chip
              label={LEVELS[filters.level - 1].label}
              size="small"
              onDelete={() => handleRemoveLevel()}
            />
          </Block>
        )}

        {filters.status !== -1 && (
          <Block label={t("filterResults.status")}>
            <Chip
              label={NOTIFICATION_STATUS[filters.status].label}
              size="small"
              onDelete={() => handleRemoveStatus()}
            />
          </Block>
        )}

        {canReset && (
          <Button
            color="error"
            onClick={onResetFilters}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
            {t("filterResults.clear")}
          </Button>
        )}
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
