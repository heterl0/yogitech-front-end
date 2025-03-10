import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { alpha, useTheme } from "@mui/material/styles";

import { fDate } from "@/utils/format-time";

import { bgGradient } from "@/theme/css";

import { IPostHero } from "@/types/blog";
import { useLocales } from "@/locales";

// ----------------------------------------------------------------------

export default function PostDetailsHero({
  title,
  author,
  coverUrl,
  createdAt,
}: IPostHero) {
  const theme = useTheme();
  const { currentLang } = useLocales();
  return (
    <Box
      sx={{
        height: 480,
        overflow: "hidden",
        ...bgGradient({
          imgUrl: coverUrl,
          startColor: `${alpha(theme.palette.grey[900], 0.64)} 0%`,
          endColor: `${alpha(theme.palette.grey[900], 0.64)} 100%`,
        }),
      }}
    >
      <Container sx={{ height: 1, position: "relative" }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            zIndex: 9,
            color: "common.white",
            position: "absolute",
            maxWidth: 1200,
            pt: { xs: 2, md: 8 },
          }}
          className="line-clamp-[10]"
        >
          {title}
        </Typography>

        <Stack
          sx={{
            left: 0,
            width: 1,
            bottom: 0,
            position: "absolute",
          }}
        >
          {author && createdAt && (
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                px: { xs: 2, md: 3 },
                pb: { xs: 3, md: 8 },
              }}
            >
              <Avatar
                alt={author.username}
                src={author.profile?.avatar_url || ""}
                sx={{ width: 64, height: 64, mr: 2 }}
              />

              <ListItemText
                sx={{ color: "common.white" }}
                primary={
                  author.profile?.last_name && author.profile?.first_name
                    ? `${author.profile?.last_name} ${author.profile?.first_name}`
                    : author.username
                }
                secondary={fDate(createdAt, currentLang.adapterLocale)}
                primaryTypographyProps={{ typography: "subtitle1", mb: 0.5 }}
                secondaryTypographyProps={{
                  color: "inherit",
                  sx: { opacity: 0.64 },
                }}
              />
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
