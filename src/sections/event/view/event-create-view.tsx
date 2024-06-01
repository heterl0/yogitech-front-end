"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { useGetExercises } from "@/api/exercise";
import EventNewEditForm from "../event-new-edit-form";

// ----------------------------------------------------------------------

export default function EventCreateView() {
  const settings = useSettingsContext();
  const { exercises } = useGetExercises();
  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="Create a new event"
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: "Event",
            href: paths.dashboard.tour.root,
          },
          { name: "New event" },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EventNewEditForm exercises={exercises} />
    </Container>
  );
}
