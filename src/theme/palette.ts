import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

export type ColorSchema =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// SETUP COLORS

export const grey = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

export const primary = {
  darker: "#0c2b63",
  dark: "#205795",
  main: "#4095d0",
  light: "#8cd3f0",
  lighter: "#d9f6fc",
  contrastText: "#FFFFFF",
};

export const secondary = {
  lighter: "#e7e8fb",
  light: "#b3b4ec",
  main: "#7374c0",
  dark: "#393a8a",
  darker: "#16165c",
  contrastText: "#FFFFFF",
};

export const info = {
  lighter: "#d8fef9",
  light: "#8af7f9",
  main: "#3dcfed",
  dark: "#1e7daa",
  darker: "#0b4171",
  contrastText: "#FFFFFF",
};

export const success = {
  lighter: "#eafbd5",
  light: "#acec7e",
  main: "#56c12c",
  dark: "#278a16",
  darker: "#095c08",
  contrastText: "#ffffff",
};

export const warning = {
  lighter: "#fef4d3",
  light: "#fed37c",
  main: "#fca325",
  dark: "#b56412",
  darker: "#783607",
  contrastText: grey[800],
};

export const error = {
  lighter: "#ffe7d8",
  light: "#ffa68b",
  main: "#ff4c3f",
  dark: "#b71f2e",
  darker: "#7a0c29",
  contrastText: "#FFFFFF",
};

export const common = {
  black: "#000000",
  white: "#FFFFFF",
};

export const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.16),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[500], 0.2),
  action,
};

// ----------------------------------------------------------------------

export function palette(mode: "light" | "dark") {
  const light = {
    ...base,
    mode: "light",
    text: {
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[500],
    },
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
      neutral: grey[200],
    },
    action: {
      ...base.action,
      active: grey[600],
    },
  };

  const dark = {
    ...base,
    mode: "dark",
    text: {
      primary: "#FFFFFF",
      secondary: grey[500],
      disabled: grey[600],
    },
    background: {
      paper: grey[800],
      default: grey[900],
      neutral: alpha(grey[500], 0.12),
    },
    action: {
      ...base.action,
      active: grey[500],
    },
  };

  return mode === "light" ? light : dark;
}
