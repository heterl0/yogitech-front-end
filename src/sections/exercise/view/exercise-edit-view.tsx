"use client";

import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { useGetExercise } from "@/api/exercise";
import ExerciseNewEditForm from "@/sections/exercise/exercise-new-edit-form";
import { useGetPoses } from "@/api/pose";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function ExerciseEditView({ id }: Props) {
  const settings = useSettingsContext();
  const { t } = useTranslation();

  const { exercise: currentExercise } = useGetExercise(id);
  const { poses } = useGetPoses();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("exercisePage.exerciseEditView.heading")}
        links={[
          {
            name: t("exercisePage.exerciseEditView.breadcrumb.dashboard"),
            href: paths.dashboard.root,
          },
          {
            name: t("exercisePage.exerciseEditView.breadcrumb.exercise"),
            href: paths.dashboard.exercise.root,
          },
          { name: currentExercise?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {poses && (
        <ExerciseNewEditForm poses={poses} currentExercise={currentExercise} />
      )}
    </Container>
  );
}
