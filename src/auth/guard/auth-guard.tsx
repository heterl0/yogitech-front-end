import { useState, useEffect, useCallback } from "react";
import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { SplashScreen } from "@/components/loading-screen";
import { useAuthContext } from "../hooks";
import { MotionLazy } from "@/components/animate/motion-lazy";

// ----------------------------------------------------------------------

const loginPaths: Record<string, string> = {
  jwt: paths.auth.jwt.login,
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { loading } = useAuthContext();

  return (
    <MotionLazy>
      {loading ? <SplashScreen /> : <Container>{children}</Container>}
    </MotionLazy>
  );
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const router = useRouter();

  const { authenticated, method } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = loginPaths[method];

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, method, router]);

  useEffect(() => {
    check();
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
