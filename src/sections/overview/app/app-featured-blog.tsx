import { m } from "motion/react";

import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card, { CardProps } from "@mui/material/Card";

import { varFade, MotionContainer } from "@/components/animate";
import Carousel, {
  useCarousel,
  CarouselDots,
  CarouselArrows,
} from "@/components/carousel";
import { IPost } from "@/types/blog";
import { useTranslation } from "react-i18next";
import Image from "next/image";

// ----------------------------------------------------------------------

// type ItemProps = {
//   id: string;
//   title: string;
//   coverUrl: string;
//   description: string;
// };

interface Props extends CardProps {
  list: IPost[];
}

export default function AppFeaturedBlog({ list, ...other }: Props) {
  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
    ...CarouselDots({
      sx: {
        top: 16,
        left: 16,
        position: "absolute",
        color: "primary.light",
      },
    }),
  });

  return (
    <Card {...other}>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {list.map((app, index) => (
          <CarouselItem
            key={app.id}
            item={app}
            active={index === carousel.currentIndex}
          />
        ))}
      </Carousel>

      <CarouselArrows
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        sx={{ top: 8, right: 8, position: "absolute", color: "common.white" }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: IPost;
  active?: boolean;
};

function CarouselItem({ item, active }: CarouselItemProps) {
  const { t } = useTranslation();
  const { image_url, title, description } = item;

  const renderImg = (
    <Image
      alt={title}
      src={image_url}
      width={600}
      height={400}
      className="aspect-video h-full object-cover"
    />
  );

  return (
    <MotionContainer action animate={active} sx={{ position: "relative" }}>
      <Stack
        spacing={1}
        sx={{
          p: 3,
          width: 1,
          bottom: 0,
          zIndex: 9,
          textAlign: "left",
          position: "absolute",
          color: "common.white",
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography variant="overline" sx={{ color: "primary.light" }}>
            {t("dashboard.newBlog")}
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Link color="inherit" underline="none">
            <Typography variant="h5" noWrap>
              {title}
            </Typography>
          </Link>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap>
            {description}
          </Typography>
        </m.div>
      </Stack>

      {renderImg}
    </MotionContainer>
  );
}
