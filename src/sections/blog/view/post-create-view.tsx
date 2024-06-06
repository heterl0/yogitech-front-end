"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";

import PostNewEditForm from "../post-new-edit-form";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function PostCreateView() {
  const settings = useSettingsContext();
  const { t } = useTranslation();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("blogPage.createView.heading")}
        links={[
          {
            name: t("blogPage.createView.breadcrumb.dashboard"),
            href: paths.dashboard.root,
          },
          {
            name: t("blogPage.createView.breadcrumb.blog"),
            href: paths.dashboard.blog.root,
          },
          { name: t("blogPage.createView.breadcrumb.create") },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PostNewEditForm />
    </Container>
  );
}
