import { DownloadView } from "@/sections/download/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.HOST_WEB_DOMAIN}/`),
  title: "Download - Zenaiyoga",
  description:
    "Download the Zenaiyogaa app to connect with experts and enhance your skills.",
  keywords:
    "Yogitech, Yogi, Yoga, mentor, ai, yoga ai, download, Zenaiyogaa app,Zenaiyogaga download",
  openGraph: {
    title: "Download - Zenaiyogaa",
    description:
      "Download the Zenaiyogaa app to connect with experts and enhance your skills.",
    url: `${process.env.HOST_WEB_DOMAIN}/download/`,
    type: "website",
    images: [{ url: `${process.env.HOST_WEB_DOMAIN}/banner.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download - Zenaiyogaa",
    description:
      "Download the Zenaiyogaa app to connect with experts and enhance your skills.",
    images: [`${process.env.HOST_WEB_DOMAIN}/banner.png`],
  },
  alternates: {
    canonical: `${process.env.HOST_WEB_DOMAIN}/download/`,
  },
};

export default function Download() {
  return <DownloadView />;
}
