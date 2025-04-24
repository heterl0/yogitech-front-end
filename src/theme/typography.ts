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

// ----------------------------------------------------------------------

export const typography = {
  fontFamily: "var(--font-nunito-sans)",
  fontSecondaryFamily: "var(--font-lora)",
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontFamily: "var(--font-lora)",
    fontWeight: 700,
    lineHeight: 1.2,
    fontSize: pxToRem(38),
    letterSpacing: "0.01em",
    ...responsiveFontSizes({ sm: 48, md: 54, lg: 60 }),
  },
  h2: {
    fontFamily: "var(--font-lora)",
    fontWeight: 700,
    lineHeight: 1.3,
    fontSize: pxToRem(30),
    letterSpacing: "0.01em",
    ...responsiveFontSizes({ sm: 36, md: 40, lg: 44 }),
  },
  h3: {
    fontFamily: "var(--font-lora)",
    fontWeight: 600,
    lineHeight: 1.4,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 28, lg: 30 }),
  },
  h4: {
    fontFamily: "var(--font-lora)",
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 22, lg: 24 }),
  },
  h5: {
    fontFamily: "var(--font-lora)",
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 18, md: 19, lg: 20 }),
  },
  h6: {
    fontFamily: "var(--font-lora)",
    fontWeight: 600,
    lineHeight: 1.6,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 17, md: 17, lg: 18 }),
  },
  subtitle1: {
    fontFamily: "var(--font-nunito-sans)",
    fontWeight: 500,
    lineHeight: 1.6,
    fontSize: pxToRem(16),
    letterSpacing: "0.01em",
  },
  subtitle2: {
    fontFamily: "var(--font-nunito-sans)",
    fontWeight: 500,
    lineHeight: 1.6,
    fontSize: pxToRem(14),
    letterSpacing: "0.01em",
  },
  body1: {
    fontFamily: "var(--font-nunito-sans)",
    lineHeight: 1.7,
    fontSize: pxToRem(16),
    letterSpacing: "0.01em",
  },
  body2: {
    fontFamily: "var(--font-nunito-sans)",
    lineHeight: 1.7,
    fontSize: pxToRem(14),
    letterSpacing: "0.01em",
  },
  caption: {
    fontFamily: "var(--font-nunito-sans)",
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    fontStyle: "italic",
  },
  overline: {
    fontFamily: "var(--font-lora)",
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  button: {
    fontFamily: "var(--font-nunito-sans)",
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
    textTransform: "capitalize",
    letterSpacing: "0.02em",
  },
} as const;
