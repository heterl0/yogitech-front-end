"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Iconify from "@/components/iconify";

export default function CtaSidebar() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 300,
        position: { xs: "relative", lg: "sticky" },
        top: "72px",
        height: "fit-content",
        display: { xs: "none", md: "block" },
        borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
        p: 2,
      }}
    >
      <Stack spacing={3} sx={{ pb: 2 }}>
        <Typography variant="h6">Download Our App</Typography>

        <Box
          sx={{
            width: "100%",
            bgcolor: "background.neutral",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            // src="/logo/logo_signle_2.svg?height=200&width=260"
            src="/banner-2.png"
            alt="App Screenshot"
            sx={{ width: "100%", height: 200, objectFit: "cover" }}
          />

          <Stack spacing={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1">
              Get the best experience on our mobile app
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Access exclusive features, faster loading times, and offline
              capabilities.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                variant="contained"
                href="https://storage.yogitech.me/files/yogitech-beta-v1_0.1.apk"
                startIcon={<Iconify icon="ri:google-play-fill" />}
              >
                Google Play
              </Button>

              {/* <Button
                fullWidth
                variant="contained"
                startIcon={<Iconify icon="mdi:apple" />}
              >
                App Store
              </Button> */}
            </Stack>
          </Stack>
        </Box>

        <Stack spacing={2}>
          <Typography variant="subtitle2">Why download our app?</Typography>

          <Stack spacing={1}>
            {[
              {
                icon: "healthicons:exercise-yoga",
                text: "Practice Yoga with AI",
              },
              { icon: "fluent:flash-20-filled", text: "Faster loading times" },
              { icon: "tabler:yoga", text: "Many poses for free" },
              { icon: "solar:bookmark-bold", text: "Track your process" },
            ].map((item, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Iconify
                  icon={item.icon}
                  width={20}
                  color={theme.palette.primary.main}
                />
                <Typography variant="body2">{item.text}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
