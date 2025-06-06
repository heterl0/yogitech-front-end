"use client";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { memo } from "react";

const AboutUsOverviewSection = () => {
  return (
    <div className="bg-white-main">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 px-4 py-24 md:grid-cols-2 lg:py-32">
        <div className="grid min-h-96 grid-cols-2 gap-6">
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
        <div className="flex flex-col gap-10">
          <Typography variant="h2">Overview</Typography>
          <Typography variant="body1">
            Zenaiyoga is an AI-powered yoga platform that gives real-time
            feedback to help you practice safely and effectively.
          </Typography>
          <div className="flex flex-row gap-10">
            <Button variant="contained" size="large">
              More info
            </Button>
            <Button variant="outlined" size="large">
              Get the app
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AboutUsOverviewSection);
