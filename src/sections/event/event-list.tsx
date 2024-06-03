import { useCallback, useState } from "react";

import Box from "@mui/material/Box";
import Pagination, { paginationClasses } from "@mui/material/Pagination";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import PoseItem from "./event-item";
import { IEvent } from "@/types/event";

// ----------------------------------------------------------------------

type Props = {
  events: IEvent[];
};

export default function EventList({ events }: Props) {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const itemsPerPage = 8;

  // const handleView = useCallback(
  //   (id: string) => {
  //     router.push(paths.dashboard.pose.edit(id));
  //   },
  //   [router]
  // );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.event.edit(id));
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
        {events
          .slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage)
          .map((event) => (
            <PoseItem
              key={event.id}
              event={event}
              // onView={() => handleView(pose.id + "")}
              onEdit={() => handleEdit(event.id + "")}
              onDelete={() => handleDelete(event.id + "")}
            />
          ))}
      </Box>

      {events.length > 8 && (
        <Pagination
          count={Math.ceil(events.length / 8)}
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
