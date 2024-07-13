import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import { useBoolean } from "@/hooks/use-boolean";
import Label from "@/components/label";
import Iconify from "@/components/iconify";
import { ConfirmDialog } from "@/components/custom-dialog";
import { IComment } from "@/types/exercise";
import { fDateTime } from "@/utils/format-time";
import ExerciseCommentQuickCreateEditForm from "./exercise-details-comments-quick-create-edit-form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocales } from "@/locales";

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: (data: { active_status: number; text: string }) => void;
  row: IComment;
  onSelectRow: VoidFunction;
  onBanRow: VoidFunction;
  onActiveRow: VoidFunction;
  onCreate: (text: string) => void;
};

export default function ExerciseCommentTableRow({
  row,
  selected,
  onSelectRow,
  onBanRow,
  onActiveRow,
  onCreate,
  onEditRow,
}: Props) {
  const { created_at, text, active_status, user, votes } = row;
  const { t } = useTranslation();
  const { currentLang } = useLocales();

  const [status, setStatus] = useState(
    active_status === 0 ? "Disabled" : "Active"
  );

  useEffect(() => {
    setStatus(active_status === 0 ? "Disabled" : "Active");
  }, [row]);

  // const dateFormatted = format(new Date(time), "HH:mm dd MMM yyyy");

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const quickCreate = useBoolean();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell sx={{ display: "flex", alignItems: "center" }}>
          <ListItemText
            primary={user.username}
            secondary={text}
            primaryTypographyProps={{ typography: "body2" }}
            secondaryTypographyProps={{
              component: "span",
              color: "text.disabled",
            }}
          />
        </TableCell>
        <TableCell>{votes.length}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>
          {fDateTime(new Date(created_at), currentLang.adapterLocale)}
        </TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={(status === "Active" && "success") || "default"}
          >
            {status}
          </Label>
        </TableCell>
        <TableCell align="right" sx={{ px: 1, whiteSpace: "nowrap" }}>
          <Tooltip
            title={t("exercisePage.exerciseCommentListView.tableRow.quickEdit")}
            placement="top"
            arrow
          >
            <IconButton
              color={quickEdit.value ? "inherit" : "default"}
              onClick={quickEdit.onTrue}
            >
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={
              active_status === 1
                ? t("exercisePage.exerciseCommentListView.tableRow.ban")
                : t("exercisePage.exerciseCommentListView.tableRow.active")
            }
            placement="top"
            arrow
          >
            <IconButton
              color={active_status === 1 ? "error" : "primary"}
              onClick={confirm.onTrue}
            >
              {active_status === 1 ? (
                <Iconify icon="solar:close-circle-bold" />
              ) : (
                <Iconify icon="solar:check-circle-bold" />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip
            title={t("exercisePage.exerciseCommentListView.tableRow.response")}
            placement="top"
            arrow
          >
            <IconButton onClick={quickCreate.onTrue}>
              <Iconify icon="solar:chat-square-arrow-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      {row && (
        <ExerciseCommentQuickCreateEditForm
          currentComment={row}
          open={quickEdit.value}
          onClose={quickEdit.onFalse}
          onEditRow={onEditRow}
        />
      )}

      <ExerciseCommentQuickCreateEditForm
        open={quickCreate.value}
        onClose={quickCreate.onFalse}
        onCreate={onCreate}
      />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={
          active_status === 1
            ? t("exercisePage.exerciseCommentListView.tableRow.confirmBanTitle")
            : t(
                "exercisePage.exerciseCommentListView.tableRow.confirmActiveTitle"
              )
        }
        content={
          active_status === 1
            ? t(
                "exercisePage.exerciseCommentListView.tableRow.confirmBanContent"
              )
            : t(
                "exercisePage.exerciseCommentListView.tableRow.confirmActiveContent"
              )
        }
        action={
          <Button
            variant="contained"
            color={active_status === 1 ? "error" : "primary"}
            onClick={() => {
              if (active_status === 1) {
                onBanRow();
              } else {
                onActiveRow();
              }
              confirm.onFalse();
            }}
          >
            {active_status === 1
              ? t("exercisePage.exerciseCommentListView.tableRow.ban")
              : t("exercisePage.exerciseCommentListView.tableRow.active")}
          </Button>
        }
      />
    </>
  );
}
