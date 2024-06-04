// import { paramCase } from "@/utils/change-case";
// import axios, { endpoints } from "@/utils/axios";

import { PostEditView } from "@/sections/blog/view";
// import axiosInstance, { endpoints } from "@/utils/axios";
// import { paramCase } from "@/utils/change-case";

// ----------------------------------------------------------------------

export const metadata = {
  title: "Dashboard: Post Edit",
};

type Props = {
  params: {
    id: string;
  };
};

export default function PostEditPage({ params }: Props) {
  const { id } = params;

  return <PostEditView id={id} />;
}

// export async function generateStaticParams() {
//   const res = await axiosInstance.get(endpoints.post.list);
//   // console.log(
//   //   res.data.map((post: { id: number }) => ({
//   //     id: paramCase(post.id + ""),
//   //   }))
//   // );
//   return;
// }
