"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import PoseNewEditForm from "../pose-new-edit-form";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function PoseCreateView() {
  const settings = useSettingsContext();
  const { t } = useTranslation(); // Đặt namespace là "posePage"

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("posePage.poseCreateView.heading")} // Sử dụng chuỗi dịch
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: t("posePage.poseCreateView.pose"),
            href: paths.dashboard.pose.root, // Đảm bảo đường dẫn đúng
          },
          { name: t("posePage.poseCreateView.newPose") }, // Sử dụng chuỗi dịch
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PoseNewEditForm />
    </Container>
  );
}
