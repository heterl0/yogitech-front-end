import { useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Pagination, { paginationClasses } from "@mui/material/Pagination";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { IPose } from "@/types/pose";
import PoseItem from "./pose-item";

// ----------------------------------------------------------------------

type Props = {
  poses: IPose[];
  isFilter: boolean;
};

export default function PoseList({ poses, isFilter }: Props) {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.pose.edit(id));
    },
    [router]
  );

  useEffect(() => {
    if (isFilter) {
      setPage(1);
    }
  }, [poses]);

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
        {poses
          .slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage)
          .map((pose) => (
            <PoseItem
              key={pose.id}
              pose={pose}
              // onView={() => handleView(pose.id + "")}
              onEdit={() => handleEdit(pose.id + "")}
              onDelete={() => handleDelete(pose.id + "")}
            />
          ))}
      </Box>

      {poses.length > 9 && (
        <Pagination
          count={Math.ceil(poses.length / 9)}
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
