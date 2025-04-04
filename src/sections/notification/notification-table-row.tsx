import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";
import { useBoolean } from "@/hooks/use-boolean";

import Label from "@/components/label";
import Iconify from "@/components/iconify";
import { ConfirmDialog } from "@/components/custom-dialog";
import CustomPopover, { usePopover } from "@/components/custom-popover";

import { format } from "date-fns";
import { INotification } from "@/types/notification";
import NotificationQuickCreateEditForm from "./notification-quick-create-edit-form";
import { useLocales } from "@/locales";

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: (data: INotification, isCreated: boolean) => void;
  row: INotification;
  onSelectRow: VoidFunction;
  onBanRow: VoidFunction;
};

export default function NotificationTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onBanRow,
}: Props) {
  const { t } = useTranslation();
  const { title, body, active_status, time, user } = row;
  const { currentLang } = useLocales();
  const status = active_status === 0 ? "Disabled" : "Active";
  const dateFormatted = format(new Date(time), "HH:mm dd MMM yyyy", {
    locale: currentLang.adapterLocale,
  });

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
          <ListItemText
            primary={title}
            secondary={body}
            primaryTypographyProps={{ typography: "body2" }}
            secondaryTypographyProps={{
              component: "span",
              color: "text.disabled",
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>{dateFormatted}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>{user}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={(status === "Active" && "success") || "default"}
          >
            {status}
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

      {row && (
        <NotificationQuickCreateEditForm
          currentNotification={row}
          open={quickEdit.value}
          onClose={quickEdit.onFalse}
          onMutate={onEditRow}
        />
      )}

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
          sx={{ color: active_status === 1 ? "error.main" : "primary.main" }}
        >
          <Iconify icon="solar:close-circle-bold" />
          {active_status === 0 ? t("notiPage.Enable") : t("notiPage.Disable")}
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={
          active_status === 1
            ? t("notiPage.DisableNotification")
            : t("notiPage.EnableNotification")
        }
        content={
          active_status === 1 ? t("notiPage.Areyou") : t("notiPage.Areyou2")
        }
        action={
          <Button
            variant="contained"
            color={active_status === 1 ? "error" : "primary"}
            onClick={() => {
              onBanRow();
              confirm.onFalse();
            }}
          >
            {active_status === 1 ? t("notiPage.Disable") : t("notiPage.Enable")}
          </Button>
        }
      />
    </>
  );
}
