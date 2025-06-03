import PrivacyPolicyView from "@/sections/privacy-policy/view/privacy-policy-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.HOST_WEB_DOMAIN}/`),
  title: "Privacy Policy - Zenaiyoga",
  description:
    "Our Privacy Policy explains how Zenaiyoga collects, uses, and protects your personal information.",
  keywords: "Zenaiyoga, privacy policy, data protection, Zenaiyoga",
  openGraph: {
    title: "Privacy Policy - Zenaiyoga",
    description:
      "Our Privacy Policy explains how Zenaiyoga collects, uses, and protects your personal information.",
    url: `${process.env.HOST_WEB_DOMAIN}/privacy-policy/`,
    type: "website",
    images: [{ url: `${process.env.HOST_WEB_DOMAIN}/banner-2.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Zenaiyoga",
    description:
      "Our Privacy Policy explains how Zenaiyoga collects, uses, and protects your personal information.",
    images: [`${process.env.HOST_WEB_DOMAIN}/banner-2.png`],
  },
  alternates: {
    canonical: `${process.env.HOST_WEB_DOMAIN}/privacy-policy/`,
  },
};

export default function Page() {
  return <PrivacyPolicyView />;
}
