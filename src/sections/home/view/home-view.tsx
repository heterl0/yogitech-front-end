"use client";

import { useScroll } from "framer-motion";

import Box from "@mui/material/Box";
// import { styled } from "@mui/material/styles";

import MainLayout from "@/layouts/main";

import ScrollProgress from "@/components/scroll-progress";

import HomeHero from "../home-hero";
import HomeMinimal from "../home-minimal";
import HomePricing from "../home-pricing";

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <HomeHero />
      <Box
        sx={{
          overflow: "hidden",
          position: "relative",
          bgcolor: "background.default",
        }}
      >
        <HomeMinimal />
        <HomePricing />
      </Box>
    </MainLayout>
  );
}
