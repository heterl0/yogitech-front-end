"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import EventNewEditForm from "../event-new-edit-form";
import { useGetEvent } from "@/api/event";
import { useGetExercises } from "@/api/exercise";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function EventEditView({ id }: Props) {
  const settings = useSettingsContext();
  const { t } = useTranslation();

  const { event: currentEvent } = useGetEvent(id);
  const { exercises } = useGetExercises();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("eventPage.editView.heading")}
        links={[
          {
            name: t("eventPage.editView.breadcrumb.dashboard"),
            href: paths.dashboard.root,
          },
          {
            name: t("eventPage.editView.breadcrumb.event"),
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
