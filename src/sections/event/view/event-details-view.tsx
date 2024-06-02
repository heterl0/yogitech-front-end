"use client";

import { useState, useCallback, useEffect } from "react";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";
import { useSettingsContext } from "@/components/settings";

import TourDetailsToolbar from "../event-details-toolbar";
import { useGetEvent } from "@/api/event";
import { EVENT_DETAILS_TABS, EVENT_STATUS } from "@/types/event";
import EventDetailsContent from "../event-details-content";
import axiosInstance, { endpoints } from "@/utils/axios";
import Label from "@/components/label";
import EventDetailsCandidates from "../event-details-candidates";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function EventDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const { event: currentEvent } = useGetEvent(id);

  const [status, setStatus] = useState(0);

  const [currentTab, setCurrentTab] = useState("detail");

  useEffect(() => {
    if (currentEvent) {
      if (currentEvent.active_status === 0) {
        setStatus(0);
      } else {
        if (currentEvent.status === 0) {
          setStatus(1);
        } else if (currentEvent.status === 1) {
          setStatus(2);
        } else {
          setStatus(3);
        }
      }
    }
  }, [currentEvent]);

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  const handleChangeStatus = useCallback(
    (newValue: number) => {
      let active_status = 0;
      let status = 0;
      if (newValue === 0) {
        active_status = 0;
        status = 0;
      } else {
        active_status = 1;
        if (newValue === 1) {
          status = 0;
        } else if (newValue === 2) {
          status = 1;
        } else {
          status = 2;
        }
      }
      axiosInstance.patch(`${endpoints.event.update(currentEvent.id + "")}`, {
        active_status,
        status,
        exercise_ids: currentEvent.exercises.map((exercise) => exercise.id),
      });

      setStatus(newValue);
    },
    [currentEvent]
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
      <TourDetailsToolbar
        backLink={paths.dashboard.event.root}
        editLink={paths.dashboard.event.edit(`${currentEvent?.id}`)}
        status={status || 0}
        onChangeStatus={handleChangeStatus}
        statusOptions={EVENT_STATUS}
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
