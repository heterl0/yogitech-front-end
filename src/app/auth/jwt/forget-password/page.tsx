import JwtForgotPasswordView from "@/sections/auth/jwt/jwt-forgot-password-view";
import { Suspense } from "react";
// ----------------------------------------------------------------------

export const metadata = {
  title: "Jwt: Login",
};

export default function LoginPage() {
  return (
    <Suspense>
      <JwtForgotPasswordView />
    </Suspense>
  );
}
