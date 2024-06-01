"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import PoseNewEditForm from "../pose-new-edit-form";

// ----------------------------------------------------------------------

export default function EventCreateView() {
  const settings = useSettingsContext();

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

      <PoseNewEditForm />
    </Container>
  );
}
