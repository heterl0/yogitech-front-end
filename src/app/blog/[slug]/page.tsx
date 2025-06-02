import { PostDetailsHomeView } from "@/sections/blog/view";
import { IPost } from "@/types/blog";
import axiosInstance, { endpoints } from "@/utils/axios";
import { generatePostJsonLd } from "@/utils/generate-post-jsonld";
import { Metadata } from "next";
import Script from "next/script";

// ----------------------------------------------------------------------

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const { slug } = params;

  const res = await axiosInstance.get<IPost>(endpoints.post.details(slug));

  const post = res.data;

  const resList = await axiosInstance.get<IPost[]>(endpoints.post.list);

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePostJsonLd(post)),
        }}
        id="json-ld-post"
      />
      <PostDetailsHomeView post={post} latestPosts={resList.data} />
    </>
  );
}

// ----------------------------------------------------------------------

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 * Will remove in Next.js v15
 */
// const dynamic = CONFIG.isStaticExport ? "auto" : "force-dynamic";
const dynamic = "force-dynamic";
export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  const res = await axiosInstance.get(endpoints.post.list);
  return res.data.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug } = await params;

  const res = await axiosInstance.get<IPost>(endpoints.post.details(slug));

  const post = res.data;

  return {
    metadataBase: new URL(`${process.env.HOST_WEB_DOMAIN}/`),
    title: post.seo_title ?? "Blog - Zenaiyoga",
    description:
      post.seo_description ??
      "Explore the latest insights on AI-powered yoga, pose techniques, and wellness tips. Our blog covers everything from beginner basics to advanced practices, helping you enhance your yoga journey.",
    keywords:
      post.seo_keywords ??
      "Yogitech, Yoga blog, AI yoga, yoga tips, wellness, yoga techniques",
    openGraph: {
      title: post.seo_title ?? "Blog - Zenaiyoga",
      description:
        post.seo_description ??
        "Explore the latest insights on AI-powered yoga, pose techniques, and wellness tips. Our blog covers everything from beginner basics to advanced practices, helping you enhance your yoga journey.",
      url: `${process.env.HOST_WEB_DOMAIN}/blog/${post.slug}/`,
      type: "article",
      images: [
        {
          url: post.image_url,
        },
        { url: `${process.env.HOST_WEB_DOMAIN}/blog-banner.jpg` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo_title ?? "Blog - Zenaiyoga",
      description:
        post.seo_description &&
        "Explore the latest insights on AI-powered yoga, pose techniques, and wellness tips. Our blog covers everything from beginner basics to advanced practices, helping you enhance your yoga journey.",
      images: [
        post.image_url,
        `${process.env.HOST_WEB_DOMAIN}/blog-banner.jpg`,
      ],
    },
    alternates: {
      canonical: `${process.env.HOST_WEB_DOMAIN}/blog/${post.slug}/`,
    },
  };
}
