import Button from "@mui/material/Button";
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

import { format } from "date-fns";
import { INotification } from "@/types/notification";
import NotificationQuickCreateEditForm from "./notification-quick-create-edit-form";

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
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
  const { title, body, active_status, time, user } = row;

  const status = active_status === 0 ? "Disabled" : "Active";
  const dateFormatted = format(new Date(time), "HH:mm dd MMM yyyy");

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
          <Tooltip title="Quick Edit" placement="top" arrow>
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
          sx={{ color: "error.main" }}
        >
          <Iconify icon="solar:close-circle-bold" />
          Ban
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Ban User"
        content="Are you sure want to ban?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onBanRow();
              confirm.onFalse();
            }}
          >
            Ban
          </Button>
        }
      />
    </>
  );
}
