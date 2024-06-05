"use client";
import { useAuthContext } from "@/auth/hooks";
import { PATH_AFTER_LOGIN } from "@/config-global";
import { Button } from "@mui/material";
import { CredentialResponse, useGoogleLogin } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleLoginButton() {
  const { loginWithGoogle } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");
  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const { credential } = credentialResponse;
    try {
      await loginWithGoogle(credential ? credential : "");
      router.push(returnTo || PATH_AFTER_LOGIN);
      //   You can store the JWT token in localStorage or context
    } catch (error) {
      console.error("Error exchanging token:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: () => handleGoogleLoginSuccess,
  });
  return <Button onClick={() => login()}>Login with Google</Button>;
}
