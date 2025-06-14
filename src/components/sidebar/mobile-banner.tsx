"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Iconify from "@/components/iconify";
import { useTranslation } from "react-i18next";

export default function MobileBanner() {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "background.paper",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        p: 2,
        zIndex: 999,
        display: { xs: "block", md: "none" },
      }}
    >
      <div className="flex flex-row items-center justify-between gap-2">
        <IconButton
          size="small"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          sx={{ position: "absolute", top: 6, right: 6 }}
        >
          <Iconify icon="eva:close-fill" width={20} />
        </IconButton>

        <div className="flex items-center gap-2">
          <Box
            component="img"
            src="/logo/logo.svg?height=60&width=60"
            alt="App Icon"
            sx={{ width: 60, height: 60, borderRadius: 1 }}
          />

          <div className="flex w-full max-w-40 flex-col gap-1">
            <Typography
              variant="body1"
              className="!text-black-main !text-sm !font-medium"
              noWrap
            >
              {t("mobileBanner.downloadApp")}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary" }}
              noWrap
            >
              {t("mobileBanner.description")}
            </Typography>
          </div>
        </div>

        <Button
          className="flex-none"
          variant="contained"
          size="small"
          target="_blank"
          href="https://play.google.com/store/apps/details?id=com.yogitech.yogi_application"
          startIcon={<Iconify icon="ri:google-play-fill" />}
        >
          {t("mobileBanner.getButton")}
        </Button>
      </div>
    </Box>
  );
}
