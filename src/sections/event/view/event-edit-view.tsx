"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import EventNewEditForm from "../event-new-edit-form";
import { useGetEvent } from "@/api/event";
import { useGetExercises } from "@/api/exercise";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function EventEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { event: currentEvent } = useGetEvent(id);
  const { exercises } = useGetExercises();

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
            name: "Event",
            href: paths.dashboard.event.root,
          },
          { name: currentEvent?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EventNewEditForm currentEvent={currentEvent} exercises={exercises} />
    </Container>
  );
}
