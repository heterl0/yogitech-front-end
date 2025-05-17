"use client";

import { useScroll } from "motion/react";
import MainLayout from "@/layouts/main";
import ScrollProgress from "@/components/scroll-progress";
import HomeHero from "../home-hero";
import HomeMinimal from "../home-minimal";
import dynamic from "next/dynamic";
import CircularProgress from "@mui/material/CircularProgress";

const HomeFAQ = dynamic(() => import("../home-faqs"), {
  ssr: false,
  loading: () => <CircularProgress />,
});
const HomePricing = dynamic(() => import("../home-pricing"), {
  ssr: false,
  loading: () => <CircularProgress />,
});

export default function HomeView() {
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
