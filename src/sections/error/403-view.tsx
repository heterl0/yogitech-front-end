"use client";

import { m } from "motion/react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { RouterLink } from "@/routes/components";

import CompactLayout from "@/layouts/compact";
import { ForbiddenIllustration } from "@/assets/illustrations";

import { varBounce, MotionContainer } from "@/components/animate";
import { useTranslation } from "react-i18next";
import { MotionLazy } from "@/components/animate/motion-lazy";

// ----------------------------------------------------------------------

export default function View403() {
  const { t } = useTranslation();
  return (
    <MotionLazy>
      <CompactLayout>
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              {t("errorPage.view403.title")}
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: "text.secondary" }}>
              {t("errorPage.view403.message")}
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <ForbiddenIllustration
              sx={{ height: 260, my: { xs: 5, sm: 10 } }}
            />
          </m.div>

          <Button
            component={RouterLink}
            href="/"
            size="large"
            variant="contained"
          >
            {t("errorPage.view403.button")}
          </Button>
        </MotionContainer>
      </CompactLayout>
    </MotionLazy>
  );
}
