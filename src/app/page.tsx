import { HomeView } from "@/sections/home/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.HOST_WEB_DOMAIN}/`),
  title: "Zenaiyoga: Mentor Platform",
  description:
    "Welcome to Zenaiyoga, the ultimate mentor platform to connect with experts and enhance your skills.",
  keywords: "Zenaiyoga, Yogi, Yoga",
  robots: "follow, index",
  openGraph: {
    title: "Zenaiyoga: Mentor Platform",
    description:
      "Welcome to Zenaiyoga, the ultimate mentor platform to connect with experts and enhance your skills.",
    url: `${process.env.HOST_WEB_DOMAIN}/`,
    siteName: "Zenaiyoga",
    type: "website",
    images: [
      {
        url: `${process.env.HOST_WEB_DOMAIN}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Zenaiyoga: Mentor Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenaiyoga: Mentor Platform",
    description:
      "Welcome to Zenaiyoga, the ultimate mentor platform to connect with experts and enhance your skills.",
    images: [`${process.env.HOST_WEB_DOMAIN}/og-image.png`],
  },
  icons: [
    { rel: "icon", url: `${process.env.HOST_WEB_DOMAIN}/icon.png` },
    {
      rel: "apple-touch-icon",
      url: `${process.env.HOST_WEB_DOMAIN}/apple-icon.png`,
    },
  ],
  alternates: {
    canonical: `${process.env.HOST_WEB_DOMAIN}`,
  },
};

export default async function Home() {
  return <HomeView />;
}
