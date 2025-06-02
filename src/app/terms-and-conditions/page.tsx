import TermsAndConditionsView from "@/sections/terms-and-conditions/view/terms-and-conditions-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.HOST_WEB_DOMAIN}/`),
  title: "Terms and Conditions - Zenaiyoga",
  description:
    "These Terms and Conditions outline the rules and guidelines for using Zenaiyoga's services.",
  keywords: "Yogitech, terms and conditions, user agreement, Zenaiyoga",
  openGraph: {
    title: "Terms and Conditions - Zenaiyoga",
    description:
      "These Terms and Conditions outline the rules and guidelines for using Zenaiyoga's services.",
    url: `${process.env.HOST_WEB_DOMAIN}/terms-and-conditions/`,
    type: "website",
    images: [{ url: `${process.env.HOST_WEB_DOMAIN}/banner-2.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions - Zenaiyoga",
    description:
      "These Terms and Conditions outline the rules and guidelines for using Zenaiyoga's services.",
    images: [`${process.env.HOST_WEB_DOMAIN}/banner-2.png`],
  },
  alternates: {
    canonical: `${process.env.HOST_WEB_DOMAIN}/terms-and-conditions/`,
  },
};

export default function Page() {
  return <TermsAndConditionsView />;
}
