"use client";

import Container from "@mui/material/Container";
import { paths } from "@/routes/paths";
import { useSettingsContext } from "@/components/settings";
import { useGetPose } from "@/api/pose";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function ExerciseDetailsView({ id }: Props) {
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
