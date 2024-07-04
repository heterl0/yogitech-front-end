"use client";

import orderBy from "lodash/orderBy";
import { useState, useCallback } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { useBoolean } from "@/hooks/use-boolean";

import Iconify from "@/components/iconify";
import EmptyContent from "@/components/empty-content";
import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";

import {
  IExercise,
  IExerciseFilterValue,
  IExerciseFilters,
} from "@/types/exercise";
import { useGetExercises } from "@/api/exercise";
import ExerciseList from "../exercise-list";
import ExerciseSearch from "../exercise-search";
import ExerciseFilters from "../exercise-filters";
import ExerciseSort from "../exercise-sort";
import ExerciseFiltersResult from "../exericse-filters-result";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const defaultFilters: IExerciseFilters = {
  benefits: [],
  level: -1,
  status: -1,
  is_premium: -1,
};

// ----------------------------------------------------------------------

export default function ExerciseListView() {
  const { t } = useTranslation();
  const settings = useSettingsContext();

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState("latest");

  const { exercises } = useGetExercises();

  const EXERCISE_SORT_OPTIONS = [
    { value: "latest", label: t("sort.latest") },
    { value: "oldest", label: t("sort.oldest") },
  ];

  const [search, setSearch] = useState<{ query: string; results: IExercise[] }>(
    {
      query: "",
      results: [],
    }
  );

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: exercises,
    filters,
    sortBy,
  });

  const canReset =
    !!filters.benefits.length ||
    filters.level !== -1 ||
    filters.status !== -1 ||
    filters.is_premium !== -1;

  const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback(
    (name: string, value: IExerciseFilterValue) => {
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback(
    (inputValue: string) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = exercises.filter(
          (exercise) =>
            exercise.title.toLowerCase().indexOf(search.query.toLowerCase()) !==
            -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [exercises, search.query]
  );

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: "flex-end", sm: "center" }}
      direction={{ xs: "column", sm: "row" }}
    >
      <ExerciseSearch
        query={search.query}
        results={search.results}
        onSearch={handleSearch}
        hrefItem={(id: string) => paths.dashboard.exercise.edit(id)}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <ExerciseFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          //
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
          //
        />

        <ExerciseSort
          sort={sortBy}
          onSort={handleSortBy}
          sortOptions={EXERCISE_SORT_OPTIONS}
        />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <ExerciseFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered.length}
    />
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("exercisePage.exerciseListView.heading")}
        links={[
          {
            name: t("exercisePage.exerciseListView.breadcrumb.dashboard"),
            href: paths.dashboard.root,
          },
          {
            name: t("exercisePage.exerciseListView.breadcrumb.exercise"),
            href: paths.dashboard.exercise.root,
          },
          { name: t("exercisePage.exerciseListView.breadcrumb.list") },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.exercise.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            {t("exercisePage.exerciseListView.button.newExercise")}
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {notFound && (
        <EmptyContent
          title={t("exercisePage.exerciseListView.emptyContent.noData")}
          filled
          sx={{ py: 10 }}
        />
      )}

      <ExerciseList exercises={dataFiltered} isFilter={canReset} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
  sortBy,
}: {
  inputData: IExercise[];
  filters: IExerciseFilters;
  sortBy: string;
}) => {
  const { benefits, level, status, is_premium } = filters;

  // SORT BY
  if (sortBy === "latest") {
    inputData = orderBy(inputData, ["created_at"], ["desc"]);
  }

  if (sortBy === "oldest") {
    inputData = orderBy(inputData, ["created_at"], ["asc"]);
  }

  if (level !== -1) {
    inputData = inputData.filter((exercise) => exercise.level === level);
  }

  if (status !== -1) {
    inputData = inputData.filter(
      (exercise) => exercise.active_status === status
    );
  }

  if (is_premium !== -1) {
    inputData = inputData.filter(
      (exercise) => exercise.is_premium && is_premium === 1
    );
  }

  if (benefits.length > 0) {
    inputData = inputData.filter((exercise) => {
      const exerciseBenefits = JSON.parse(exercise.benefit) as string[];
      return benefits.some((benefit) => exerciseBenefits.includes(benefit));
    });
  }

  return inputData;
};
