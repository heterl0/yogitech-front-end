"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { paths } from "@/routes/paths";
import { useOffSetTop } from "@/hooks/use-off-set-top";
import { useResponsive } from "@/hooks/use-responsive";
import { bgBlur } from "@/theme/css";
import Logo from "@/components/logo";
import NavDesktop from "./nav/desktop";
import { HEADER } from "../config-layout";
import { navConfig } from "./config-navigation";
import { useTranslate } from "@/locales";
import LanguagePopover from "../common/language-popover";
import NavMobile from "./nav/mobile";
import Link from "next/link";
import { memo } from "react";
import { usePathname } from "next/navigation";

// ----------------------------------------------------------------------

type Props = {
  isBlurFromStart?: boolean;
};

function Header({ isBlurFromStart = false }: Props) {
  const theme = useTheme();
  const { t } = useTranslate();
  const mdUp = useResponsive("up", "md");
  const pathname = usePathname();
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);
  const isDark = pathname === paths.about;
  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(["height"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...((offsetTop || isBlurFromStart) && {
            ...bgBlur({
              color: isDark
                ? "rgba(0, 0, 0) !important"
                : theme.palette.background.default,
              opacity: isDark ? 0.4 : undefined,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
              xs: HEADER.H_MOBILE,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: "flex", alignItems: "center" }}>
          {/* <Badge
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top: 8,
                right: -16,
              },
            }}
            badgeContent={
              <Link
                href={paths.changelog}
                target="_blank"
                rel="noopener"
                underline="none"
                sx={{ ml: 1 }}
              >
                <Label
                  color="info"
                  sx={{ textTransform: "unset", height: 22, px: 0.5 }}
                >
                  v5.7.0
                </Label>
              </Link>
            }
          > */}
          <Logo />
          {/* </Badge> */}

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop data={navConfig()} />}
          <Stack
            alignItems="center"
            direction={{ xs: "row", md: "row-reverse" }}
            paddingX={"20px"}
          >
            <LanguagePopover />
          </Stack>
          <Stack
            alignItems="center"
            direction={{ xs: "row", md: "row-reverse" }}
          >
            <Link href={paths.download}>
              <Button variant="contained" color="primary">
                {t("header.download")}
              </Button>
            </Link>

            {!mdUp && <NavMobile data={navConfig()} />}
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default memo(Header);
