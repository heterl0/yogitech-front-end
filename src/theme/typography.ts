import { Lora, Nunito_Sans } from "next/font/google";

// ----------------------------------------------------------------------

export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({
  sm,
  md,
  lg,
}: {
  sm: number;
  md: number;
  lg: number;
}) {
  return {
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties["fontFamily"];
    fontWeightSemiBold: React.CSSProperties["fontWeight"];
  }
}

export const primaryFont = Nunito_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const secondaryFont = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

// ----------------------------------------------------------------------

export const typography = {
  fontFamily: primaryFont.style.fontFamily,
  fontSecondaryFamily: secondaryFont.style.fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontFamily: secondaryFont.style.fontFamily,
    fontWeight: 700,
    lineHeight: 1.2,
    fontSize: pxToRem(38),
    letterSpacing: "0.01em",
    ...responsiveFontSizes({ sm: 48, md: 54, lg: 60 }),
  },
  h2: {
    fontFamily: secondaryFont.style.fontFamily,
    fontWeight: 700,
    lineHeight: 1.3,
    fontSize: pxToRem(30),
    letterSpacing: "0.01em",
    ...responsiveFontSizes({ sm: 36, md: 40, lg: 44 }),
  },
  h3: {
    fontFamily: secondaryFont.style.fontFamily,
    fontWeight: 600,
    lineHeight: 1.4,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 28, lg: 30 }),
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 22, lg: 24 }),
  },
  h5: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 18, md: 19, lg: 20 }),
  },
  h6: {
    fontWeight: 600,
    lineHeight: 1.6,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 17, md: 17, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 500,
    lineHeight: 1.6,
    fontSize: pxToRem(16),
    letterSpacing: "0.01em",
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 1.6,
    fontSize: pxToRem(14),
    letterSpacing: "0.01em",
  },
  body1: {
    lineHeight: 1.7,
    fontSize: pxToRem(16),
    letterSpacing: "0.01em",
  },
  body2: {
    lineHeight: 1.7,
    fontSize: pxToRem(14),
    letterSpacing: "0.01em",
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    fontStyle: "italic",
  },
  overline: {
    fontFamily: secondaryFont.style.fontFamily,
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  button: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
    textTransform: "capitalize",
    letterSpacing: "0.02em",
  },
} as const;
