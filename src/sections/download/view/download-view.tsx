"use client";

import { useScroll } from "framer-motion";

import MainLayout from "@/layouts/main";

import ScrollProgress from "@/components/scroll-progress";
import DownloadAdvertisement from "../download-advertisement";

export default function DownloadView() {
  const { scrollYProgress } = useScroll();

  return (
    <MainLayout isBlurFromStart={true}>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <div className="flex flex-col py-5 md:py-16">
        <DownloadAdvertisement />
      </div>
    </MainLayout>
  );
}
