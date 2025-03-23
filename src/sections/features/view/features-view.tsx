/* eslint-disable react/no-unescaped-entities */
"use client";

import { m, useScroll } from "framer-motion";
import { Typography, Box, Grid, IconButton, Button } from "@mui/material";
import Image from "next/image";
import { memo } from "react";
import MainLayout from "@/layouts/main";
import ScrollProgress from "@/components/scroll-progress";
import LayoutWrapper from "@/components/wapper/layout-wrapper";
import Iconify from "@/components/iconify";
import { useTranslate } from "@/locales";
import Link from "next/link";

function FeaturesView() {
  const { t } = useTranslate();
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };
  const { scrollYProgress } = useScroll();

  const MEMBERS = [
    {
      name: t("aboutUs.members.hieu.name"),
      image: "/member/hieu-1.png",
      position: t("aboutUs.members.hieu.position"),
      description: t("aboutUs.members.hieu.description"),
      socials: {
        linkedin: "https://www.linkedin.com/in/heterl0/",
        facebook: "https://www.facebook.com/heterl0",
        github: "https://www.github.com/heterl0",
      },
    },
    {
      name: t("aboutUs.members.tran.name"),
      image: "/member/tran-1.png",
      position: t("aboutUs.members.tran.position"),
      description: t("aboutUs.members.tran.description"),
      socials: {
        linkedin: "#",
        facebook: "https://www.facebook.com/RiTaka157",
        github: "https://github.com/TranNHCE161052",
      },
    },
    {
      name: t("aboutUs.members.duy.name"),
      image: "/member/duy-1.png",
      position: t("aboutUs.members.duy.position"),
      description: t("aboutUs.members.duy.description"),
      socials: {
        linkedin: "#",
        facebook: "https://www.facebook.com/ntqduy1004",
        github: "https://github.com/duy100402",
      },
    },
    {
      name: t("aboutUs.members.kiet.name"),
      image: "/member/kiet-1.png",
      position: t("aboutUs.members.kiet.position"),
      description: t("aboutUs.members.kiet.description"),
      socials: {
        linkedin: "https://www.linkedin.com/in/ki%E1%BB%87t-l%C3%AA-5a5720192/",
        facebook: "https://www.facebook.com/profile.php?id=100007748776947",
        github: "#",
      },
    },
    {
      name: t("aboutUs.members.loc.name"),
      image: "/member/loc-1.png",
      position: t("aboutUs.members.loc.position"),
      description: t("aboutUs.members.loc.description"),
      socials: {
        linkedin: "#",
        facebook: "https://www.facebook.com/colnav.zone99",
        github: "#",
      },
    },
  ];

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      {/* <div className="relative min-h-screen bg-linear-to-b from-[#09141C] via-[#09141C] via-80% to-purple-900 text-white"> */}
      <div className="relative min-h-screen bg-[#09141C] bg-linear-to-b pb-8 text-white">
        {/* Gradient Orbs */}
        <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
          <div className="animate-blob absolute top-0 -left-4 h-72 w-72 rounded-full bg-blue-500 opacity-20 mix-blend-multiply blur-xl filter"></div>
          <div className="animation-delay-2000 animate-blob absolute top-0 -right-4 h-72 w-72 rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-xl filter"></div>
          <div className="animation-delay-4000 animate-blob absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-xl filter"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-0">
          {/* Hero Section */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[40vh] overflow-visible md:h-[85vh]"
          >
            <Image
              src="/banner.png"
              alt="YogiTech App Interface"
              width={1920}
              height={1080}
              className="w-full bg-center lg:translate-y-[-20vh]"
              priority
            />
          </m.div>

          {/* About Section */}
          <LayoutWrapper>
            <m.div {...fadeIn} className="mb-8 max-w-2xl text-left md:mb-20">
              <div className="text-black-contrast-text rounded-2xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md">
                <Typography variant="h1" className="mb-6 text-4xl font-bold">
                  {t("aboutUs.title")}
                </Typography>
                <Box className="mb-8 flex items-center justify-start gap-8">
                  <div className="rounded-xl bg-white/5 p-4 backdrop-blur-xs">
                    <Image
                      src="/logo/Yogi.png"
                      alt="YogiTech Logo"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="text-left">
                    <Typography variant="h2">
                      {t("aboutUs.whatIsYogiTech")}
                    </Typography>
                    <Typography variant="subtitle1" className="text-2xl!">
                      {t("aboutUs.appType")}
                    </Typography>
                    <Typography variant="subtitle1" className="text-2xl!">
                      {t("aboutUs.year")}
                    </Typography>
                  </div>
                </Box>
                <Typography
                  variant="body1"
                  className="mx-auto max-w-2xl text-2xl! text-gray-300!"
                >
                  {t("aboutUs.description")}
                </Typography>
              </div>
            </m.div>

            {/* Overview Section */}
            <m.div {...fadeIn} className="mb-8 md:mb-20">
              <div className="rounded-2xl border border-black/20 bg-black/10 p-8 shadow-xl backdrop-blur-md">
                <Typography
                  variant="h2"
                  className="text-black-contrast-text mb-8 text-center font-bold"
                >
                  {t("aboutUs.overviewTitle")}
                </Typography>
                <Grid container spacing={6} alignItems="center">
                  <Grid item xs={12} md={6} className="flex flex-col! gap-8">
                    <Typography
                      variant="body1"
                      className="text-2xl! text-gray-300!"
                    >
                      {t("aboutUs.overviewDescription")}
                    </Typography>
                    <div className="flex gap-4">
                      <Link href="/features/">
                        <Button
                          variant="contained"
                          color="primary"
                          className="mt-8"
                        >
                          {t("aboutUs.overviewButton")}
                        </Button>
                      </Link>
                      <Link href="/download/">
                        <Button
                          variant="outlined"
                          color="primary"
                          className="mt-8"
                        >
                          {t("download.getApp")}
                        </Button>
                      </Link>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <m.div
                      whileHover={{ scale: 1.02 }}
                      className="text- taw text-wh overflow-hidden rounded-lg bg-white/5 p-2 backdrop-blur-xs"
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
              <div className="text-black-contrast-text flex flex-col gap-6 rounded-2xl bg-white/10 p-8 shadow-xl backdrop-blur-md">
                <Typography
                  variant="h2"
                  className="mb-12! text-center font-bold"
                >
                  {t("aboutUs.teamTitle")}
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                  {MEMBERS.map((member) => (
                    <Grid item xs={12} md={6} lg={4} key={member.name}>
                      <m.div
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="cursor-pointer rounded-xl border border-black/10 bg-black/5 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/20"
                      >
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={2}
                        >
                          <Box sx={{ width: "100%" }}>
                            <div className="flex w-full items-center justify-between gap-4 md:flex-row">
                              <div className="flex flex-col justify-center">
                                <Typography
                                  variant="h5"
                                  component="h3"
                                  gutterBottom
                                >
                                  {member.name}
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  color="text.secondary"
                                  className="inline-block h-[48px]"
                                >
                                  {member.position}
                                </Typography>
                              </div>
                              <div className="flex-none rounded-xl border border-gray-300/20 p-1 backdrop-blur-xs">
                                <Image
                                  src={member.image}
                                  className="rounded-xl"
                                  alt={member.name}
                                  width={64}
                                  height={64}
                                />
                              </div>
                            </div>
                          </Box>
                          {/* <Avatar sx={{ width: 56, height: 56 }}>
                      <Icon icon={member.icon} width={24} height={24} />
                    </Avatar> */}
                        </Box>
                        <Typography
                          variant="body2"
                          paragraph
                          className="inline-block h-[44px]"
                        >
                          {member.description}
                        </Typography>
                        <Box mt={2}>
                          <IconButton
                            size="small"
                            color="primary"
                            href={member.socials.linkedin}
                          >
                            <Iconify icon="mdi:linkedin" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="primary"
                            href={member.socials.facebook}
                          >
                            <Iconify icon="mdi:facebook" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="primary"
                            href={member.socials.github}
                          >
                            <Iconify icon="mdi:github" />
                          </IconButton>
                        </Box>
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

export default memo(FeaturesView);
