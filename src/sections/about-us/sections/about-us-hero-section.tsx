"use client";

import { memo } from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { m } from "motion/react";
import { useTranslate } from "@/locales";

const AboutUsHeroSection = () => {
  const { t } = useTranslate();
  return (
    <div className="bg-white-main relative min-h-[var(--full-height-without-header-mobile)] w-full lg:min-h-[var(--full-height-without-header-desktop)]">
      <Image
        src="/assets/about-us/background.png"
        alt="Hero Image"
        width={2560}
        height={1440}
        className="absolute inset-0 z-0 h-full object-cover"
        priority
      />
      <div className="from-black-main via-black-main/90 to-black-main/10 absolute inset-0 z-10 bg-gradient-to-tr via-50%" />
      <div className="from-black-main via-black-main/10 to-black-main/30 absolute inset-0 z-10 bg-gradient-to-br via-50%" />

      <div className="relative z-20 mx-auto flex min-h-[var(--full-height-without-header-mobile)] max-w-7xl flex-col justify-end gap-4 px-4 py-24 lg:min-h-[var(--full-height-without-header-desktop)]">
        <div className="flex max-w-md flex-col gap-4">
          <Typography
            component={m.h1}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            variant="h1"
            className="text-white-main text-4xl font-bold"
          >
            {t("aboutUs.about")}
            <span className="text-primary-main"> {t("aboutUs.us")}</span>
          </Typography>
          <Typography
            component={m.p}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            variant="subtitle1"
            className="text-white-main text-2xl! font-bold"
          >
            {t("aboutUs.description")}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default memo(AboutUsHeroSection);
