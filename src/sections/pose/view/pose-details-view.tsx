"use client";

import Container from "@mui/material/Container";
import { paths } from "@/routes/paths";
import { useSettingsContext } from "@/components/settings";
import { useGetPose } from "@/api/pose";
import PoseDetailsToolbar from "../pose-details-toolbar";
import PoseDetailsContent from "../pose-details-content";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PoseDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const { pose: currentPose } = useGetPose(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <PoseDetailsToolbar
        backLink={paths.dashboard.pose.root}
        editLink={paths.dashboard.pose.edit(`${currentPose?.id}`)}
      />

      {currentPose && <PoseDetailsContent pose={currentPose} />}
    </Container>
  );
}
