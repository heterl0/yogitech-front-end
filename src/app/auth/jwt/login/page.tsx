import { JwtLoginView } from "@/sections/auth/jwt";
import { Suspense } from "react";
// ----------------------------------------------------------------------

export const metadata = {
  title: "Jwt: Login",
};

export default function LoginPage() {
  return (
    <Suspense>
      <JwtLoginView />
    </Suspense>
  );
}
