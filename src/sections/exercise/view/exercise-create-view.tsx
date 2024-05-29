"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import ExerciseNewEditForm from "../exercise-new-edit-form";
import { useGetPoses } from "@/api/pose";

// ----------------------------------------------------------------------

export default function ExerciseCreateView() {
  const settings = useSettingsContext();
  const { poses } = useGetPoses();
  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="Create a new exercise"
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: "Exercise",
            href: paths.dashboard.tour.root,
          },
          { name: "New Exercise" },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {poses && <ExerciseNewEditForm poses={poses} />}
    </Container>
  );
}
