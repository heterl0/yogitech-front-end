"use client";

import { useScroll } from "motion/react";
import MainLayout from "@/layouts/main";
import ScrollProgress from "@/components/scroll-progress";
import HomeHero from "../home-hero";
import dynamic from "next/dynamic";
import CircularProgress from "@mui/material/CircularProgress";
import { memo } from "react";

const HomeFAQ = dynamic(() => import("../home-faqs"), {
  ssr: false,
  loading: () => <CircularProgress />,
});
const HomePricing = dynamic(() => import("../home-pricing"), {
  ssr: false,
  loading: () => <CircularProgress />,
});

const HomeMinimal = dynamic(() => import("../home-minimal"), {
  ssr: false,
  loading: () => (
    <div className="bg-white-main flex h-screen w-screen items-center justify-center" />
  ),
});

function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <HomeHero />
      <div className="bg-white-main relative overflow-hidden">
        <HomeMinimal />
        <HomePricing />
        <HomeFAQ />
      </div>
    </MainLayout>
  );
}

export default memo(HomeView);
