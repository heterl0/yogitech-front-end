"use client";
import { useAuthContext } from "@/auth/hooks";
import { PATH_AFTER_LOGIN } from "@/config-global";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
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
      console.log(credential);
      await loginWithGoogle(credential ? credential : "");
      router.push(returnTo || PATH_AFTER_LOGIN);
      //   You can store the JWT token in localStorage or context
    } catch (error) {
      console.error("Error exchanging token:", error);
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
          ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
          : ""
      }
    >
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => console.log("Login Failed")}
      />
    </GoogleOAuthProvider>
  );
}
