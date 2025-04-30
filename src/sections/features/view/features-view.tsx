/* eslint-disable react/no-unescaped-entities */
"use client";

import { useScroll } from "motion/react";
import { memo } from "react";
import MainLayout from "@/layouts/main";
import ScrollProgress from "@/components/scroll-progress";

function FeaturesView() {
  const { scrollYProgress } = useScroll();
  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />
    </MainLayout>
  );
}

export default memo(FeaturesView);
