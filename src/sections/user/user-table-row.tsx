import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";

import { useBoolean } from "@/hooks/use-boolean";

import Label from "@/components/label";
import Iconify from "@/components/iconify";
import { ConfirmDialog } from "@/components/custom-dialog";
import CustomPopover, { usePopover } from "@/components/custom-popover";

import { IAccount } from "@/types/user";

import UserQuickEditForm from "./user-quick-edit-form";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onQuickEdit: (data: IAccount, isCreated: boolean) => void;
  onEditRow: VoidFunction;
  row: IAccount;
  onSelectRow: VoidFunction;
  onBanRow: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onBanRow,
  onQuickEdit,
}: Props) {
  const {
    username,
    is_premium,
    active_status,
    is_active,
    is_staff,
    email,
    phone,
    auth_provider,
    profile: { avatar_url },
  } = row;

  const { t } = useTranslation();

  const role = is_staff ? "Admin" : is_premium ? "Premium User" : "User";
  const status =
    active_status === 0 ? "banned" : is_active ? "active" : "pending";

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt={username} src={avatar_url || ""} sx={{ mr: 2 }} />

          <ListItemText
            primary={username}
            secondary={email}
            primaryTypographyProps={{ typography: "body2" }}
            secondaryTypographyProps={{
              component: "span",
              color: "text.disabled",
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{phone}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === "active" && "success") ||
              (status === "pending" && "warning") ||
              (status === "banned" && "error") ||
              "default"
            }
          >
            {t(status)}
          </Label>
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{role}</TableCell>

        <TableCell>
          <Label
            color={
              (auth_provider === "email" && "success") ||
              (auth_provider === "google" && "warning") ||
              "default"
            }
          >
            {auth_provider === "email"
              ? "Email"
              : auth_provider === "Google"
                ? "Google"
                : auth_provider}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: "nowrap" }}>
          <Tooltip title={t("notiPage.QuickEdit")} placement="top" arrow>
            <IconButton
              color={quickEdit.value ? "inherit" : "default"}
              onClick={quickEdit.onTrue}
            >
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <IconButton
            color={popover.open ? "inherit" : "default"}
            onClick={popover.onOpen}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <UserQuickEditForm
        currentUser={row}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
        onQuickEdit={onQuickEdit}
      />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: active_status == 1 ? "error.main" : "info.main" }}
        >
          <Iconify
            icon={
              active_status === 1
                ? "solar:close-circle-bold"
                : "solar:check-circle-bold"
            }
          />
          {active_status === 1 ? t("notiPage.Ban") : t("notiPage.Unban")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          {t("notiPage.Edit")}
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={
          active_status === 1 ? t("notiPage.BanUser") : t("notiPage.UnBanUser")
        }
        content={
          active_status === 1
            ? t("accountListView.sureBan")
            : t("accountListView.sureUnban")
        }
        action={
          <Button
            variant="contained"
            color={active_status === 1 ? "error" : "info"}
            onClick={() => {
              onBanRow();
              confirm.onFalse();
            }}
          >
            {active_status === 1 ? t("notiPage.Ban") : t("notiPage.Unban")}
          </Button>
        }
      />
    </>
  );
}
