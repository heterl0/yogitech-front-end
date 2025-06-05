import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import { HEADER } from "../config-layout";

const Header = dynamic(() => import("./header"), {
  loading: () => (
    <Box sx={{ width: "100%" }}>
      <Skeleton
        variant="rectangular"
        sx={{
          width: "100%",
          height: {
            xs: 0,
            md: HEADER.H_DESKTOP,
          },
        }}
      />
    </Box>
  ),
});

const Footer = dynamic(() => import("./footer"), {
  loading: () => <div />,
  ssr: false,
});

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  isBlurFromStart?: boolean;
  isDisableOffsetBlur?: boolean;
};

export default function MainLayout({
  children,
  isBlurFromStart,
  isDisableOffsetBlur,
}: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Header
        isBlurFromStart={isBlurFromStart}
        isDisableOffsetBlur={isDisableOffsetBlur}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...{
            pt: { xs: 8, md: 10 },
          },
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
