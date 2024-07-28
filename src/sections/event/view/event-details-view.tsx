"use client";

import { useState, useCallback } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Container from "@mui/material/Container";
import { paths } from "@/routes/paths";
import { useSettingsContext } from "@/components/settings";
import { useGetEvent } from "@/api/event";
import EventDetailsContent from "../event-details-content";
import Label from "@/components/label";
import EventDetailsCandidates from "../event-details-candidates";
import EventDetailsToolbar from "../event-details-toolbar";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function EventDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const { event: currentEvent } = useGetEvent(id);

  const [currentTab, setCurrentTab] = useState("detail");

  const { t } = useTranslation();

  const EVENT_DETAILS_TABS = [
    { value: "detail", label: t("eventPage.tabs.detail") },
    { value: "ranking", label: t("eventPage.tabs.ranking") },
  ];

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      {EVENT_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === "ranking" ? (
              <Label variant="filled">
                {currentEvent?.event_candidate.length}
              </Label>
            ) : (
              ""
            )
          }
        />
      ))}
    </Tabs>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <EventDetailsToolbar
        backLink={paths.dashboard.event.root}
        editLink={paths.dashboard.event.edit(`${currentEvent?.id}`)}
      />
      {renderTabs}

      {currentTab === "detail" && currentEvent && (
        <EventDetailsContent event={currentEvent} />
      )}

      {currentTab === "ranking" && (
        <EventDetailsCandidates candidates={currentEvent?.event_candidate} />
      )}
    </Container>
  );
}
