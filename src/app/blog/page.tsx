import { PostListHomeView } from "@/sections/blog/view";
import axiosInstance, { endpoints } from "@/utils/axios";
import { Metadata } from "next";

// ----------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.HOST_WEB_DOMAIN}/`),
  title: "Blog - Zenaiyoga",
  description:
    "Explore the latest insights on AI-powered yoga, pose techniques, and wellness tips. Our blog covers everything from beginner basics to advanced practices, helping you enhance your yoga journey.",
  keywords:
    "Zenaiyoga, Yoga blog, AI yoga, yoga tips, wellness, yoga techniques",
  openGraph: {
    title: "Blog - Zenaiyoga",
    description:
      "Explore the latest insights on AI-powered yoga, pose techniques, and wellness tips. Our blog covers everything from beginner basics to advanced practices, helping you enhance your yoga journey.",
    url: `${process.env.HOST_WEB_DOMAIN}/blog/`,
    type: "website",
    images: [{ url: `${process.env.HOST_WEB_DOMAIN}/blog-banner.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Zenaiyoga",
    description:
      "Explore the latest insights on AI-powered yoga, pose techniques, and wellness tips. Our blog covers everything from beginner basics to advanced practices, helping you enhance your yoga journey.",
    images: [`${process.env.HOST_WEB_DOMAIN}/blog-banner.jpg`],
  },
  alternates: {
    canonical: `${process.env.HOST_WEB_DOMAIN}/blog/`,
  },
};

export default async function Page() {
  const { data: posts } = await axiosInstance.get(endpoints.post.list);
  return <PostListHomeView posts={posts} />;
}
