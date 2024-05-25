// import { paramCase } from "@/utils/change-case";
// import axios, { endpoints } from "@/utils/axios";

import { PostDetailsView } from "@/sections/blog/view";

// ----------------------------------------------------------------------

export const metadata = {
  title: "Dashboard: Post Details",
};

type Props = {
  params: {
    id: string;
  };
};

export default function PostDetailsPage({ params }: Props) {
  const { id } = params;
  return <PostDetailsView id={id} />;
}

// export async function generateStaticParams() {
//   const res = await axiosInstance.get(endpoints.post.list);

//   return res.data.posts.map((post: { title: string }) => ({
//     title: paramCase(post.title),
//   }));
// }
