import { m } from "framer-motion";

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
      }}
    >
      <Box
        component={m.div}
        variants={varFade().inDown}
        sx={{ color: "common.white", mb: 2, typography: "h2" }}
      >
        {t("download.getApp")}
      </Box>

      <Box
        component={m.div}
        variants={varFade().inDown}
        sx={{ color: "common.white", mb: 3 }}
      >
        {t("download.comingSoon")}
      </Box>

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={{ xs: "center", md: "flex-start" }}
        spacing={2}
      >
        <m.div variants={varFade().inRight}>
          <Button
            color="inherit"
            size="large"
            variant="contained"
            rel="noopener"
            href="https://storage.yogitech.me/yogitech_release_v1_0.apk"
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
      </Stack>
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
        alt="Yogitech download"
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
      >
        {renderImg}

        {renderDescription}
      </Stack>
    </Container>
  );
}
