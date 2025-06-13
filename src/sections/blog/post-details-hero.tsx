import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { alpha, useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import useMediaQuery from "@mui/material/useMediaQuery";

import { fDate } from "@/utils/format-time";
import { IPostHero } from "@/types/blog";
import { useLocales } from "@/locales";
import Image from "next/image";

// ----------------------------------------------------------------------

export default function PostDetailsHero({
  title,
  author,
  coverUrl,
  createdAt,
  category,
  readTime,
}: IPostHero & { category?: string; readTime?: string }) {
  const theme = useTheme();
  const { currentLang } = useLocales();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const authorName =
    author?.profile?.last_name && author?.profile?.first_name
      ? `${author.profile?.last_name} ${author.profile?.first_name}`
      : author?.username;

  return (
    <Box
      aria-label={title}
      sx={{
        position: "relative",
        height: { xs: "auto", sm: 480, md: 560, lg: 640 },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(to bottom, transparent 0%, ${alpha(theme.palette.grey[900], 0.85)} 100%)`,
          zIndex: 1,
        },
      }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-gray-900/85">
        <Image
          src={coverUrl}
          alt={title}
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
          priority
          quality={100}
          sizes="100vw"
        />
      </div>

      <Container
        sx={{
          height: 1,
          position: "relative",
          zIndex: 2,
          py: { xs: 8, sm: 0 },
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "flex-start", sm: "center" },
        }}
      >
        <Fade in timeout={1000}>
          <Box>
            {/* Category and read time */}
            {(category || readTime) && (
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mb: { xs: 2, md: 3 },
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {category && (
                  <Chip
                    label={category}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      color: "primary.light",
                      bgcolor: alpha(theme.palette.primary.main, 0.16),
                      fontWeight: "medium",
                    }}
                  />
                )}
                {readTime && (
                  <Chip
                    label={readTime}
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      color: "common.white",
                      bgcolor: alpha(theme.palette.common.white, 0.16),
                      fontWeight: "medium",
                    }}
                  />
                )}
              </Stack>
            )}

            {/* Title */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: "common.white",
                maxWidth: { xs: "100%", md: "80%", lg: "70%" },
                mb: { xs: 3, md: 5 },
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3rem",
                  lg: "3.5rem",
                },
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>

            {/* Author info */}
            {author && createdAt && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  mt: { xs: 2, md: "auto" },
                }}
              >
                <Avatar
                  alt={authorName}
                  src={author.profile?.avatar_url || ""}
                  sizes="64px"
                  sx={{
                    width: { xs: 48, md: 64 },
                    height: { xs: 48, md: 64 },
                    border: `2px solid ${theme.palette.common.white}`,
                    boxShadow: theme.shadows[2],
                  }}
                />

                <ListItemText
                  sx={{ color: "common.white" }}
                  primary={authorName}
                  secondary={
                    // <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {fDate(createdAt, currentLang.adapterLocale)}
                    </Typography>
                    // </Stack>
                  }
                  primaryTypographyProps={{
                    typography: "subtitle1",
                    fontWeight: "bold",
                    mb: 0.5,
                  }}
                  secondaryTypographyProps={{
                    color: "inherit",
                  }}
                />
              </Stack>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
