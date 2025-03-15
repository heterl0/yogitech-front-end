"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Iconify from "@/components/iconify";
import { useTranslation } from "react-i18next";

export default function AdsSidebar() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: 300,
        position: { xs: "relative", lg: "sticky" },
        top: "72px",
        height: "calc(100vh - 32px)",
        display: { xs: "none", md: "block" },
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        p: 2,
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="solar:ads-bold" width={24} />
          <Typography variant="subtitle1">
            {t("adsSidebar.sponsored")}
          </Typography>
        </Stack>

        {/* Google Ads Container */}
        <Box
          sx={{
            width: "100%",
            height: "600px",
            bgcolor: "background.neutral",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Replace this with your actual Google Ads code */}
          <Typography variant="body2" color="text.secondary" align="center">
            {t("adsSidebar.placeholder")}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
