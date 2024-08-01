import { m } from "framer-motion";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { varFade, MotionViewport } from "@/components/animate";
import { useMemo } from "react";
import { useTranslate } from "@/locales";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const { t } = useTranslate();

  const CARDS = useMemo(
    () => [
      {
        icon: " /assets/icons/home/ic_make_brand.svg",
        title: t("home.minimal.card1.title"),
        description: t("home.minimal.card1.description"),
      },
      {
        icon: " /assets/icons/home/ic_design.svg",
        title: t("home.minimal.card2.title"),
        description: t("home.minimal.card2.description"),
      },
      {
        icon: " /assets/icons/home/ic_development.svg",
        title: t("home.minimal.card3.title"),
        description: t("home.minimal.card3.description"),
      },
    ],
    [t]
  );

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: "center",
          mb: { xs: 5, md: 10 },
        }}
      >
        <m.div variants={varFade().inUp}>
          <Typography
            component="div"
            variant="overline"
            sx={{ color: "text.disabled" }}
          >
            YogiTech
          </Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography variant="h2">
            {t("home.minimal.description1")} <br />{" "}
            {t("home.minimal.description2")}
          </Typography>
        </m.div>
      </Stack>

      <Box
        gap={{ xs: 3, lg: 10 }}
        display="grid"
        alignItems="center"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        {CARDS.map((card, index) => (
          <m.div variants={varFade().inUp} key={index}>
            <Card
              sx={{
                textAlign: "center",
                boxShadow: { md: "none" },
                bgcolor: "background.default",
                p: (theme) => theme.spacing(10, 5),
                ...(index === 1 && {
                  boxShadow: (theme) => ({
                    md: `-40px 40px 80px ${
                      theme.palette.mode === "light"
                        ? alpha(theme.palette.grey[500], 0.16)
                        : alpha(theme.palette.common.black, 0.4)
                    }`,
                  }),
                }),
              }}
            >
              <Box
                component="img"
                src={card.icon}
                alt={+"Yogitech - " + card.title}
                sx={{ mx: "auto", width: 48, height: 48 }}
              />

              <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
                {card.title}
              </Typography>

              <Typography sx={{ color: "text.secondary" }}>
                {card.description}
              </Typography>
            </Card>
          </m.div>
        ))}
      </Box>
    </Container>
  );
}
