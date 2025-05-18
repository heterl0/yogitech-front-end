import "./globals.css";
import ThemeProvider from "@/theme";
import ProgressBar from "@/components/progress-bar";
import SnackbarProvider from "@/components/snackbar/snackbar-provider";
import dynamic from "next/dynamic";
import { Nunito_Sans, Lora } from "next/font/google";
import { SettingsProvider } from "@/components/settings";
import { MotionLazy } from "@/components/animate/motion-lazy";
import { AuthProvider } from "@/auth/context/jwt";
import Script from "next/script";
import { cn } from "@/utils/cn";

const GoogleThirdParties = dynamic(
  () => import("@/components/google-third-parties/google-third-parties"),
  {
    ssr: false,
  }
);

const LocalizationProvider = dynamic(
  () => import("@/locales/localization-provider").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export const nunitoSans = Nunito_Sans({
  weight: ["400", "500"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-nunito-sans",
  fallback: [
    // Windows
    "Segoe UI",
    "Tahoma",
    "Arial",
    // macOS
    "-apple-system",
    "BlinkMacSystemFont",
    // Linux
    "Ubuntu",
    "Cantarell",
    "Noto Sans",
    // Android
    "Roboto",
    // iOS
    "San Francisco",
    // Generic
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
});

export const lora = Lora({
  weight: ["600", "700"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-lora",
  fallback: [
    // Windows
    "Georgia",
    "Times New Roman",
    // macOS
    "Apple Garamond",
    "Baskerville",
    // Linux
    "Liberation Serif",
    "DejaVu Serif",
    // Generic
    "Times",
    "serif",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(nunitoSans.variable, lora.variable)}>
      <body>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: "light", // 'light' | 'dark'
                themeDirection: "ltr", //  'rtl' | 'ltr'
                themeContrast: "default", // 'default' | 'bold'
                themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SnackbarProvider>
                    <ProgressBar />
                    {children}
                  </SnackbarProvider>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
        {process.env.NODE_ENV === "production" && (
          <>
            <GoogleThirdParties />
            {/* <Script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3767915082225357"
              strategy="afterInteractive"
              crossOrigin="anonymous"
            /> */}
            <Script id="clarity-script" strategy="afterInteractive">
              {`(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "qastr5sh4u");`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
