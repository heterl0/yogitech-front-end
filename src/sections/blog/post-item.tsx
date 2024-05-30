import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { alpha, useTheme } from "@mui/material/styles";

// import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { useResponsive } from "@/hooks/use-responsive";

import { fDate } from "@/utils/format-time";
import { fShortenNumber } from "@/utils/format-number";

import { AvatarShape } from "@/assets/illustrations";

import Image from "@/components/image";
import Iconify from "@/components/iconify";
import TextMaxLine from "@/components/text-max-line";

import { IBlog } from "@/types/blog";
import { useMemo } from "react";

// ----------------------------------------------------------------------

type Props = {
  post: IBlog;
  index?: number;
};

export default function PostItem({ post, index }: Props) {
  const theme = useTheme();

  const mdUp = useResponsive("up", "md");

  const { owner, title, image_url, created_at, votes } = post;

  const vote: { down: number; up: number } = useMemo(() => {
    const vote: { down: number; up: number } = { down: 0, up: 0 };
    votes.forEach((item) => {
      item.vote_value === 1
        ? (vote.up = vote.up + 1)
        : (vote.down = vote.down + 1);
    });
    return vote;
  }, [votes]);

  const latestPost = index === 0 || index === 1 || index === 2;

  if (mdUp && latestPost) {
    return (
      <Card>
        <Avatar
          alt={owner}
          src={owner}
          sx={{
            top: 24,
            left: 24,
            zIndex: 9,
            position: "absolute",
          }}
        />

        <PostContent
          title={title}
          createdAt={created_at}
          vote={vote}
          index={index}
        />

        <Image
          alt={title}
          src={image_url}
          overlay={alpha(theme.palette.grey[900], 0.48)}
          sx={{
            width: 1,
            height: 360,
          }}
        />
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ position: "relative" }}>
        <AvatarShape
          sx={{
            left: 0,
            zIndex: 9,
            width: 88,
            height: 36,
            bottom: -16,
            position: "absolute",
          }}
        />

        <Avatar
          alt={owner}
          src={`https://api.dicebear.com/8.x/initials/svg?seed=${owner}`}
          sx={{
            left: 24,
            zIndex: 9,
            bottom: -24,
            position: "absolute",
          }}
        />

        <Image alt={title} src={image_url} ratio="4/3" />
      </Box>

      <PostContent title={title} vote={vote} createdAt={created_at} />
    </Card>
  );
}

// ----------------------------------------------------------------------

type PostContentProps = {
  title: string;
  index?: number;
  vote: {
    up: number;
    down: number;
  };
  createdAt: Date | string | number;
};

export function PostContent({
  title,
  createdAt,
  vote,
  index,
}: PostContentProps) {
  const mdUp = useResponsive("up", "md");

  // const linkTo = paths.post.details(title);

  const latestPostLarge = index === 0;

  const latestPostSmall = index === 1 || index === 2;

  return (
    <CardContent
      sx={{
        pt: 6,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: "absolute",
          color: "common.white",
        }),
      }}
    >
      <Typography
        variant="caption"
        component="div"
        sx={{
          mb: 1,
          color: "text.disabled",
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: "common.white",
          }),
        }}
      >
        {fDate(createdAt)}
      </Typography>

      <Link color="inherit" component={RouterLink} href={"#"}>
        <TextMaxLine
          variant={mdUp && latestPostLarge ? "h5" : "subtitle2"}
          line={2}
          persistent
        >
          {title}
        </TextMaxLine>
      </Link>

      <Stack
        spacing={1.5}
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          typography: "caption",
          color: "text.disabled",
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: "common.white",
          }),
        }}
      >
        <Stack direction="row" alignItems="center">
          <Iconify icon="solar:like-bold" width={16} sx={{ mr: 0.5 }} />
          {fShortenNumber(vote.up)}
        </Stack>

        <Stack direction="row" alignItems="center">
          <Iconify icon="solar:dislike-bold" width={16} sx={{ mr: 0.5 }} />
          {fShortenNumber(vote.down)}
        </Stack>
      </Stack>
    </CardContent>
  );
}
