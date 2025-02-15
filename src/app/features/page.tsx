import { HomeView } from "@/sections/home/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.HOST_WEB_DOMAIN}/`),
  title: "Features - YogiTech",
  description:
    "Welcome to YogiTech, the AI-driven yoga app designed to help you perfect your poses with real-time feedback.",
  keywords: "Yogitech, Yogi, Yoga, features, mentor, ai, yoga ai",
  openGraph: {
    title: "Features - YogiTech",
    description:
      "Welcome to YogiTech, the AI-driven yoga app designed to help you perfect your poses with real-time feedback.",
    url: "${process.env.HOST_WEB_DOMAIN}/about-us/",
    type: "website",
    images: [{ url: `${process.env.HOST_WEB_DOMAIN}/banner-2.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features - YogiTech",
    description:
      "Welcome to YogiTech, the AI-driven yoga app designed to help you perfect your poses with real-time feedback.",
    images: [`${process.env.HOST_WEB_DOMAIN}/banner-2.png"`],
  },
  alternates: {
    canonical: `${process.env.HOST_WEB_DOMAIN}/about-us/`,
  },
};

export default function Home() {
  return (
    <>
      <HomeView />
    </>
  );
}
