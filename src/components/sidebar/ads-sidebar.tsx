"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Iconify from "@/components/iconify";
import { useTranslation } from "react-i18next";
import AdBanner from "../ad-banner/ad-banner";

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
          <Typography
            variant="body1"
            className="!text-black-main !text-sm !font-medium"
          >
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
          <AdBanner
            className="adsbygoogle"
            style={{ display: "inline-block", width: "300px", height: "600px" }}
            data-ad-client="ca-pub-3767915082225357"
            data-ad-slot="1889465032"
          />
        </Box>
      </Stack>
    </Box>
  );
}
