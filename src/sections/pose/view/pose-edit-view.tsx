"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import PoseNewEditForm from "../pose-new-edit-form";
import { useGetPose } from "@/api/pose";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PoseEditView({ id }: Props) {
  const settings = useSettingsContext();
  const { t } = useTranslation(); // Đặt namespace là "posePage"

  const { pose: currentPose } = useGetPose(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("posePage.poseEditView.heading")} // Sử dụng chuỗi dịch
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: t("posePage.poseEditView.pose"),
            href: paths.dashboard.pose.root, // Đảm bảo đường dẫn đúng
          },
          { name: currentPose?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PoseNewEditForm currentPose={currentPose} />
    </Container>
  );
}
