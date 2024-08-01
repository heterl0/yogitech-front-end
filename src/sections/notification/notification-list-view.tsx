/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import isEqual from "lodash/isEqual";
import { useState, useCallback, useEffect, useMemo } from "react";

import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";

import { paths } from "@/routes/paths";
import { useBoolean } from "@/hooks/use-boolean";
import Iconify from "@/components/iconify";
import Scrollbar from "@/components/scrollbar";
import { useSnackbar } from "@/components/snackbar";
import { ConfirmDialog } from "@/components/custom-dialog";
import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
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
import {
  INotification,
  INotificationTableFilters,
  INotificationTableFilterValue,
} from "@/types/notification";
import { useGetNotifications } from "@/api/notification";
import NotificationTableToolbar from "./notification-table-toolbar";
import NotificationTableFiltersResult from "./notification-table-filters-result";
import NotificationTableRow from "./notification-table-row";
import { alpha, Tab, Tabs } from "@mui/material";
import Label from "@/components/label";
import NotificationQuickCreateEditForm from "./notification-quick-create-edit-form";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function NotificationListView() {
  const { t } = useTranslation();
  const TYPE_OPTIONS = [
    { value: "all", label: t("notiPage.All") },
    { value: "admin", label: t("notiPage.Admin") },
    { value: "user", label: t("notiPage.User") },
  ];

  const TABLE_HEAD = [
    { id: "title", label: t("notiPage.Title"), width: 560 },
    { id: "time", label: t("notiPage.Time"), width: 180 },
    { id: "user", label: t("notiPage.User"), width: 140 },
    { id: "active_status", label: t("notiPage.Status"), width: 110 },
    { id: "", width: 88 },
  ];

  const defaultFilters: INotificationTableFilters = useMemo(() => {
    return {
      name: "",
      status: [],
      type: "all",
    };
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const table = useTable();

  const settings = useSettingsContext();

  const quickCreate = useBoolean();

  const confirm = useBoolean();

  const { notifications, notificationsMutate } = useGetNotifications();

  const [tableData, setTableData] = useState<INotification[]>([]);

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

  useEffect(() => {
    setTableData(notifications);
  }, [notifications]);

  const handleFilters = useCallback(
    (name: string, value: INotificationTableFilterValue) => {
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

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter(
      (row) => !table.selected.includes(row.id)
    );

    enqueueSnackbar(t("notiPage.Deletesuccess"));

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

  const handleFilterType = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters("type", newValue);
    },
    [handleFilters]
  );

  const handleMutation = useCallback(
    (data: INotification, isCreated: boolean) => {
      if (isCreated) {
        notificationsMutate(
          (notifications: INotification[]) => [data, ...notifications],
          false
        );
      } else {
        notificationsMutate(
          (notifications: INotification[]) =>
            notifications.map((notification) =>
              notification.id === data.id ? data : notification
            ),
          false
        );
      }
    },
    [notificationsMutate]
  );

  const handleBanRow = useCallback(
    async (id: number) => {
      const response = await axiosInstance.patch(
        `${endpoints.notification.update(id.toString())}`,
        {
          active_status:
            tableData.find((row) => row.id === id)?.active_status === 0 ? 1 : 0,
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
        handleMutation(response.data, false);

        enqueueSnackbar(
          response.data.active_status === 0
            ? t("notiPage.Disablesuccess")
            : t("notiPage.Enablesuccess")
        );

        setTableData(deleteRow);
      } else {
        enqueueSnackbar(t("notiPage.Error"), { variant: "error" });
      }

      // table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [enqueueSnackbar, t, tableData, handleMutation]
  );

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
          <Tabs
            value={filters.type}
            onChange={handleFilterType}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {TYPE_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === "all" || tab.value === filters.type) &&
                        "filled") ||
                      "soft"
                    }
                    color={
                      (tab.value === "admin" && "success") ||
                      (tab.value === "user" && "warning") ||
                      "default"
                    }
                  >
                    {["admin", "user"].includes(tab.value)
                      ? tab.value === "admin"
                        ? tableData.filter(
                            (notification) => notification.is_admin
                          ).length
                        : tableData.filter(
                            (notification) => !notification.is_admin
                          ).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <NotificationTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            StatusOptions={["Disabled", "Active"]}
          />

          {canReset && (
            <NotificationTableFiltersResult
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
                      <NotificationTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onBanRow={() => handleBanRow(row.id)}
                        onEditRow={handleMutation}
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
        title="Delete"
        content={
          <>
            Are you sure want to delete{" "}
            <strong> {table.selected.length} </strong> items?
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
            Delete
          </Button>
        }
      />
      <NotificationQuickCreateEditForm
        open={quickCreate.value}
        onClose={quickCreate.onFalse}
        onMutate={handleMutation}
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
  inputData: INotification[];
  comparator: (a: any, b: any) => number;
  filters: INotificationTableFilters;
}) {
  const { name, status, type } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (notification) =>
        notification.title.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        notification.body.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (type !== "all") {
    inputData = inputData.filter((notification) =>
      type === "admin" ? notification.is_admin : !notification.is_admin
    );
  }

  if (status.length) {
    const statuses: string[] = inputData.map((notification) =>
      notification.active_status === 1 ? "Active" : "Disabled"
    );
    inputData = inputData.filter((notification, index) =>
      status.includes(statuses[index])
    );
  }

  return inputData;
}
