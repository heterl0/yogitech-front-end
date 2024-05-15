"use client";

import { useScroll } from "framer-motion";

import MainLayout from "@/layouts/main";

import ScrollProgress from "@/components/scroll-progress";
import DownloadAdvertisement from "../download-advertisement";
import { Box } from "@mui/material";

// import HomePricing from "../home-pricing";
// import HomeDarkMode from "../home-dark-mode";
// import HomeLookingFor from "../home-looking-for";
// import HomeForDesigner from "../home-for-designer";
// import HomeColorPresets from "../home-color-presets";
// import HomeAdvertisement from "../home-advertisement";
// import HomeCleanInterfaces from "../home-clean-interfaces";
// import HomeHugePackElements from "../home-hugepack-elements";

// ----------------------------------------------------------------------

// type StyledPolygonProps = {
//   anchor?: "top" | "bottom";
// };

// const StyledPolygon = styled("div")<StyledPolygonProps>(
//   ({ anchor = "top", theme }) => ({
//     left: 0,
//     zIndex: 9,
//     height: 80,
//     width: "100%",
//     position: "absolute",
//     clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
//     backgroundColor: theme.palette.background.default,
//     display: "block",
//     lineHeight: 0,
//     ...(anchor === "top" && {
//       top: -1,
//       transform: "scale(-1, -1)",
//     }),
//     ...(anchor === "bottom" && {
//       bottom: -1,
//       backgroundColor: theme.palette.grey[900],
//     }),
//   })
// );

// ----------------------------------------------------------------------

export default function DownloadView() {
  const { scrollYProgress } = useScroll();

  return (
    <MainLayout isBlurFromStart={true}>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <Box
        sx={{
          // minHeight: "calc(100vh - 60px)", // Adjust according to the actual header height
          backgroundColor: "white",
          overflow: "auto",
        }}
      >
        <DownloadAdvertisement />
      </Box>
    </MainLayout>
  );
}
