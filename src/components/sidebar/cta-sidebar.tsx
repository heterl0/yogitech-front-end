"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Iconify from "@/components/iconify";
import { useTranslation } from "react-i18next";

export default function CtaSidebar() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: 300,
        position: { xs: "relative", lg: "sticky" },
        top: "72px",
        height: "fit-content",
        display: { xs: "none", md: "block" },
        borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
        p: 2,
      }}
    >
      <Stack spacing={3} sx={{ pb: 2 }}>
        <Typography variant="h6">{t("ctaSidebar.downloadApp")}</Typography>

        <Box
          sx={{
            width: "100%",
            bgcolor: "background.neutral",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src="/banner-2-ads.png"
            alt="App Screenshot"
            sx={{ width: "100%", height: 200, objectFit: "cover" }}
          />

          <Stack spacing={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1">
              {t("ctaSidebar.experience")}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {t("ctaSidebar.msg")}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                variant="contained"
                href="https://storage.zenaiyoga.com/files/zenaiyoga-beta-v1_0.1.apk"
                startIcon={<Iconify icon="ri:google-play-fill" />}
              >
                {t("ctaSidebar.googlePlay")}
              </Button>

              {/* <Button
                fullWidth
                variant="contained"
                startIcon={<Iconify icon="mdi:apple" />}
              >
                App Store
              </Button> */}
            </Stack>
          </Stack>
        </Box>

        <Stack spacing={2}>
          <Typography variant="subtitle2">
            {t("ctaSidebar.whyDownload")}
          </Typography>

          <Stack spacing={1}>
            {[
              {
                icon: "healthicons:exercise-yoga",
                text: t("ctaSidebar.list1"),
              },
              { icon: "fluent:flash-20-filled", text: t("ctaSidebar.list2") },
              { icon: "tabler:yoga", text: t("ctaSidebar.list3") },
              { icon: "solar:bookmark-bold", text: t("ctaSidebar.list4") },
            ].map((item, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Iconify
                  icon={item.icon}
                  width={20}
                  color={theme.palette.primary.main}
                />
                <Typography variant="body2">{item.text}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
