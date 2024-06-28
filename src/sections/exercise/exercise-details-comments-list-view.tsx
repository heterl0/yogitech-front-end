/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import isEqual from "lodash/isEqual";
import { useState, useCallback } from "react";

import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { useBoolean } from "@/hooks/use-boolean";
import Iconify from "@/components/iconify";
import Scrollbar from "@/components/scrollbar";
import { useSnackbar } from "@/components/snackbar";
import { ConfirmDialog } from "@/components/custom-dialog";
import { useSettingsContext } from "@/components/settings";
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "@/components/table";

import axiosInstance, { endpoints } from "@/utils/axios";
import { HttpStatusCode } from "axios";
import NotificationTableToolbar from "./exercise-details-comments-table-toolbar";
import {
  IComment,
  ICommentTableFilterValue,
  ICommentTableFilters,
} from "@/types/exercise";
import ExerciseCommentTableFiltersResult from "./exercise-details-comments-table-filters-result";
import { useTranslation } from "react-i18next";
import ExerciseCommentTableRow from "./exercise-details-comments-table-row";

// ----------------------------------------------------------------------

const defaultFilters: ICommentTableFilters = {
  name: "",
  status: [],
};

// ----------------------------------------------------------------------

export default function ExerciseCommentListView({
  comments,
}: {
  comments: IComment[];
}) {
  const { enqueueSnackbar } = useSnackbar();

  const { t } = useTranslation();
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState<IComment[]>(comments);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 56 + 20;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  // useEffect(() => {
  //   setTableData(comments);
  // }, [comments]);

  const TABLE_HEAD = [
    {
      id: "comment",
      label: t("exercisePage.exerciseCommentListView.tableHead.comment"),
      width: 560,
    },
    {
      id: "time",
      label: t("exercisePage.exerciseCommentListView.tableHead.time"),
      width: 180,
    },
    {
      id: "status",
      label: t("exercisePage.exerciseCommentListView.tableHead.status"),
      width: 110,
    },
    { id: "", width: 88 },
  ];

  const handleFilters = useCallback(
    (name: string, value: ICommentTableFilterValue) => {
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
  }, []);

  const handleBanRow = useCallback(
    async (id: number) => {
      const response = await axiosInstance.patch(
        `${endpoints.account.details}${id}/`,
        {
          active_status: 0,
        }
      );
      if (response.status === HttpStatusCode.Ok) {
        const deleteRow = tableData.map((row) => {
          if (row.id === id) {
            return {
              ...row,
              active_status: row.active_status === 0 ? 1 : 0,
            };
          }
          return row;
        });

        enqueueSnackbar(
          t("exercisePage.exerciseCommentListView.snackbar.banSuccess")
        );

        setTableData(deleteRow);
      } else {
        enqueueSnackbar(
          t("exercisePage.exerciseCommentListView.snackbar.banFailed"),
          {
            variant: "error",
          }
        );
      }

      // table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [enqueueSnackbar, t, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter(
      (row) => !table.selected.includes(row.id)
    );

    enqueueSnackbar(
      t("exercisePage.exerciseCommentListView.snackbar.deleteSuccess")
    );

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [
    dataFiltered.length,
    dataInPage.length,
    enqueueSnackbar,
    t,
    table,
    tableData,
  ]);

  const handleEditRow = useCallback(
    (id: number) => {
      router.push(paths.dashboard.account.edit(id));
    },
    [router]
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : "lg"}>
        <Card>
          <NotificationTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            StatusOptions={[
              t("exercisePage.exerciseCommentListView.filters.all"),
              "Disabled",
              "Active",
            ]}
          />

          {canReset && (
            <ExerciseCommentTableFiltersResult
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
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

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
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <ExerciseCommentTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onBanRow={() => handleBanRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
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

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t("exercisePage.exerciseCommentListView.confirmDialog.title")}
        content={
          <>
            {t("exercisePage.exerciseCommentListView.confirmDialog.content", {
              numSelected: table.selected.length,
            })}
            {/* Using interpolation for numSelected */}
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            {t("exercisePage.exerciseCommentListView.confirmDialog.delete")}
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IComment[];
  comparator: (a: any, b: any) => number;
  filters: ICommentTableFilters;
}) {
  const { name, status } = filters;
  const { t } = useTranslation();
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (comment) => comment.text.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (
    status.length &&
    !status.includes(t("exercisePage.exerciseCommentListView.filters.all"))
  ) {
    const statuses: string[] = inputData.map((comment) =>
      comment.active_status === 1 ? "Active" : "Disabled"
    );
    inputData = inputData.filter((comment, index) =>
      status.includes(statuses[index])
    );
  }

  return inputData;
}
