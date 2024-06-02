"use client";

import Container from "@mui/material/Container";
import { paths } from "@/routes/paths";
import { useSettingsContext } from "@/components/settings";
import ExerciseDetailsToolbar from "../exercise-details-toolbar";
import { useGetExercise } from "@/api/exercise";
import ExerciseDetailsContent from "../exercise-details-content";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function ExerciseDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const { exercise: currentExercise } = useGetExercise(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <ExerciseDetailsToolbar
        backLink={paths.dashboard.exercise.root}
        editLink={paths.dashboard.exercise.edit(`${currentExercise?.id}`)}
      />

      {currentExercise && <ExerciseDetailsContent exercise={currentExercise} />}
    </Container>
  );
}
