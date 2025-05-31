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
    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          ...sx,
        }}
        {...other}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1024 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M512 170.667C434.411 170.667 359.137 197.101 298.584 245.613C238.031 294.125 195.812 361.82 178.887 437.54C161.961 513.261 171.339 592.489 205.473 662.166C239.608 731.843 296.462 787.812 366.667 820.848C436.872 853.883 516.237 862.015 591.683 843.902C667.128 825.789 734.151 782.513 781.706 721.206C829.261 659.898 854.51 584.218 853.291 506.639C852.072 429.059 824.459 354.209 775.002 294.426"
            stroke="url(#paint0_linear_2297_1913)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <circle
            cx="512"
            cy="512"
            r="113.778"
            fill="url(#paint1_linear_2297_1913)"
          />
          <circle
            cx="512"
            cy="512"
            r="145.704"
            stroke="url(#paint2_linear_2297_1913)"
            strokeWidth="12"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2297_1913"
              x1="170.667"
              y1="853.333"
              x2="536.632"
              y2="29.9106"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3BE2B0" />
              <stop offset="0.5" stopColor="#4095D0" />
              <stop offset="1" stopColor="#1C46F2" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_2297_1913"
              x1="398.222"
              y1="398.222"
              x2="672.696"
              y2="520.211"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3BE2B0" />
              <stop offset="0.5" stopColor="#4095D0" />
              <stop offset="1" stopColor="#1C46F2" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_2297_1913"
              x1="360.296"
              y1="360.296"
              x2="726.262"
              y2="522.948"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3BE2B0" />
              <stop offset="0.5" stopColor="#4095D0" />
              <stop offset="1" stopColor="#1C46F2" />
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
        aria-label="Zenaiyoga Logo"
      >
        {logo}
      </Link>
    );
  }
);

export default Logo;
