import { m } from "motion/react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

import { bgGradient } from "@/theme/css";

import Iconify from "@/components/iconify";
import { varFade, MotionViewport } from "@/components/animate";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function DownloadAdvertisement() {
  const theme = useTheme();

  const { t } = useTranslation();

  const renderDescription = (
    <Box
      sx={{
        textAlign: {
          xs: "center",
          md: "left",
        },
        px: { xs: 2, md: 5 },
      }}
    >
      <Box
        component={m.div}
        variants={varFade().inDown}
        sx={{ color: "common.white", mb: 2, typography: "h2" }}
      >
        {t("download.getApp")}
      </Box>
      <div className="flex flex-col-reverse items-center gap-3 md:flex-col md:items-start md:gap-2">
        <Box
          component={m.div}
          variants={varFade().inDown}
          sx={{ color: "common.white", mb: 1 }}
        >
          {t("download.comingSoon")}
        </Box>

        <Box
          component={m.div}
          variants={varFade().inDown}
          className="mb-3 max-w-md text-xs font-medium text-gray-300"
        >
          {t("download.note")}
        </Box>

        <div className="flex flex-row items-center justify-center gap-2 md:justify-start">
          <m.div variants={varFade().inRight}>
            <Button
              id="download-android"
              color="inherit"
              size="large"
              variant="contained"
              rel="noopener"
              href="https://storage.zenaiyoga.com/files/zenaiyoga-beta-v1_0.1.apk"
              sx={{
                color: "grey.800",
                bgcolor: "common.white",
                ":hover": {
                  bgcolor: "common.white",
                },
              }}
              startIcon={
                <Iconify
                  icon="ant-design:android-filled"
                  width={24}
                  sx={{ mr: 0 }}
                />
              }
            >
              {t("download.android")}
            </Button>
          </m.div>
          <m.div variants={varFade().inRight}>
            <Button
              id="download-android"
              color="inherit"
              size="large"
              target="_blank"
              variant="contained"
              rel="noopener"
              href="https://play.google.com/store/apps/details?id=com.yogitech.yogi_application"
              sx={{
                color: "grey.800",
                bgcolor: "common.white",
                ":hover": {
                  bgcolor: "common.white",
                },
              }}
              startIcon={
                <Iconify icon="mdi:google-play" width={24} sx={{ mr: 0 }} />
              }
            >
              Play Store
            </Button>
          </m.div>

          <m.div variants={varFade().inRight} className="flex items-center">
            <span className="text-sm font-bold md:text-xl">
              👈
              <span className="to-gray bg-gradient-to-br from-[#fdfdfd] to-gray-200 bg-clip-text font-bold text-transparent">
                {t("download.click-me")}
              </span>
            </span>
          </m.div>
        </div>
      </div>
    </Box>
  );

  const renderImg = (
    <Stack component={m.div} variants={varFade().inUp} alignItems="center">
      <Box
        component={m.img}
        animate={{
          y: [-20, 0, -20],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        alt="Zenaiyoga download"
        src="/assets/images/home/rocket.webp"
        sx={{ maxWidth: 460 }}
      />
    </Stack>
  );

  return (
    <Container component={MotionViewport}>
      <Stack
        alignItems="center"
        direction={{ xs: "column", md: "row" }}
        sx={{
          ...bgGradient({
            direction: "135deg",
            startColor: theme.palette.primary.main,
            endColor: theme.palette.primary.dark,
          }),
          borderRadius: 2,
          pb: { xs: 5, md: 0 },
        }}
        className="overflow-hidden"
      >
        {renderImg}

        {renderDescription}
      </Stack>
    </Container>
  );
}
