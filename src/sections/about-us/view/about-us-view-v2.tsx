import MainLayout from "@/layouts/main";
import { Typography } from "@mui/material";
import Image from "next/image";

const AboutUsViewV2 = () => {
  return (
    <MainLayout isDisableOffsetBlur>
      <div className="flex flex-col">
        {/* Hero Section */}
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
            <div className="flex max-w-sm flex-col gap-4">
              <Typography
                variant="h1"
                className="text-white-main text-4xl font-bold"
              >
                About
                <span className="text-primary-main"> Us</span>
              </Typography>
              <Typography
                variant="subtitle1"
                className="text-white-main text-2xl! font-bold"
              >
                We developed an AI Yoga app that provides real-time feedback on
                your poses, supporting both English and Vietnamese.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUsViewV2;
