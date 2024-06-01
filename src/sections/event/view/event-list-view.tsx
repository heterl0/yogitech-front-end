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
  IEvent,
  IEventFilterValue,
  IEventFilters,
  EVENT_SORT_OPTIONS,
} from "@/types/event";
import { useGetEvents } from "@/api/event";
import { isBetween, isAfter } from "@/utils/format-time";
import EventSearch from "../event-search";
import EventSort from "../event-sort";
import EventFilters from "../event-filters";
import EventList from "../event-list";
import EventFiltersResult from "../event-filters-result";

// ----------------------------------------------------------------------

const defaultFilters: IEventFilters = {
  status: -1,
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function EventListView() {
  const settings = useSettingsContext();

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState("latest");

  const { events } = useGetEvents();

  const [search, setSearch] = useState<{ query: string; results: IEvent[] }>({
    query: "",
    results: [],
  });

  const [filters, setFilters] = useState(defaultFilters);

  const dateError = isAfter(filters?.startDate, filters?.endDate);

  const dataFiltered = applyFilter({
    inputData: events,
    filters,
    sortBy,
    dateError,
  });

  const canReset =
    filters.status !== -1 ||
    filters.startDate !== null ||
    filters.endDate !== null;

  const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback(
    (name: string, value: IEventFilterValue) => {
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
        const results = events.filter(
          (event) =>
            event.title.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [events, search.query]
  );

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: "flex-end", sm: "center" }}
      direction={{ xs: "column", sm: "row" }}
    >
      <EventSearch
        query={search.query}
        results={search.results}
        onSearch={handleSearch}
        hrefItem={(id: string) => paths.dashboard.exercise.pEdit(id)}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <EventFilters
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
          dateError={dateError}
        />

        <EventSort
          sort={sortBy}
          onSort={handleSortBy}
          sortOptions={EVENT_SORT_OPTIONS}
        />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <EventFiltersResult
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
            name: "Event",
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
            New Event
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

      <EventList events={dataFiltered} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
  sortBy,
  dateError,
}: {
  inputData: IEvent[];
  filters: IEventFilters;
  sortBy: string;
  dateError: boolean;
}) => {
  const { status, startDate, endDate } = filters;

  // SORT BY
  if (sortBy === "latest") {
    inputData = orderBy(inputData, ["created_at"], ["desc"]);
  }

  if (sortBy === "oldest") {
    inputData = orderBy(inputData, ["created_at"], ["asc"]);
  }

  // FILTERS

  if (status !== -1) {
    inputData = inputData.filter((event) => event.active_status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((event) =>
        isBetween(
          startDate,
          new Date(event.start_date),
          new Date(event.expire_date)
        )
      );
    }
  }

  return inputData;
};
