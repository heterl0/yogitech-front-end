"use client";

import Container from "@mui/material/Container";

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

  const { exercise: currentExercise } = useGetExercise(id);
  const { poses } = useGetPoses();
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
            name: "Exercise",
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
