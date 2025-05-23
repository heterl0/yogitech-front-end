/* eslint-disable react/display-name */
import { forwardRef } from "react";

import Link from "@mui/material/Link";
// import { useTheme } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

import { RouterLink } from "@/routes/components";

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    // const theme = useTheme();

    // const PRIMARY_LIGHT = theme.palette.primary.light;

    // const PRIMARY_MAIN = theme.palette.primary.main;

    // const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: "inline-flex",
          ...sx,
        }}
        {...other}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M56 231C56 120.543 145.543 31 256 31C269.807 31 281 42.1929 281 56C281 69.8071 269.807 81 256 81C173.157 81 106 148.157 106 231C106 313.842 173.157 381 256 381C330.325 381 392.024 326.943 403.926 256H393.5C379.693 256 368.5 244.807 368.5 231C368.5 217.193 379.693 206 393.5 206H431C444.807 206 456 217.193 456 231C456 332.99 379.658 417.15 281 429.452V449.75C281 463.557 269.807 474.75 256 474.75C242.193 474.75 231 463.557 231 449.75V429.452C132.342 417.15 56 332.99 56 231Z"
            fill="url(#paint0_linear_1154_24549)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M256 318.5C304.325 318.5 343.5 279.325 343.5 231C343.5 182.675 304.325 143.5 256 143.5C207.675 143.5 168.5 182.675 168.5 231C168.5 279.325 207.675 318.5 256 318.5ZM256 268.5C276.711 268.5 293.5 251.711 293.5 231C293.5 210.289 276.711 193.5 256 193.5C235.289 193.5 218.5 210.289 218.5 231C218.5 251.711 235.289 268.5 256 268.5Z"
            fill="url(#paint1_linear_1154_24549)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1154_24549"
              x1="56"
              y1="31"
              x2="553.869"
              y2="230.459"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3BE2B0" />
              <stop offset="0.5" stopColor="#4095D0" />
              <stop offset="1" stopColor="#5986CC" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1154_24549"
              x1="56"
              y1="31"
              x2="553.869"
              y2="230.459"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3BE2B0" />
              <stop offset="0.5" stopColor="#4095D0" />
              <stop offset="1" stopColor="#5986CC" />
            </linearGradient>
          </defs>
        </svg>
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link
        component={RouterLink}
        href="/"
        sx={{ display: "contents" }}
        aria-label="YogiTech Logo"
      >
        {logo}
      </Link>
    );
  }
);

export default Logo;
