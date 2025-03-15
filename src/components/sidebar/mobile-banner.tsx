"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Iconify from "@/components/iconify";

export default function MobileBanner() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "background.paper",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        p: 2,
        zIndex: 999,
        display: { xs: "block", md: "none" },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton
          size="small"
          onClick={() => setIsOpen(false)}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Iconify icon="eva:close-fill" width={20} />
        </IconButton>

        <Box
          component="img"
          src="/logo/logo_signle_2.svg?height=60&width=60"
          alt="App Icon"
          sx={{ width: 60, height: 60, borderRadius: 1 }}
        />

        <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" noWrap>
            Download Our App
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }} noWrap>
            Get the best practice yoga on mobile
          </Typography>
        </Stack>

        <Button
          variant="contained"
          size="small"
          href="https://storage.yogitech.me/files/yogitech-beta-v1_0.1.apk"
          startIcon={<Iconify icon="eva:download-fill" />}
        >
          Get App
        </Button>
      </Stack>
    </Box>
  );
}
