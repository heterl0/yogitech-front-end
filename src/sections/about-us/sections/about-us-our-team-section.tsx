"use client";

import Carousel, {
  CarouselArrows,
  CarouselDots,
  useCarousel,
} from "@/components/carousel";
import Iconify from "@/components/iconify";
import { useTranslate } from "@/locales";
import { IconButton } from "@mui/material";
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

  const carousel = useCarousel({
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,

    ...CarouselDots({
      sx: {
        top: 16,
        left: 16,
        position: "absolute",
        color: "primary.light",
      },
    }),
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
    <div className="bg-white-main">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-20 md:py-24 lg:gap-20 lg:py-32">
        <div className="flex flex-col items-center gap-6">
          <Typography variant="overline">Our Team</Typography>
          <Typography variant="h2">Our Team</Typography>
          <Typography variant="body1">
            Zenaiyoga will provide you support if you have any problems, our
            support team will reply within a day and we also have detailed
            documentation.
          </Typography>
        </div>
        <div className="">
          <Carousel
            ref={carousel.carouselRef}
            {...carousel.carouselSettings}
            className=""
          >
            {MEMBERS.map((member, index) => (
              <CarouselItem key={index} item={member} />
            ))}
          </Carousel>

          <CarouselArrows
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
            sx={{
              top: 8,
              right: 8,
              position: "absolute",
              color: "common.white",
            }}
          />
        </div>
      </div>
    </div>
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
    <Image
      alt={name}
      src={image}
      width={254}
      height={254}
      className="aspect-square w-full rounded-md object-cover"
    />
  );

  return (
    <div className="flex flex-col items-center rounded-2xl px-2 shadow">
      <div className="flex h-24 flex-col items-center justify-center gap-1">
        <Typography variant="subtitle1" className="text-wrap">
          {name}
        </Typography>
        <Typography variant="body2" className="text-wrap">
          {position}
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-2">{renderImg}</div>
      <div className="flex h-16 flex-row items-center justify-center gap-2">
        <IconButton className="!size-9" href={socials.linkedin}>
          <Iconify icon="mdi:linkedin" />
        </IconButton>
        <IconButton className="!size-9" href={socials.facebook}>
          <Iconify icon="mdi:facebook" />
        </IconButton>
        <IconButton className="!size-9" href={socials.github}>
          <Iconify icon="mdi:github" />
        </IconButton>
      </div>
    </div>
  );
}
