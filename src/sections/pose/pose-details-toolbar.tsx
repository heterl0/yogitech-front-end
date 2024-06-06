import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack, { StackProps } from "@mui/material/Stack";
import { RouterLink } from "@/routes/components";
import Iconify from "@/components/iconify";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = StackProps & {
  backLink: string;
  editLink: string;
};

export default function PoseDetailsToolbar({
  backLink,
  editLink,
  sx,
  ...other
}: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Stack
        spacing={1.5}
        direction="row"
        sx={{
          mb: { xs: 3, md: 5 },
          ...sx,
        }}
        {...other}
      >
        <Button
          component={RouterLink}
          href={backLink}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          {t("posePage.poseDetailsToolbar.back")}
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          component={RouterLink}
          href={editLink}
          variant="outlined"
          color="primary"
          startIcon={<Iconify icon="solar:pen-bold" width={16} />}
        >
          {t("posePage.poseDetailsToolbar.edit")}
        </Button>
      </Stack>
    </>
  );
}
