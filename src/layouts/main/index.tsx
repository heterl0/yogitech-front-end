import Box from "@mui/material/Box";

import { usePathname } from "next/navigation";

import Footer from "./footer";
import Header from "./header";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  isBlurFromStart?: boolean;
};

export default function MainLayout({ children, isBlurFromStart }: Props) {
  const pathname = usePathname();

  const homePage = pathname === "/";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Header isBlurFromStart={isBlurFromStart} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!homePage && {
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
