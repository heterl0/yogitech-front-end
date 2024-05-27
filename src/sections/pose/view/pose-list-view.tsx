"use client";

import orderBy from "lodash/orderBy";
import { useState, useCallback } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { useBoolean } from "@/hooks/use-boolean";

import { _tours } from "@/_mock";

import Iconify from "@/components/iconify";
import EmptyContent from "@/components/empty-content";
import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";

import {
  IPose,
  IPoseFilterValue,
  IPoseFilters,
  POSE_SORT_OPTIONS,
} from "@/types/pose";
import { useGetPoses } from "@/api/pose";
import PoseFiltersResult from "../pose-filters-result";
import { useGetMuscles } from "@/api/muscle";
import PoseFilters from "../pose-filters";
import PoseSearch from "../pose-search";
import PoseSort from "../pose-sort";
import PoseList from "../pose-list";

// ----------------------------------------------------------------------

const defaultFilters: IPoseFilters = {
  muscles: [],
  level: -1,
  status: -1,
};

// ----------------------------------------------------------------------

export default function PoseListView() {
  const settings = useSettingsContext();

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState("latest");

  const { poses } = useGetPoses();
  const { muscles } = useGetMuscles();

  const [search, setSearch] = useState<{ query: string; results: IPose[] }>({
    query: "",
    results: [],
  });

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: poses,
    filters,
    sortBy,
  });

  const canReset =
    !!filters.muscles.length || filters.level !== -1 || filters.status !== -1;

  const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback((name: string, value: IPoseFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

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
        const results = poses.filter(
          (pose) =>
            pose.name.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [poses, search.query]
  );

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: "flex-end", sm: "center" }}
      direction={{ xs: "column", sm: "row" }}
    >
      <PoseSearch
        query={search.query}
        results={search.results}
        onSearch={handleSearch}
        hrefItem={(id: string) => paths.dashboard.exercise.pEdit(id)}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <PoseFilters
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
          muscleOptions={muscles}
        />

        <PoseSort
          sort={sortBy}
          onSort={handleSortBy}
          sortOptions={POSE_SORT_OPTIONS}
        />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <PoseFiltersResult
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
        heading="List"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          {
            name: "Pose",
            href: paths.dashboard.exercise.pose,
          },
          { name: "List" },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.exercise.pNew}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Pose
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

      {notFound && <EmptyContent title="No Data" filled sx={{ py: 10 }} />}

      <PoseList poses={dataFiltered} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
  sortBy,
}: {
  inputData: IPose[];
  filters: IPoseFilters;
  sortBy: string;
}) => {
  const { muscles, level, status } = filters;

  // SORT BY
  if (sortBy === "latest") {
    inputData = orderBy(inputData, ["created_at"], ["desc"]);
  }

  if (sortBy === "oldest") {
    inputData = orderBy(inputData, ["created_at"], ["asc"]);
  }

  // FILTERS
  if (muscles.length) {
    const muscleIdsFilter = muscles.map((muscle) => muscle.id);
    inputData = inputData.filter((pose) => {
      const muscleIds = pose.muscles.map((muscle) => muscle.id);
      return muscleIdsFilter.some((filterItem) =>
        muscleIds.includes(filterItem)
      );
    });
  }

  if (level !== -1) {
    inputData = inputData.filter((pose) => pose.level === level);
  }

  if (status !== -1) {
    inputData = inputData.filter((pose) => pose.active_status === status);
  }

  return inputData;
};
