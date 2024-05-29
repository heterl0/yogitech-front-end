"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import ExerciseNewEditForm from "../exercise-new-edit-form";

// ----------------------------------------------------------------------

export default function ExerciseCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="Create a new pose"
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

      <ExerciseNewEditForm />
    </Container>
  );
}
