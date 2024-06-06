"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { useGetExercises } from "@/api/exercise";
import EventNewEditForm from "../event-new-edit-form";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function EventCreateView() {
  const settings = useSettingsContext();
  const { exercises } = useGetExercises();
  const { t } = useTranslation();
  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("eventPage.createView.heading")}
        links={[
          {
            name: t("eventPage.createView.breadcrumb.dashboard"),
            href: paths.dashboard.root,
          },
          {
            name: t("eventPage.createView.breadcrumb.event"),
            href: paths.dashboard.tour.root,
          },
          { name: t("eventPage.createView.breadcrumb.newEvent") },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EventNewEditForm exercises={exercises} />
    </Container>
  );
}
