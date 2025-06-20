import AboutUsViewV2 from "@/sections/about-us/view/about-us-view-v2";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.HOST_WEB_DOMAIN}/`),
  title: "About us - Zenaiyoga",
  description:
    "We created an AI Yoga app that gives real-time feedback on poses using your phone’s camera. It supports English and Vietnamese, helping users improve techniques and avoid injuries.",
  keywords: "Zenaiyoga, Yogi, Yoga, about us, mentor, ai, yoga ai",
  openGraph: {
    title: "About us - Zenaiyoga",
    description:
      "We created an AI Yoga app that gives real-time feedback on poses using your phone’s camera. It supports English and Vietnamese, helping users improve techniques and avoid injuries.",
    url: `${process.env.HOST_WEB_DOMAIN}/about-us/`,
    type: "website",
    images: [{ url: `${process.env.HOST_WEB_DOMAIN}/banner.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About us - Zenaiyoga",
    description:
      "We created an AI Yoga app that gives real-time feedback on poses using your phone’s camera. It supports English and Vietnamese, helping users improve techniques and avoid injuries.",
    images: [`${process.env.HOST_WEB_DOMAIN}/banner.png`],
  },
  alternates: {
    canonical: `${process.env.HOST_WEB_DOMAIN}/about-us/`,
  },
};

export default function Home() {
  return <AboutUsViewV2 />;
}
