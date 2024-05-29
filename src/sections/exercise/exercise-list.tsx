import { useCallback } from "react";

import Box from "@mui/material/Box";
import Pagination, { paginationClasses } from "@mui/material/Pagination";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import PoseItem from "./exercise-item";
import { IExercise } from "@/types/exercise";

// ----------------------------------------------------------------------

type Props = {
  exercises: IExercise[];
};

export default function ExerciseList({ exercises }: Props) {
  const router = useRouter();

  // const handleView = useCallback(
  //   (id: string) => {
  //     router.push(paths.dashboard.exercise.pEdit(id));
  //   },
  //   [router]
  // );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.exercise.pEdit(id));
    },
    [router]
  );

  const handleDelete = useCallback((id: string) => {
    console.info("DELETE", id);
  }, []);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        {exercises.map((exercise) => (
          <PoseItem
            key={exercise.id}
            exercise={exercise}
            // onView={() => handleView(exercise.id + "")}
            onEdit={() => handleEdit(exercise.id + "")}
            onDelete={() => handleDelete(exercise.id + "")}
          />
        ))}
      </Box>

      {exercises.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: "center",
            },
          }}
        />
      )}
    </>
  );
}
