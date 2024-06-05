"use client";

import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import ExerciseNewEditForm from "../exercise-new-edit-form";
import { useGetPoses } from "@/api/pose";

// ----------------------------------------------------------------------

export default function ExerciseCreateView() {
  const settings = useSettingsContext();
  const { poses } = useGetPoses();
  const { t } = useTranslation();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("exercisePage.exerciseCreateView.heading")}
        links={[
          {
            name: t("exercisePage.exerciseCreateView.breadcrumb.dashboard"),
            href: paths.dashboard.root,
          },
          {
            name: t("exercisePage.exerciseCreateView.breadcrumb.exercise"),
            href: paths.dashboard.tour.root,
          },
          { name: t("exercisePage.exerciseCreateView.breadcrumb.newExercise") },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {poses && <ExerciseNewEditForm poses={poses} />}
    </Container>
  );
}
