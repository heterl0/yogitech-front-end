import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Stack, { StackProps } from "@mui/material/Stack";

import { RouterLink } from "@/routes/components";

import Iconify from "@/components/iconify";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = StackProps & {
  backLink: string;
  editLink: string;
};

export default function EventDetailsToolbar({
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
          {t("eventPage.eventDetails.toolbar.back")}
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title={t("eventPage.eventDetails.toolbar.edit")}>
          <IconButton component={RouterLink} href={editLink}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );
}
