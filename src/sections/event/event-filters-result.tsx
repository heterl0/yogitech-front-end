import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack, { StackProps } from "@mui/material/Stack";

import Iconify from "@/components/iconify";
import { EVENT_STATUS, IEventFilterValue, IEventFilters } from "@/types/event";
import { shortDateLabel } from "@/components/custom-date-range-picker";

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: IEventFilters;
  onFilters: (name: string, value: IEventFilterValue) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function EventFiltersResult({
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

  const handleRemoveStatus = () => {
    onFilters("status", -1);
  };

  const handleRemoveAvailable = () => {
    onFilters("startDate", null);
    onFilters("endDate", null);
  };
  // const handleRemoveDestination = (inputValue: string) => {
  //   const newValue = filters.destination.filter((item) => item !== inputValue);
  //   onFilters("destination", newValue);
  // };

  const shortLabel = shortDateLabel(filters.startDate, filters.endDate);

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: "body2" }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: "text.secondary", ml: 0.25 }}>
          results found
        </Box>
      </Box>

      <Stack
        flexGrow={1}
        spacing={1}
        direction="row"
        flexWrap="wrap"
        alignItems="center"
      >
        {filters.startDate && filters.endDate && (
          <Block label="Available:">
            <Chip
              size="small"
              label={shortLabel}
              onDelete={handleRemoveAvailable}
            />
          </Block>
        )}

        {filters.status !== -1 && (
          <Block label="Status:">
            <Chip
              label={EVENT_STATUS[filters.status].label}
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
            Clear
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
