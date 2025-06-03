"use client";

import { useScroll } from "motion/react";
import MainLayout from "@/layouts/main";
import ScrollProgress from "@/components/scroll-progress";
import HomeHero from "../home-hero";
import dynamic from "next/dynamic";
import { memo } from "react";

const HomeFAQ = dynamic(() => import("../home-faqs"), {
  loading: () => (
    <div className="bg-white-main flex h-screen w-screen items-center justify-center" />
  ),
  ssr: false,
});
const HomePricing = dynamic(() => import("../home-pricing"), {
  loading: () => (
    <div className="bg-white-main flex h-screen w-screen items-center justify-center" />
  ),
  ssr: false,
});

const HomeMinimal = dynamic(() => import("../home-minimal"), {
  loading: () => (
    <div className="bg-white-main flex h-screen w-screen items-center justify-center" />
  ),
  ssr: false,
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
