import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import Header from "../main/header";
import { MotionLazy } from "@/components/animate/motion-lazy";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function CompactLayout({ children }: Props) {
  return (
    <MotionLazy>
      <Header />

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: "auto",
            maxWidth: 400,
            minHeight: "100vh",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Stack>
      </Container>
    </MotionLazy>
  );
}
