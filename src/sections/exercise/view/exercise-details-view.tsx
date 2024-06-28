"use client";

import Container from "@mui/material/Container";
import { paths } from "@/routes/paths";
import { useSettingsContext } from "@/components/settings";
import ExerciseDetailsToolbar from "../exercise-details-toolbar";
import { useGetExercise } from "@/api/exercise";
import ExerciseDetailsContent from "../exercise-details-content";
import { Tab, Tabs } from "@mui/material";
import Label from "@/components/label";
import ExerciseCommentListView from "../exercise-details-comments-list-view";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function ExerciseDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const { exercise: currentExercise } = useGetExercise(id);

  const [currentTab, setCurrentTab] = useState("detail");

  const { t } = useTranslation();

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  const EXERCISE_DETAILS_TABS = [
    { value: "detail", label: t("exercisePage.tabs.detail") },
    { value: "comment", label: t("exercisePage.tabs.comment") },
  ];

  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      {EXERCISE_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === "comment" ? (
              <Label variant="filled">{currentExercise?.comments.length}</Label>
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
      <ExerciseDetailsToolbar
        backLink={paths.dashboard.exercise.root}
        editLink={paths.dashboard.exercise.edit(`${currentExercise?.id}`)}
      />

      {renderTabs}

      {currentTab === "detail" && currentExercise && (
        <ExerciseDetailsContent exercise={currentExercise} />
      )}

      {currentTab === "comment" && currentExercise.comments && (
        <ExerciseCommentListView comments={currentExercise.comments} />
      )}
    </Container>
  );
}
