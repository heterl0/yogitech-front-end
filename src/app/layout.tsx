import "@/global.css";

import type { Metadata } from "next";
import { Nunito_Sans, Lora } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/theme";
import { LocalizationProvider } from "@/locales";
import { SettingsProvider } from "@/components/settings";
import ProgressBar from "@/components/progress-bar";
import { MotionLazy } from "@/components/animate/motion-lazy";
import { AuthProvider } from "@/auth/context/jwt";
import SnackbarProvider from "@/components/snackbar/snackbar-provider";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export const nunitoSans = Nunito_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
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
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
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

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "YogiTech: Mentor Platform",
  description:
    "Welcome to YogiTech, the ultimate mentor platform to connect with experts and enhance your skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${lora.variable}`}>
      <body className={nunitoSans.className}>
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
            <GoogleAnalytics gaId="G-686MPCS14D" />
            <GoogleTagManager gtmId="GTM-P43FRWB7" />
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3767915082225357`}
              strategy="lazyOnload"
              crossOrigin="anonymous"
            />

            <Script id="clarity-script" defer>
              {` (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "qastr5sh4u");`}
            </Script>
          </>
        )}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </body>
    </html>
  );
}
