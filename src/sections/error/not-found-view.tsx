"use client";

import { m } from "framer-motion";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { RouterLink } from "@/routes/components";

import CompactLayout from "@/layouts/compact";
import { PageNotFoundIllustration } from "@/assets/illustrations";
import { useTranslation } from "react-i18next";

import { varBounce, MotionContainer } from "@/components/animate";

// ----------------------------------------------------------------------

export default function NotFoundView() {
  const { t } = useTranslation();
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {t("errorPage.notFoundView.title")}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>
            {t("errorPage.notFoundView.message")}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button
          component={RouterLink}
          href="/"
          size="large"
          variant="contained"
        >
          {t("errorPage.notFoundView.button")}
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
