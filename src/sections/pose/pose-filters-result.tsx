import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack, { StackProps } from "@mui/material/Stack";

import Iconify from "@/components/iconify";
import { IMuscle, IPoseFilterValue, IPoseFilters } from "@/types/pose";
import { LEVELS } from "@/constants/level";
import { NOTIFICATION_STATUS } from "@/types/notification";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: IPoseFilters;
  onFilters: (name: string, value: IPoseFilterValue) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function PoseFiltersResult({
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  results,
  ...other
}: Props) {
  const { t } = useTranslation();

  const handleRemoveLevel = () => {
    onFilters("level", -1);
  };

  const handleRemoveStatus = () => {
    onFilters("status", -1);
  };

  const handleRemoveMuscles = (inputValue: IMuscle) => {
    const newValue = filters.muscles.filter(
      (item) => item.name !== inputValue.name
    );
    onFilters("muscles", newValue);
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: "body2" }}>
        {/* <strong>{`${results} `}</strong> */}
        <Box component="span" sx={{ color: "text.secondary", ml: 0.25 }}>
          {t("posePage.poseFiltersResult.resultsFound", { num: results })}
        </Box>
      </Box>

      <Stack
        flexGrow={1}
        spacing={1}
        direction="row"
        flexWrap="wrap"
        alignItems="center"
      >
        {!!filters.muscles.length && (
          <Block label={t("posePage.poseFiltersResult.muscle")}>
            {filters.muscles.map((item) => (
              <Chip
                key={item.id}
                size="small"
                avatar={<Avatar alt={item.name} src={item.image} />}
                label={item.name}
                onDelete={() => handleRemoveMuscles(item)}
              />
            ))}
          </Block>
        )}

        {filters.level !== -1 && (
          <Block label={t("posePage.poseFiltersResult.level")}>
            <Chip
              label={LEVELS[filters.level - 1].label}
              size="small"
              onDelete={() => handleRemoveLevel()}
            />
          </Block>
        )}

        {filters.status !== -1 && (
          <Block label={t("posePage.poseFiltersResult.status")}>
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
            {t("posePage.poseFiltersResult.clear")}
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
