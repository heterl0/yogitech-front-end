"use client";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { memo } from "react";

const AboutUsOverviewSection = () => {
  return (
    <div className="bg-white-main">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-20 md:grid-cols-2 md:py-24 lg:gap-20 lg:py-32">
        <div className="hidden min-h-64 grid-cols-2 gap-6 md:grid lg:min-h-96">
          <div className="flex w-full flex-row items-center overflow-hidden rounded-3xl">
            <Image
              src="/assets/about-us/overview-1.png"
              alt="About Us Overview 1"
              width={296}
              height={296}
              className="aspect-square w-full rounded-3xl object-cover"
            />
          </div>
          <div className="flex h-full w-full flex-row items-center overflow-hidden">
            <Image
              src="/assets/about-us/overview-2.png"
              alt="About Us Overview 2"
              width={296}
              height={390}
              className="aspect-square h-full w-full rounded-3xl object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-10 md:items-start">
          <Typography variant="h2">Overview</Typography>
          <Typography variant="body1" className="text-center md:text-left">
            Zenaiyoga is an AI-powered yoga platform that gives real-time
            feedback to help you practice safely and effectively.
          </Typography>
          <div className="flex flex-row gap-6 lg:gap-10">
            <Button
              variant="contained"
              size="large"
              className="!min-w-40 md:!w-auto"
            >
              More info
            </Button>
            <Button
              variant="outlined"
              size="large"
              className="!min-w-40 md:!w-auto"
            >
              Get the app
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AboutUsOverviewSection);
