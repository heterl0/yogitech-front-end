import { HomeView } from "@/sections/home/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.HOST_WEB_DOMAIN}/`),
  title: "Zenaiyoga: Mentor Platform",
  description:
    "Welcome to Zenaiyogaa, the ultimate mentor platform to connect with experts and enhance your skills.",
  keywords: "Yogitech, Yogi, Yoga",
  robots: "follow, index",
  openGraph: {
    title: "Zenaiyogaa: Mentor Platform",
    description:
      "Welcome to Zenaiyogaa, the ultimate mentor platform to connect with experts and enhance your skills.",
    url: `${process.env.HOST_WEB_DOMAIN}/`,
    siteName: "Zenaiyogaa",
    type: "website",
    images: [
      {
        url: `${process.env.HOST_WEB_DOMAIN}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Zenaiyogaa: Mentor Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenaiyogaa: Mentor Platform",
    description:
      "Welcome to Zenaiyogaa, the ultimate mentor platform to connect with experts and enhance your skills.",
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
