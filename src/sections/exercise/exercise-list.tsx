import { useCallback, useState } from "react";

import Box from "@mui/material/Box";
import Pagination, { paginationClasses } from "@mui/material/Pagination";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { IExercise } from "@/types/exercise";
import ExerciseItem from "./exercise-item";

// ----------------------------------------------------------------------

type Props = {
  exercises: IExercise[];
};

export default function ExerciseList({ exercises }: Props) {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.exercise.edit(id));
    },
    [router]
  );

  const itemsPerPage = 9;

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
        {exercises
          .slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage)
          .map((exercise) => (
            <ExerciseItem
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
          count={Math.ceil(exercises.length / 8)}
          page={page}
          onChange={(_, value) => setPage(value)}
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
