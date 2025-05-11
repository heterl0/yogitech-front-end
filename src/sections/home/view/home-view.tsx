"use client";

import { useScroll } from "motion/react";
import Box from "@mui/material/Box";
import MainLayout from "@/layouts/main";
import ScrollProgress from "@/components/scroll-progress";
import HomeHero from "../home-hero";
import HomeMinimal from "../home-minimal";
import dynamic from "next/dynamic";
import CircularProgress from "@mui/material/CircularProgress";

const HomeFAQ = dynamic(() => import("../home-faqs"), { 
  ssr: false, 
  loading: () => <CircularProgress /> 
});
const HomePricing = dynamic(() => import("../home-pricing"), { 
  ssr: false, 
  loading: () => <CircularProgress /> 
});

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
        <HomeFAQ />
      </Box>
    </MainLayout>
  );
}
