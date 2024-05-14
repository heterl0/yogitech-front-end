"use client";

import { GuestGuard } from "@/auth/guard";
import AuthClassicLayout from "@/layouts/auth/classic";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthClassicLayout>{children}</AuthClassicLayout>
    </GuestGuard>
  );
}
