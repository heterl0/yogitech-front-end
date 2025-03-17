import Image from "next/image";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { alpha, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";
import { useResponsive } from "@/hooks/use-responsive";
import { fDate } from "@/utils/format-time";
import { fShortenNumber } from "@/utils/format-number";
import Iconify from "@/components/iconify";
import TextMaxLine from "@/components/text-max-line";
import { IPost } from "@/types/blog";
import { useLocales } from "@/locales";

// ----------------------------------------------------------------------

const StyledCardMedia = styled("div")(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  "& img": {
    transition: "transform 0.3s ease, filter 0.3s ease",
  },
  "&:hover img": {
    transform: "scale(1.05)",
    filter: "brightness(1.1)",
  },
}));

const StyledOverlay = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: "absolute",
  backgroundColor: "transparent",
  backgroundImage: `linear-gradient(to top, ${alpha(theme.palette.grey[900], 0.8)} 0%, ${alpha(theme.palette.grey[900], 0)} 60%)`,
}));

const StyledInfo = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9,
  position: "absolute",
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 40,
  height: 40,
  position: "absolute",
  left: theme.spacing(3),
  top: theme.spacing(3),
  border: `2px solid ${theme.palette.common.white}`,
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    width: 36,
    height: 36,
    left: theme.spacing(2),
    top: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  post: IPost;
  index?: number;
};

export default function PostItem({ post, index = 0 }: Props) {
  const mdUp = useResponsive("up", "md");
  const smUp = useResponsive("up", "sm");
  const { currentLang } = useLocales();

  const {
    owner,
    title,
    image_url,
    created_at,
    slug,
    excerpt,
    view_count,
    reading_time,
  } = post;

  // const vote = useMemo(() => {
  //   const result = { down: 0, up: 0 };
  //   votes.forEach((item) => {
  //     item.vote_value === 1
  //       ? (result.up = result.up + 1)
  //       : (result.down = result.down + 1);
  //   });
  //   return result;
  // }, [votes]);

  const isFeaturePost = index === 0;
  const isLatestPost = index === 1 || index === 2;
  const isDesktopFeature = mdUp && (isFeaturePost || isLatestPost);

  const linkTo = paths.blog.detail(slug);
  const authorName =
    owner.profile?.first_name && owner.profile?.last_name
      ? `${owner.profile.first_name} ${owner.profile.last_name}`
      : owner.username;

  const cardHeight =
    isFeaturePost && mdUp ? 480 : isLatestPost && mdUp ? 480 : "auto";

  if (isDesktopFeature) {
    return (
      <Card
        sx={{
          height: cardHeight,
          position: "relative",
          "&:hover": {
            boxShadow: (theme) => theme.shadows[8],
          },
          transition: "box-shadow 0.3s ease",
        }}
      >
        <Link
          component={RouterLink}
          href={linkTo}
          color="inherit"
          underline="none"
        >
          <StyledCardMedia sx={{ height: "100%" }}>
            <Image
              alt={title}
              src={image_url}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
              style={{
                objectFit: "cover",
              }}
              priority={index < 3}
            />
            <StyledOverlay />
          </StyledCardMedia>
        </Link>

        <StyledAvatar
          alt={authorName}
          src={owner.profile?.avatar_url || "/logo/logo_signle_2.svg"}
        />

        <StyledInfo>
          <Stack spacing={1}>
            <Typography variant="caption" sx={{ opacity: 0.72 }}>
              {fDate(created_at, currentLang.adapterLocale)}
            </Typography>

            <Link
              component={RouterLink}
              href={linkTo}
              color="inherit"
              underline="none"
            >
              <TextMaxLine
                variant={isFeaturePost ? "h4" : "h5"}
                line={2}
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                  textShadow: "0 1px 2px rgba(0,0,0,0.24)",
                }}
              >
                {title}
              </TextMaxLine>
            </Link>

            {isFeaturePost && excerpt && (
              <TextMaxLine
                variant="body2"
                className="!line-clamp-2"
                sx={{ opacity: 0.8, display: { xs: "none", sm: "block" } }}
              >
                {excerpt}
              </TextMaxLine>
            )}

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1.5}
              sx={{ pt: 1 }}
            >
              <Typography variant="caption" sx={{ opacity: 0.72 }}>
                By {authorName}
              </Typography>

              <Stack direction="row" spacing={1.5}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Iconify icon="solar:eye-bold" width={16} />
                  {fShortenNumber(view_count)}
                </Stack>

                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Iconify icon="solar:clock-circle-bold" width={16} />
                  {reading_time} min
                </Stack>

                {/* <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Iconify icon="solar:like-bold" width={16} />
                  {fShortenNumber(vote.up)}
                </Stack> */}
              </Stack>
            </Stack>
          </Stack>
        </StyledInfo>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Link
        component={RouterLink}
        href={linkTo}
        color="inherit"
        underline="none"
      >
        <StyledCardMedia sx={{ pt: "56.25%", position: "relative" }}>
          <Image
            alt={title}
            src={image_url}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
            style={{
              objectFit: "cover",
            }}
            priority={index < 6}
          />

          <StyledAvatar
            alt={authorName}
            src={owner.profile?.avatar_url || "/logo/logo_signle_2.svg"}
          />
        </StyledCardMedia>
      </Link>

      <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Stack spacing={smUp ? 2 : 1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Chip
              label={fDate(created_at, currentLang.adapterLocale)}
              size="small"
              sx={{
                height: 22,
                fontSize: "0.75rem",
                fontWeight: "medium",
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                color: "primary.main",
                ":hover": { bgcolor: "primary.light" },
              }}
            />

            <Stack direction="row" spacing={1}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Iconify
                  icon="solar:eye-bold"
                  width={16}
                  sx={{ color: "info.main" }}
                />
                {fShortenNumber(view_count)}
              </Stack>

              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Iconify
                  icon="solar:clock-circle-bold"
                  width={16}
                  sx={{ color: "warning.main" }}
                />
                {reading_time} min
              </Stack>

              {/* <Stack direction="row" alignItems="center" spacing={0.5}>
                <Iconify
                  icon="solar:like-bold"
                  width={16}
                  sx={{ color: "success.main" }}
                />
                {fShortenNumber(vote.up)}
              </Stack> */}

              {/* <Stack direction="row" alignItems="center" spacing={0.5}>
                <Iconify
                  icon="solar:dislike-bold"
                  width={16}
                  sx={{ color: "error.main" }}
                />
                {fShortenNumber(vote.down)}
              </Stack> */}
            </Stack>
          </Stack>

          <Link
            component={RouterLink}
            href={linkTo}
            color="inherit"
            underline="hover"
          >
            <TextMaxLine variant="subtitle1" line={2} persistent>
              {title}
            </TextMaxLine>
          </Link>

          {excerpt && (
            <TextMaxLine
              variant="body2"
              line={2}
              sx={{ color: "text.secondary" }}
            >
              {excerpt}
            </TextMaxLine>
          )}

          <Stack
            direction="row"
            alignItems="center"
            spacing={0.75}
            sx={{ typography: "body2", color: "text.disabled" }}
          >
            <Iconify icon="solar:user-circle-bold" width={16} />
            {authorName}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
