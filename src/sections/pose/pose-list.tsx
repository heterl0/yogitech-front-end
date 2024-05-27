import { useCallback } from "react";

import Box from "@mui/material/Box";
import Pagination, { paginationClasses } from "@mui/material/Pagination";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { IPose } from "@/types/pose";
import PoseItem from "./pose-item";

// ----------------------------------------------------------------------

type Props = {
  poses: IPose[];
};

export default function PoseList({ poses }: Props) {
  const router = useRouter();

  const handleView = useCallback(
    (id: string) => {
      router.push(paths.dashboard.exercise.pEdit(id));
    },
    [router]
  );

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
        {poses.map((pose) => (
          <PoseItem
            key={pose.id}
            pose={pose}
            onView={() => handleView(pose.id + "")}
            onEdit={() => handleEdit(pose.id + "")}
            onDelete={() => handleDelete(pose.id + "")}
          />
        ))}
      </Box>

      {poses.length > 8 && (
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
