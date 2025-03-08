/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";
import EmptyContent from "@/components/empty-content";
import Iconify from "@/components/iconify";

// ----------------------------------------------------------------------

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container sx={{ my: 5 }}>
      <EmptyContent
        filled
        title="Post not found!"
        action={
          <Button
            component={RouterLink}
            href={paths.blog.root}
            startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
            sx={{ mt: 3 }}
          >
            Back to list
          </Button>
        }
        sx={{ py: 10 }}
      />
    </Container>
  );
}
