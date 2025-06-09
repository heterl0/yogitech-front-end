"use client";

import { MotionViewport, varFade } from "@/components/animate";
import Carousel, { CarouselArrows, useCarousel } from "@/components/carousel";
import Iconify from "@/components/iconify";
import { useTranslate } from "@/locales";
import { m } from "motion/react";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Image from "next/image";

type Member = {
  name: string;
  image: string;
  position: string;
  description: string;
  socials: {
    linkedin: string;
    facebook: string;
    github: string;
  };
};

const AboutUsOurTeamSection = () => {
  const { t } = useTranslate();
  const isMobile = useMediaQuery("(max-width: 766.9px)");
  const isTablet = useMediaQuery("(max-width: 1023.9px)");
  const carousel = useCarousel({
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 4,
    slidesToScroll: 1,
  });

  const MEMBERS = [
    {
      name: t("aboutUs.members.hieu.name"),
      image: "https://storage.zenaiyoga.com/images/member/hieu-1.png",
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
      image: "https://storage.zenaiyoga.com/images/member/tran-1.png",
      position: t("aboutUs.members.tran.position"),
      description: t("aboutUs.members.tran.description"),
      socials: {
        linkedin: "#",
        facebook: "https://www.facebook.com/RiTaka157",
        github: "https://github.com/ritaka157",
      },
    },
    {
      name: t("aboutUs.members.duy.name"),
      image: "https://storage.zenaiyoga.com/images/member/duy-1.png",
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
      image: "https://storage.zenaiyoga.com/images/member/kiet-1.png",
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
      image: "https://storage.zenaiyoga.com/images/member/loc-1.png",
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
    <MotionViewport className="bg-white-main">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-4 py-20 md:py-24 lg:gap-20 lg:py-32">
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <m.div variants={varFade().inUp}>
            <Typography variant="overline">
              {t("aboutUs.ourTeam.title")}
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">{t("aboutUs.ourTeam.title")}</Typography>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Typography variant="body1">
              {t("aboutUs.ourTeam.description")}
            </Typography>
          </m.div>
        </div>
        <m.div variants={varFade().inUp} className="relative w-full">
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {MEMBERS.map((member, index) => (
              <CarouselItem key={index} item={member} />
            ))}
          </Carousel>

          <CarouselArrows
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
            sx={{
              position: "absolute",
              width: "100%",
              height: "auto",
              top: "40%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 16px",
              "& .MuiIconButton-root": {
                color: "common.white",
                backgroundColor: "var(--color-grey-900)",
                "&:hover": {
                  color: "common.white",
                  backgroundColor: "var(--color-grey-600)",
                },
                transition: "all 0.3s ease",
              },
            }}
          />
        </m.div>
      </div>
    </MotionViewport>
  );
};

export default AboutUsOurTeamSection;

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: Member;
};

function CarouselItem({ item }: CarouselItemProps) {
  const { image, name, position, socials } = item;

  const renderImg = (
    <div className="relative w-full overflow-hidden rounded-xl bg-gray-50">
      <Image
        alt={name}
        src={image}
        width={272}
        height={272}
        quality={25}
        className="absolute inset-0 z-0 aspect-square w-full -translate-x-3 translate-y-3 rounded-md object-cover blur-sm filter-(--black-filter) will-change-auto"
      />
      <Image
        alt={name}
        src={image}
        width={272}
        height={272}
        className="relative z-20 aspect-square w-full rounded-md object-cover"
        sizes="(max-width: 766.9px) 100vw, (max-width: 1023.9px) 50vw, 25vw"
      />
    </div>
  );

  return (
    <div className="group mx-3 my-1 flex flex-col items-center rounded-2xl px-2 shadow">
      <div className="flex h-24 flex-col items-center justify-center gap-1">
        <Typography variant="subtitle1" className="text-wrap">
          {name}
        </Typography>
        <Typography variant="body2" className="text-center text-wrap">
          {position}
        </Typography>
      </div>
      <div className="flex w-full flex-col items-center gap-2">{renderImg}</div>

      <div className="flex h-16 flex-row items-center justify-center gap-2">
        <IconButton className="!size-9 !text-blue-500" href={socials.linkedin}>
          <Iconify icon="mdi:linkedin" />
        </IconButton>
        <IconButton className="!size-9 !text-blue-500" href={socials.facebook}>
          <Iconify icon="mdi:facebook" />
        </IconButton>
        <IconButton className="!size-9 !text-gray-500" href={socials.github}>
          <Iconify icon="mdi:github" />
        </IconButton>
      </div>
    </div>
  );
}
