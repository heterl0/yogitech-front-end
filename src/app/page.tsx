import { HomeView } from "@/sections/home/view";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yogitech.me/"),
  title: "YogiTech: Mentor Platform",
  description:
    "Welcome to YogiTech, the ultimate mentor platform to connect with experts and enhance your skills.",
  keywords: "Yogitech, Yogi, Yoga",
  robots: "follow, index",
  openGraph: {
    title: "YogiTech: Mentor Platform",
    description:
      "Welcome to YogiTech, the ultimate mentor platform to connect with experts and enhance your skills.",
    url: "https://www.yogitech.me/",
    siteName: "YogiTech",
    type: "website",
    images: [
      {
        url: "https://www.yogitech.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "YogiTech: Mentor Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YogiTech: Mentor Platform",
    description:
      "Welcome to YogiTech, the ultimate mentor platform to connect with experts and enhance your skills.",
    images: ["https://www.yogitech.me/og-image.jpg"],
  },
  icons: [
    { rel: "icon", url: "https://www.yogitech.me/icon.png" },
    { rel: "apple-touch-icon", url: "https://www.yogitech.me/apple-icon.png" },
  ],
  alternates: {
    canonical: "https://www.yogitech.me/",
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>YogiTech: Mentor Platform</title>
        <meta name="keywords" content="Yogitech, Yogi, Yoga" />
        <meta
          name="description"
          content="Welcome to YogiTech, the ultimate mentor platform to connect with experts and enhance your skills."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="YogiTech: Mentor Platform" />
        <meta
          property="og:description"
          content="Welcome to YogiTech, the ultimate mentor platform to connect with experts and enhance your skills."
        />
        <meta property="og:url" content="https://www.yogitech.me/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.yogitech.me/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YogiTech: Mentor Platform" />
        <meta
          name="twitter:description"
          content="Welcome to YogiTech, the ultimate mentor platform to connect with experts and enhance your skills."
        />
        <meta
          name="twitter:image"
          content="https://www.yogitech.me/twitter-image.jpg"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <HomeView />
    </>
  );
}
