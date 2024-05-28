"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import PoseNewEditForm from "../pose-new-edit-form";
import { useGetPose } from "@/api/pose";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PoseEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { pose: currentPose } = useGetPose(id);

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
            name: "Tour",
            href: paths.dashboard.tour.root,
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
