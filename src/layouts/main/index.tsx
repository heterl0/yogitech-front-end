"use client";

import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";
import Footer from "./footer";
import { paths } from "@/routes/paths";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./header"), { ssr: false });

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  isBlurFromStart?: boolean;
};

export default function MainLayout({ children, isBlurFromStart }: Props) {
  const pathname = usePathname();

  const homePage = pathname === "/";

  const aboutPage = pathname === paths.about;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Header isBlurFromStart={isBlurFromStart} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!(homePage || aboutPage) && {
            pt: { xs: 8, md: 10 },
          }),
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
