import AboutUsView from "@/sections/about-us/view/about-us-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.HOST_WEB_DOMAIN}/`),
  title: "About us - YogiTech",
  description:
    "We created an AI Yoga app that gives real-time feedback on poses using your phone’s camera. It supports English and Vietnamese, helping users improve techniques and avoid injuries.",
  keywords: "Yogitech, Yogi, Yoga, about us, mentor, ai, yoga ai",
  openGraph: {
    title: "About us - YogiTech",
    description:
      "We created an AI Yoga app that gives real-time feedback on poses using your phone’s camera. It supports English and Vietnamese, helping users improve techniques and avoid injuries.",
    url: `${process.env.HOST_WEB_DOMAIN}/about-us/`,
    type: "website",
    images: [{ url: `${process.env.HOST_WEB_DOMAIN}/banner.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About us - YogiTech",
    description:
      "We created an AI Yoga app that gives real-time feedback on poses using your phone’s camera. It supports English and Vietnamese, helping users improve techniques and avoid injuries.",
    images: [`${process.env.HOST_WEB_DOMAIN}/banner.png`],
  },
  alternates: {
    canonical: `${process.env.HOST_WEB_DOMAIN}/about-us/`,
  },
};

export default function Home() {
  return <AboutUsView />;
}
