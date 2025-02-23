import { PostDetailsHomeView } from "@/sections/blog/view";
import { IBlog } from "@/types/blog";
import axiosInstance, { endpoints } from "@/utils/axios";

// ----------------------------------------------------------------------

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const { slug } = params;

  const res = await axiosInstance.get<IBlog>(endpoints.post.details(slug));

  const post = res.data;

  const resList = await axiosInstance.get<IBlog[]>(endpoints.post.list);

  return <PostDetailsHomeView post={post} latestPosts={resList.data} />;
}

// ----------------------------------------------------------------------

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 * Will remove in Next.js v15
 */
// const dynamic = CONFIG.isStaticExport ? "auto" : "force-dynamic";
const dynamic = "auto";
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
