import { alpha, styled } from "@mui/material/styles";

const StyledMarkdown = styled("div")(({ theme }) => {
  const lightMode = theme.palette.mode === "light";

  return {
    // Text with improved line heights and spacing
    h1: {
      ...theme.typography.h1,
      marginTop: 48,
      marginBottom: 16,
      lineHeight: 1.2,
    },
    h2: {
      ...theme.typography.h2,
      marginTop: 40,
      marginBottom: 16,
      lineHeight: 1.25,
    },
    h3: {
      ...theme.typography.h3,
      marginTop: 32,
      marginBottom: 12,
      lineHeight: 1.3,
    },
    h4: {
      ...theme.typography.h4,
      marginTop: 24,
      marginBottom: 12,
      lineHeight: 1.35,
    },
    h5: {
      ...theme.typography.h5,
      marginTop: 20,
      marginBottom: 8,
      lineHeight: 1.4,
    },
    h6: {
      ...theme.typography.h6,
      marginTop: 16,
      marginBottom: 8,
      lineHeight: 1.5,
    },
    p: {
      ...theme.typography.body1,
      marginBottom: "1.5rem",
      lineHeight: 1.7,
      letterSpacing: "0.01em",
    },

    br: {
      display: "grid",
      content: '""',
      marginTop: "0.75em",
    },

    // Divider
    hr: {
      margin: "2rem 0",
      flexShrink: 0,
      borderWidth: 0,
      msFlexNegative: 0,
      WebkitFlexShrink: 0,
      borderStyle: "solid",
      borderBottomWidth: "thin",
      borderColor: alpha(theme.palette.divider, 0.8),
    },

    // Enhanced List with nested list support
    "& ul, & ol": {
      margin: "0.5rem 0 1.5rem 0",
      paddingLeft: theme.spacing(3),
      "& li": {
        lineHeight: 1.7,
        marginBottom: "0.5rem",
        paddingLeft: theme.spacing(0.5),
      },
      // Styling for nested lists
      "& ul, & ol": {
        margin: "0.75rem 0 0.75rem 0",
        "& li": {
          lineHeight: 1.6,
          marginBottom: "0.3rem",
        },
        // Handle deeper nesting
        "& ul, & ol": {
          margin: "0.5rem 0 0.5rem 0",
        },
      },
    },

    // Improved Blockquote for yoga quotes
    "& blockquote": {
      lineHeight: 1.6,
      fontSize: "1.25em",
      margin: "2.5rem auto",
      position: "relative",
      fontFamily: "'Georgia', serif",
      padding: theme.spacing(4, 3, 4, 8),
      color: theme.palette.text.primary,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.background.neutral, 0.7),
      borderLeft: `4px solid ${theme.palette.primary.light}`,
      [theme.breakpoints.up("md")]: {
        width: "85%",
      },
      "& p, & span": {
        marginBottom: 0,
        fontSize: "inherit",
        fontFamily: "inherit",
        fontStyle: "italic",
      },
      "&:before": {
        left: 16,
        top: -8,
        display: "block",
        fontSize: "3em",
        content: '"\\201C"',
        position: "absolute",
        color: alpha(theme.palette.primary.main, 0.5),
      },
    },

    // Code Block
    "& pre, & pre > code": {
      fontSize: 15,
      overflowX: "auto",
      whiteSpace: "pre",
      padding: theme.spacing(2),
      color: theme.palette.common.white,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: lightMode
        ? alpha(theme.palette.grey[800], 0.9)
        : alpha(theme.palette.grey[500], 0.16),
    },
    "& code": {
      fontSize: 14,
      borderRadius: 4,
      whiteSpace: "pre",
      padding: theme.spacing(0.2, 0.5),
      color: theme.palette.warning[lightMode ? "darker" : "lighter"],
      backgroundColor: alpha(
        theme.palette.warning[lightMode ? "lighter" : "darker"],
        0.1
      ),
      "&.hljs": { padding: 0, backgroundColor: "transparent" },
    },

    // Table with improved spacing
    table: {
      width: "100%",
      borderCollapse: "collapse",
      border: `1px solid ${theme.palette.divider}`,
      margin: "1.5rem 0",
      "th, td": {
        padding: theme.spacing(1.5),
        border: `1px solid ${theme.palette.divider}`,
        lineHeight: 1.5,
      },
      th: {
        backgroundColor: alpha(theme.palette.primary.light, 0.1),
      },
      "tbody tr:nth-of-type(odd)": {
        backgroundColor: alpha(theme.palette.background.neutral, 0.5),
      },
    },

    // Checkbox
    input: {
      "&[type=checkbox]": {
        position: "relative",
        cursor: "pointer",
        marginRight: theme.spacing(1),
        "&:before": {
          content: '""',
          top: -2,
          left: -2,
          width: 18,
          height: 18,
          borderRadius: 3,
          position: "absolute",
          backgroundColor: theme.palette.grey[lightMode ? 300 : 700],
        },
        "&:checked": {
          "&:before": {
            backgroundColor: theme.palette.primary.main,
          },
          "&:after": {
            content: '""',
            top: 1,
            left: 5,
            width: 4,
            height: 9,
            position: "absolute",
            transform: "rotate(45deg)",
            msTransform: "rotate(45deg)",
            WebkitTransform: "rotate(45deg)",
            border: `solid ${theme.palette.common.white}`,
            borderWidth: "0 2px 2px 0",
          },
        },
      },
    },

    a: {
      color: `var(--color-primary-500) !important`,
    },
  };
});

export default StyledMarkdown;
