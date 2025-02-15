/* eslint-disable react/no-unescaped-entities */
"use client";

import { m, useScroll } from "framer-motion";
import { Icon } from "@iconify/react";
import { Typography, Box, Grid } from "@mui/material";
import Image from "next/image";
import { memo } from "react";
import MainLayout from "@/layouts/main";
import ScrollProgress from "@/components/scroll-progress";
import LayoutWrapper from "@/components/wapper/layout-wrapper";

function AboutUsView() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };
  const { scrollYProgress } = useScroll();

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <div className="relative min-h-screen bg-linear-to-br from-blue-900 via-[#0A192F] to-purple-900 text-white">
        {/* Gradient Orbs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="animate-blob absolute top-0 -left-4 h-72 w-72 rounded-full bg-blue-500 opacity-20 mix-blend-multiply blur-xl filter"></div>
          <div className="animation-delay-2000 animate-blob absolute top-0 -right-4 h-72 w-72 rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-xl filter"></div>
          <div className="animation-delay-4000 animate-blob absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-xl filter"></div>
        </div>

        {/* Content Container */}
        <div className="relative">
          {/* Hero Section */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[60vh] overflow-hidden"
          >
            <Image
              src="/banner.png"
              alt="YogiTech App Interface"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs">
              <Typography
                variant="h1"
                className="text-5xl font-bold text-white/90 md:text-7xl"
              >
                YOGA MONITOR
              </Typography>
            </div>
          </m.div>

          {/* About Section */}
          <LayoutWrapper>
            <m.div {...fadeIn} className="mb-20 text-center">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md">
                <Typography variant="h2" className="mb-6 text-4xl font-bold">
                  ABOUT YOGITECH
                </Typography>
                <Box className="mb-8 flex items-center justify-center gap-8">
                  <div className="rounded-xl bg-white/5 p-4 backdrop-blur-xs">
                    <Icon icon="mdi:yoga" className="text-6xl text-blue-400" />
                  </div>
                  <div className="text-left">
                    <Typography variant="h6">Project: YogiTech</Typography>
                    <Typography variant="subtitle1">
                      Category: Mobile App
                    </Typography>
                    <Typography variant="subtitle1">Date: 2024</Typography>
                  </div>
                </Box>
                <Typography
                  variant="body1"
                  className="mx-auto max-w-2xl text-gray-200"
                >
                  We created an AI Yoga app that gives real-time feedback on
                  poses using your phone's camera. It supports English and
                  Vietnamese, helping users improve techniques and avoid
                  injuries.
                </Typography>
              </div>
            </m.div>

            {/* Overview Section */}
            <m.div {...fadeIn} className="mb-20">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md">
                <Typography
                  variant="h3"
                  className="mb-8 text-center text-3xl font-bold"
                >
                  Overview
                </Typography>
                <Grid container spacing={6} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" className="text-gray-200">
                      YogiTech is an AI-powered yoga platform that provides
                      real-time feedback to help users improve their poses
                      safely and effectively. Supporting both English and
                      Vietnamese, it offers a personalized and accessible yoga
                      experience for all levels.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <m.div
                      whileHover={{ scale: 1.02 }}
                      className="overflow-hidden rounded-lg bg-white/5 p-2 backdrop-blur-xs"
                    >
                      <Image
                        src="/banner.png?height=400&width=600"
                        alt="Yoga Practice"
                        width={600}
                        height={400}
                        className="w-full rounded-lg object-cover"
                      />
                    </m.div>
                  </Grid>
                </Grid>
              </div>
            </m.div>

            {/* Team Section */}
            <m.div {...fadeIn}>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md">
                <Typography
                  variant="h3"
                  className="mb-12 text-center text-3xl font-bold"
                >
                  Our Team
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                  {[1, 2, 3].map((member) => (
                    <Grid item xs={12} sm={6} md={4} key={member}>
                      <m.div
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/20"
                      >
                        <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-blue-400/30 to-purple-400/30 backdrop-blur-xs">
                          <Icon
                            icon="mdi:account-circle"
                            className="text-6xl text-white/80"
                          />
                        </div>
                        <Typography variant="h6" className="mb-2">
                          Team Member {member}
                        </Typography>
                        <Typography variant="body2" className="text-gray-300">
                          Position
                        </Typography>
                      </m.div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </m.div>
          </LayoutWrapper>
        </div>
      </div>
    </MainLayout>
  );
}

export default memo(AboutUsView);
