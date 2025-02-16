import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Divider from "@mui/material/Divider";
import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack, { StackProps } from "@mui/material/Stack";
import { useResponsive } from "@/hooks/use-responsive";
import Iconify from "@/components/iconify";
import { m } from "framer-motion";
import { varFade, MotionViewport } from "@/components/animate";
import { useTranslate } from "@/locales";

// ----------------------------------------------------------------------

export default function HomePricing() {
  const mdUp = useResponsive("up", "md");

  const [currentTab, setCurrentTab] = useState("Standard");

  const { t } = useTranslate();

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  const renderDescription = (
    <Stack spacing={3} sx={{ mb: 10, textAlign: "center" }}>
      <m.div variants={varFade().inUp}>
        <Typography
          component="div"
          variant="overline"
          sx={{ mb: 2, color: "text.disabled" }}
        >
          {t("home.pricing.plans")}
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2">{t("home.pricing.rightPlan")}</Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: "text.secondary" }}>
          {t("home.pricing.choosePlan")}
        </Typography>
      </m.div>
    </Stack>
  );

  const _yogiTechPlan = [...Array(2)].map((_, index) => ({
    license: [
      t("home.pricing.yogiTechPlan.free"),
      t("home.pricing.yogiTechPlan.premium"),
    ][index],
    commons: [t("home.pricing.yogiTechPlan.10free")],
    options: [
      t("home.pricing.yogiTechPlan.options.unlimit"),
      t("home.pricing.yogiTechPlan.options.adv"),
      t("home.pricing.yogiTechPlan.options.personal"),
    ],
    icons: [
      "/assets/icons/platforms/ic_js.svg",
      "/assets/icons/platforms/ic_ts.svg",
      "/assets/icons/platforms/ic_figma.svg",
    ],
  }));

  const renderContent = (
    <>
      {mdUp ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          sx={{
            borderRadius: 2,
            border: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {_yogiTechPlan.map((plan, index) => (
            <m.div key={index} variants={varFade().in}>
              <PlanCard key={plan.license} plan={plan} />
            </m.div>
          ))}
        </Box>
      ) : (
        <>
          <Stack alignItems="center" sx={{ mb: 5 }}>
            <Tabs value={currentTab} onChange={handleChangeTab}>
              {_yogiTechPlan.map((tab) => (
                <Tab
                  key={tab.license}
                  value={tab.license}
                  label={tab.license}
                />
              ))}
            </Tabs>
          </Stack>

          <Box
            sx={{
              borderRadius: 2,
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            {_yogiTechPlan.map(
              (tab, index) =>
                tab.license === currentTab && (
                  <PlanCard
                    key={index}
                    plan={tab}
                    sx={{
                      borderLeft: (theme) =>
                        `dashed 1px ${theme.palette.divider}`,
                    }}
                  />
                )
            )}
          </Box>
        </>
      )}
    </>
  );

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}

        {renderContent}
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

interface PlanCardProps extends StackProps {
  plan: {
    license: string;
    commons: string[];
    options: string[];
    icons: string[];
  };
}

function PlanCard({ plan, sx, ...other }: PlanCardProps) {
  const { license, commons, options } = plan;

  const { t } = useTranslate();

  const standardLicense = license === t("home.pricing.yogiTechPlan.free");

  const plusLicense = license === t("home.pricing.yogiTechPlan.premium");

  return (
    <Stack
      spacing={5}
      sx={{
        p: 5,
        pt: 10,
        ...(plusLicense && {
          borderLeft: (theme) => `dashed 1px ${theme.palette.divider}`,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...sx,
        }),
      }}
      {...other}
    >
      <Stack spacing={2}>
        <Typography
          variant="overline"
          component="div"
          sx={{ color: "text.disabled" }}
        >
          {t("home.pricing.yogiTechPlan.plan")}
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Typography variant="h4">{license}</Typography>
          <Box
            sx={{
              left: 0,
              bottom: 4,
              width: 40,
              height: 8,
              opacity: 0.48,
              bgcolor: "error.main",
              position: "absolute",
              ...(standardLicense && { bgcolor: "primary.main" }),
              ...(plusLicense && { bgcolor: "warning.main" }),
            }}
          />
        </Box>
      </Stack>

      <Stack spacing={2.5}>
        {commons.map((option) => (
          <Stack key={option} spacing={1} direction="row" alignItems="center">
            <Iconify icon="eva:checkmark-fill" width={16} />
            <Typography variant="body2">{option}</Typography>
          </Stack>
        ))}

        <Divider sx={{ borderStyle: "dashed" }} />

        {options.map((option, optionIndex) => {
          const disabled =
            (standardLicense && optionIndex === 0) ||
            (standardLicense && optionIndex === 1) ||
            (standardLicense && optionIndex === 2) ||
            (standardLicense && optionIndex === 3) ||
            (plusLicense && optionIndex === 3);

          return (
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{
                ...(disabled && { color: "text.disabled" }),
              }}
              key={option}
            >
              <Iconify
                icon={disabled ? "mingcute:close-line" : "eva:checkmark-fill"}
                width={16}
              />
              <Typography variant="body2">{option}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
