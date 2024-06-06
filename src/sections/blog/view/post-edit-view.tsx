"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useGetPost } from "@/api/blog";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { useTranslation } from "react-i18next";
import PostNewEditForm from "../post-new-edit-form";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PostEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { post: currentPost } = useGetPost(id);
  const { t } = useTranslation();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("blogPage.editView.heading")} // Dùng key mới cho heading "Edit"
        links={[
          {
            name: t("blogPage.createView.breadcrumb.dashboard"),
            href: paths.dashboard.root,
          },
          {
            name: t("blogPage.createView.breadcrumb.blog"),
            href: paths.dashboard.blog.root,
          },
          { name: currentPost?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PostNewEditForm currentPost={currentPost} />
    </Container>
  );
}
