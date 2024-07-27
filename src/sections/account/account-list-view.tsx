/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import isEqual from "lodash/isEqual";
import { useState, useCallback, useEffect } from "react";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
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
import { RouterLink } from "@/routes/components";

import { useBoolean } from "@/hooks/use-boolean";

import { _yogitechRole } from "@/_mock";

import Label from "@/components/label";
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

import {
  IAccount,
  IUserTableFilters,
  IUserTableFilterValue,
} from "@/types/user";
import UserTableToolbar from "../user/user-table-toolbar";
import UserTableFiltersResult from "../user/user-table-filters-result";
import UserTableRow from "../user/user-table-row";
import { useGetAccounts } from "@/api/account";
import axiosInstance, { endpoints } from "@/utils/axios";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

// const STATUS_OPTIONS = [{ value: "all", label: "All" }, ...USER_STATUS_OPTIONS];

const defaultFilters: IUserTableFilters = {
  name: "",
  role: [],
  status: "all",
};

// ----------------------------------------------------------------------

export default function AccountListView() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const table = useTable();
  const settings = useSettingsContext();
  const router = useRouter();
  const confirm = useBoolean();
  const { accounts, accountsMutate } = useGetAccounts();

  const [tableData, setTableData] = useState<IAccount[]>([]);
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
    setTableData(accounts);
  }, [accounts]);

  const handleFilters = useCallback(
    (name: string, value: IUserTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const TABLE_HEAD = [
    { id: "username", label: t("tableHead.username") },
    { id: "phone", label: t("tableHead.phoneNumber"), width: 180 },
    { id: "active_status", label: t("tableHead.status"), width: 160 },
    { id: "is_staff", label: t("tableHead.role"), width: 180 },
    { id: "auth_provider", label: t("tableHead.auth_provider"), width: 100 },
    { id: "", width: 88 },
  ];

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleBanRow = useCallback(
    async (id: number) => {
      const response = await axiosInstance.patch(
        `${endpoints.account.details}${id}/`,
        {
          active_status:
            tableData.find((row) => row.id === id)?.active_status === 0 ? 1 : 0,
        }
      );
      if (response.status === 200) {
        const updatedRows = tableData.map((row) => {
          if (row.id === id) {
            return {
              ...row,
              active_status: row.active_status === 0 ? 1 : 0,
            };
          }
          return row;
        });

        enqueueSnackbar(t("accountListView.banSuccess"));

        setTableData(updatedRows);
      } else {
        enqueueSnackbar(t("accountListView.banFailed"), { variant: "error" });
      }
    },
    [enqueueSnackbar, tableData, t]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter(
      (row) => !table.selected.includes(row.id)
    );

    enqueueSnackbar(t("accountListView.deleteSuccess"));

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [
    dataFiltered.length,
    dataInPage.length,
    enqueueSnackbar,
    table,
    tableData,
    t,
  ]);

  const handleEditRow = useCallback(
    (id: number) => {
      router.push(paths.dashboard.account.edit(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters("status", newValue);
    },
    [handleFilters]
  );

  const handleMutation = useCallback(
    (data: IAccount, isCreated: boolean) => {
      if (isCreated) {
        accountsMutate((accounts: IAccount[]) => [data, ...accounts], false);
      } else {
        accountsMutate(
          (accounts: IAccount[]) =>
            accounts.map((account) =>
              account.id === data.id ? data : account
            ),
          false
        );
      }
    },
    [accountsMutate]
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading={t("accountListView.list")}
          links={[
            {
              name: t("accountListView.dashboard"),
              href: paths.dashboard.root,
            },
            {
              name: t("accountListView.account"),
              href: paths.dashboard.account.root,
            },
            { name: t("accountListView.list") },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.account.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              {t("accountListView.newUser")}
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${theme.palette.grey[500]}80`,
            }}
          >
            {["all", "active", "pending", "banned"].map((tab) => (
              <Tab
                key={tab}
                iconPosition="end"
                value={tab}
                label={t(`accountListView.tabs.${tab}`)}
                icon={
                  <Label
                    variant={
                      tab === "all" || tab === filters.status
                        ? "filled"
                        : "soft"
                    }
                    color={
                      (tab === "active" && "success") ||
                      (tab === "pending" && "warning") ||
                      (tab === "banned" && "error") ||
                      "default"
                    }
                  >
                    {tab === "active"
                      ? tableData.filter(
                          (user) => user.is_active && user.active_status === 1
                        ).length
                      : tab === "pending"
                        ? tableData.filter(
                            (user) =>
                              !user.is_active && user.active_status === 1
                          ).length
                        : tab === "banned"
                          ? tableData.filter((user) => user.active_status === 0)
                              .length
                          : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
            roleOptions={_yogitechRole}
          />

          {canReset && (
            <UserTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              onResetFilters={handleResetFilters}
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
                <Tooltip title={t("accountListView.delete")}>
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
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onBanRow={() => handleBanRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onQuickEdit={handleMutation}
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
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t("accountListView.delete")}
        content={
          <>
            {t("accountListView.deleteConfirm", {
              count: table.selected.length,
            })}
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
            {t("accountListView.delete")}
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
  inputData: IAccount[];
  comparator: (a: any, b: any) => number;
  filters: IUserTableFilters;
}) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) =>
        user.username.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        user.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== "all") {
    if (status === "pending") {
      inputData = inputData.filter(
        (account) => !account.is_active && account.active_status === 1
      );
    }
    if (status === "active") {
      inputData = inputData.filter(
        (account) => account.is_active && account.active_status === 1
      );
    }

    if (status === "banned") {
      inputData = inputData.filter((account) => account.active_status === 0);
    }
  }

  if (role.length) {
    const roles = inputData.map((user) =>
      user.is_staff ? "Admin" : user.is_premium ? "Premium User" : "User"
    );
    inputData = inputData.filter((user, index) => role.includes(roles[index]));
  }

  return inputData;
}
