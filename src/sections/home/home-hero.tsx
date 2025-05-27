"use client";

import { m, useScroll } from "motion/react";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";
import { HEADER } from "@/layouts/config-layout";
import { bgBlur, bgGradient, textGradient } from "@/theme/css";
import Iconify from "@/components/iconify";
import { varFade, MotionContainer } from "@/components/animate";
import { useTranslate } from "@/locales";
import { useMediaQuery } from "@mui/material";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  ...bgGradient({
    color: alpha(
      theme.palette.background.default,
      theme.palette.mode === "light" ? 0.9 : 0.94
    ),
    imgUrl: "/assets/background/overlay_3.webp",
  }),
  width: "100%",
  height: "100vh",
  position: "relative",
  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    position: "fixed",
  },
}));

const StyledWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  overflow: "hidden",
  position: "relative",
  [theme.breakpoints.up("md")]: {
    marginTop: HEADER.H_DESKTOP_OFFSET,
  },
}));

const StyledTextGradient = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  padding: 0,
  // marginTop: 8,
  fontWeight: 900,
  // marginBottom: 24,
  letterSpacing: 8,
  textAlign: "center",
  backgroundSize: "400%",
  fontSize: `${64 / 16}rem`,
  fontFamily: theme.typography.fontSecondaryFamily,
  [theme.breakpoints.up("xs")]: {
    lineHeight: "5.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: `${96 / 16}rem`,
    lineHeight: "8rem",
  },
}));

const StyledEllipseTop = styled("div")(({ theme }) => ({
  top: -80,
  width: 480,
  right: -80,
  height: 480,
  borderRadius: "50%",
  position: "absolute",
  filter: "blur(100px)",
  WebkitFilter: "blur(100px)",
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledEllipseBottom = styled("div")(({ theme }) => ({
  height: 400,
  bottom: -200,
  left: "10%",
  right: "10%",
  borderRadius: "50%",
  position: "absolute",
  filter: "blur(100px)",
  WebkitFilter: "blur(100px)",
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

type StyledPolygonProps = {
  opacity?: number;
  anchor?: "left" | "right";
};

const StyledPolygon = styled("div")<StyledPolygonProps>(
  ({ opacity = 1, anchor = "left", theme }) => ({
    ...bgBlur({
      opacity,
      color: theme.palette.background.default,
    }),
    zIndex: 9,
    bottom: 0,
    height: 80,
    width: "50%",
    position: "absolute",
    clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
    ...(anchor === "left" && {
      left: 0,
      ...(theme.direction === "rtl" && {
        transform: "scale(-1, 1)",
      }),
    }),
    ...(anchor === "right" && {
      right: 0,
      transform: "scaleX(-1)",
      ...(theme.direction === "rtl" && {
        transform: "scaleX(1)",
      }),
    }),
  })
);

// ----------------------------------------------------------------------

export default function HomeHero() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const theme = useTheme();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const [percent, setPercent] = useState(0);
  const { t } = useTranslate();

  const opacity = useMemo(() => 1 - percent / 100, [percent]);
  const hide = useMemo(() => percent > 120, [percent]);
  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on("change", (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const renderDescription = (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{
        height: 1,
        position: "relative",
        zIndex: 10,
        mx: "auto",
        maxWidth: 480,
        padding: "1rem",
        opacity: opacity > 0 ? opacity : 0,
        mt: {
          md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
        },
      }}
    >
      <m.div variants={varFade().in}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
          }}
        >
          {t("home.hero.subtitle")}
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <StyledTextGradient
          animate={{ backgroundPosition: "200% center" }}
          transition={{
            repeatType: "reverse",
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
        >
          YogiTech
        </StyledTextGradient>
      </m.div>

      <m.div variants={varFade().in} className="hidden lg:block">
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          {t("home.hero.description")}
        </Typography>
      </m.div>

      <Typography
        variant="body2"
        sx={{ textAlign: "center" }}
        className="lg:hidden"
      >
        {t("home.hero.description")}
      </Typography>

      <m.div variants={varFade().in}>
        <Stack spacing={1.5} direction={{ xs: "column-reverse", sm: "row" }}>
          <Stack alignItems="center" spacing={2}>
            <Button
              component={RouterLink}
              href={paths.download}
              color="primary"
              size="large"
              variant="contained"
              startIcon={<Iconify icon="eva:flash-fill" width={24} />}
            >
              {t("home.hero.download")}
            </Button>
          </Stack>
        </Stack>
      </m.div>
    </Stack>
  );

  const renderSlides = (
    <Stack
      direction="row"
      alignItems="flex-start"
      sx={{
        height: "150%",
        position: "absolute",
        opacity: opacity > 0 ? opacity : 0,
        transform: `skew(${-16 - percent / 24}deg, ${4 - percent / 16}deg)`,
        ...(theme.direction === "rtl" && {
          transform: `skew(${16 + percent / 24}deg, ${4 + percent / 16}deg)`,
        }),
      }}
    >
      <Stack
        component={m.div}
        variants={varFade().in}
        sx={{
          width: 344,
          position: "relative",
        }}
      >
        <m.div
          animate={{ y: ["0%", "100%"] }}
          transition={{
            repeatType: "loop" as const,
            ease: "linear",
            duration: 60 * 4,
            repeat: Infinity,
          }}
          style={{ position: "absolute", marginTop: -20 }}
        >
          <Image
            alt="Yogitech Hero"
            src="https://storage.yogitech.me/images/light_1.webp"
            width="304"
            height="1892"
            quality={75}
            className="hidden h-full w-full object-cover lg:block"
            priority
          />
        </m.div>
        <m.div
          animate={{ y: ["-100%", "0%"] }}
          transition={{
            repeatType: "loop" as const,
            ease: "linear",
            duration: 60 * 4,
            repeat: Infinity,
          }}
          style={{ position: "absolute" }}
        >
          <Image
            alt="Yogitech Hero"
            src="https://storage.yogitech.me/images/light_1.webp"
            width="304"
            height="1892"
            quality={75}
            className="hidden h-full w-full object-cover lg:block"
          />
        </m.div>
      </Stack>

      <Stack
        component={m.div}
        variants={varFade().in}
        sx={{ width: 720, position: "relative", ml: -5 }}
      >
        <m.div
          animate={{ y: ["100%", "0%"] }}
          transition={{
            repeatType: "loop" as const,
            ease: "linear",
            duration: 60 * 4,
            repeat: Infinity,
          }}
          style={{ position: "absolute", marginTop: -20 }}
        >
          <Image
            alt="Yogitech Hero"
            src="https://storage.yogitech.me/images/light_2.webp"
            width="563"
            height="1316"
            quality={75}
            className="hidden h-full w-full object-cover lg:block"
          />
        </m.div>
        <m.div
          animate={{ y: ["0%", "-100%"] }}
          transition={{
            repeatType: "loop" as const,
            ease: "linear",
            duration: 60 * 4,
            repeat: Infinity,
          }}
          style={{ position: "absolute" }}
        >
          <Image
            alt="Yogitech Hero"
            src="https://storage.yogitech.me/images/light_2.webp"
            width="563"
            height="1316"
            quality={75}
            className="hidden h-full w-full object-cover lg:block"
          />
        </m.div>
      </Stack>
    </Stack>
  );

  const renderPolygons = (
    <>
      <StyledPolygon />
      <StyledPolygon anchor="right" opacity={0.48} />
      <StyledPolygon
        anchor="right"
        opacity={0.48}
        sx={{ height: 48, zIndex: 10 }}
      />
      <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 24 }} />
    </>
  );

  const renderEllipses = (
    <>
      {isDesktop && <StyledEllipseTop />}
      <StyledEllipseBottom />
    </>
  );

  return (
    <>
      <StyledRoot
        ref={heroRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container columnSpacing={{ md: 10 }} sx={{ height: 1 }}>
              <Grid xs={12} md={6}>
                {renderDescription}
              </Grid>

              <Grid md={6} className="!hidden lg:!block">
                {renderSlides}
              </Grid>
            </Grid>
          </Container>

          {renderEllipses}
        </StyledWrapper>
      </StyledRoot>

      {isDesktop && renderPolygons}

      <div className="md:h-screen" />
    </>
  );
}
