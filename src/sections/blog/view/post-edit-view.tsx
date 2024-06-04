"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useGetPost } from "@/api/blog";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";

import PostNewEditForm from "../post-new-edit-form";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PostEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { post: currentPost } = useGetPost(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: "Blog",
            href: paths.dashboard.blog.root,
          },
          {
            name: currentPost?.title,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PostNewEditForm currentPost={currentPost} />
    </Container>
  );
}
