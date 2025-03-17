import { IPost } from "@/types/blog";
import { endpoints } from "@/utils/axios";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_API}${endpoints.post.list}`
  );
  const posts = await res.json();
  const urls = posts.map((post: IPost) => ({
    url: `${process.env.HOST_WEB_DOMAIN}/blog/${post.slug}/`,
    lastModified: new Date(post.created_at),
    priority: 0.8,
  }));

  return [
    {
      url: `${process.env.HOST_WEB_DOMAIN}/`,
      lastModified: new Date("2025-02-15T12:00:00.000Z"),
      priority: 1.0,
    },
    {
      url: `${process.env.HOST_WEB_DOMAIN}/about-us/`,
      lastModified: new Date("2025-02-15T12:00:00.000Z"),
      priority: 0.8,
    },
    {
      url: `${process.env.HOST_WEB_DOMAIN}/download/`,
      lastModified: new Date("2024-08-14T12:00:00.000Z"),
      priority: 0.8,
    },
    {
      url: `${process.env.HOST_WEB_DOMAIN}/contact-us/`,
      lastModified: new Date("2024-08-20T12:00:00.000Z"),
      priority: 0.8,
    },
    {
      url: `${process.env.HOST_WEB_DOMAIN}/blog/`,
      lastModified: new Date("2025-03-13T12:00:00.000Z"),
      priority: 0.8,
    },
    {
      url: `${process.env.HOST_WEB_DOMAIN}/privacy-policy/`,
      lastModified: new Date("2024-08-20T12:00:00.000Z"),
      priority: 0.8,
    },
    {
      url: `${process.env.HOST_WEB_DOMAIN}/terms-and-conditions/`,
      lastModified: new Date("2024-08-20T12:00:00.000Z"),
      priority: 0.8,
    },
    ...urls,
  ];
}

export const revalidate = 60;
