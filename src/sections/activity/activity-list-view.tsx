/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import isEqual from "lodash/isEqual";
import { useState, useCallback, useEffect, useMemo } from "react";

import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import { paths } from "@/routes/paths";
import { useBoolean } from "@/hooks/use-boolean";
import Iconify from "@/components/iconify";
import Scrollbar from "@/components/scrollbar";
import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from "@/components/table";

import { useTranslation } from "react-i18next";
import { useGetActivities } from "@/api/activity";
import {
  IExerciseLog,
  IExerciseLogTableFilters,
  IExerciseLogTableFilterValue,
} from "@/types/exercise";
import { isAfter, isBetween } from "@/utils/format-time";
import ActivityTableToolbar from "./activity-table-toolbar";
import ActivityTableFiltersResult from "./activity-table-filters-result";
import ActivityTableRow from "./activity-table-row";

// ----------------------------------------------------------------------

export default function ActivityListView() {
  const { t } = useTranslation();

  const TABLE_HEAD = [
    { id: "exerciseId", label: "Exercise ID", width: 140 },
    { id: "userId", label: "User ID", width: 180 },
    { id: "process", label: "Process", width: 140 },
    { id: "completePose", label: "Complete Pose", width: 110 },
    { id: "result", label: "Result", width: 110 },
    { id: "point", label: "Point", width: 110 },
    { id: "exp", label: "Exp", width: 110 },
    { id: "calories", label: "Calories", width: 110 },
    { id: "ttf", label: "Total Time Finish", width: 110 },
    { id: "createdAt", label: "Created At", width: 110 },
  ];

  const defaultFilters: IExerciseLogTableFilters = useMemo(() => {
    return {
      id: "",
      startDate: null,
      endDate: null,
    };
  }, []);

  const table = useTable();

  const settings = useSettingsContext();

  const quickCreate = useBoolean();

  const { activities } = useGetActivities();

  const [tableData, setTableData] = useState<IExerciseLog[]>([]);

  const [filters, setFilters] = useState(defaultFilters);

  const dateError = isAfter(filters?.startDate, filters?.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const denseHeight = table.dense ? 56 : 56 + 20;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  useEffect(() => {
    setTableData(activities);
  }, [activities]);

  const handleFilters = useCallback(
    (name: string, value: IExerciseLogTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, [defaultFilters]);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading={t("notiPage.Notification")}
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            {
              name: t("notiPage.Notification"),
              href: paths.dashboard.notification.root,
            },
            { name: t("notiPage.List") },
          ]}
          action={
            <Button
              // component={RouterLink}
              // href={paths.dashboard.account.new}
              onClick={quickCreate.onTrue}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              {t("notiPage.Create")}
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <ActivityTableToolbar
            filters={filters}
            onFilters={handleFilters}
            dateError={dateError}
          />

          {canReset && (
            <ActivityTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table
                size={table.dense ? "small" : "medium"}
                sx={{ minWidth: 960 }}
              >
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  onSort={table.onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row, index) => (
                      <ActivityTableRow key={index} row={row} />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      dataFiltered.length
                    )}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
  dateError,
}: {
  inputData: IExerciseLog[];
  comparator: (a: any, b: any) => number;
  filters: IExerciseLogTableFilters;
  dateError: boolean;
}) {
  const { id, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (id) {
    inputData = inputData.filter(
      (activity) =>
        activity.exercise.toString().toLowerCase().includes(id.toLowerCase()) ||
        activity.user.toString().toLowerCase().includes(id.toLowerCase())
    );
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((activity) =>
        isBetween(activity.created_at, new Date(startDate), new Date(endDate))
      );
    }
  }

  return inputData;
}
