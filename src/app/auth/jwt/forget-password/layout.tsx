"use client";

import { GuestGuard } from "@/auth/guard";
import CompactLayout from "@/layouts/compact";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <CompactLayout>{children}</CompactLayout>
    </GuestGuard>
  );
}
