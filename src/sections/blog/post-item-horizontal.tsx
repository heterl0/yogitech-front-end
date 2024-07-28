import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { useResponsive } from "@/hooks/use-responsive";

import { fDate } from "@/utils/format-time";

import Label from "@/components/label";
import Image from "@/components/image";
import Iconify from "@/components/iconify";
import TextMaxLine from "@/components/text-max-line";
import CustomPopover, { usePopover } from "@/components/custom-popover";

import { IBlog } from "@/types/blog";
import { useCallback, useMemo } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useBoolean } from "@/hooks/use-boolean";
import axiosInstance, { endpoints } from "@/utils/axios";
import { useSnackbar } from "notistack";
import { HttpStatusCode } from "axios";
import { useLocales } from "@/locales";

// ----------------------------------------------------------------------

type Props = {
  post: IBlog;
  deleteMutate: (id: number) => void;
};

export default function PostItemHorizontal({ post, deleteMutate }: Props) {
  const { t } = useTranslation();

  const popover = usePopover();

  const router = useRouter();

  const smUp = useResponsive("up", "sm");

  const { enqueueSnackbar } = useSnackbar();

  const dialog = useBoolean();

  const { currentLang } = useLocales();

  const {
    id,
    title,
    image_url,
    description,
    active_status,
    created_at,
    owner,
    votes,
  } = post;

  const vote: { down: number; up: number } = useMemo(() => {
    const vote: { down: number; up: number } = { down: 0, up: 0 };
    votes.forEach((item) => {
      item.vote_value === 1
        ? (vote.up = vote.up + 1)
        : (vote.down = vote.down + 1);
    });
    return vote;
  }, [votes]);

  const handleDelete = useCallback(async () => {
    const response = await axiosInstance.patch(
      `${endpoints.post.delete}${id}/`,
      { active_status: 2 }
    );
    deleteMutate(id);

    if (response.status === HttpStatusCode.Ok) {
      enqueueSnackbar(t("blogPage.deleteSuccess"));
      dialog.onFalse();
    } else {
      enqueueSnackbar(t("blogPage.deleteFail"), { variant: "error" });
      dialog.onFalse();
    }
    router.push(paths.dashboard.blog.root);
  }, [dialog, enqueueSnackbar, id, router]);

  return (
    <>
      <Stack
        component={Card}
        direction="row"
        justifyContent="space-between"
        width={"100%"}
      >
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
          }}
          width={"100%"}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Label
              variant="soft"
              color={
                (active_status === 1
                  ? "info"
                  : active_status === 2
                    ? "error"
                    : "default") || "default"
              }
            >
              {t(
                `blogPage.postItemHorizontal.${
                  active_status === 1
                    ? "published"
                    : active_status === 0
                      ? "draft"
                      : "trash"
                }`
              )}
            </Label>

            <Box
              component="span"
              sx={{ typography: "caption", color: "text.disabled" }}
            >
              {fDate(created_at, currentLang.adapterLocale)}
            </Box>
          </Stack>

          <Stack spacing={1} flexGrow={1}>
            <Link
              color="inherit"
              component={RouterLink}
              href={paths.dashboard.blog.details(id + "")}
            >
              <TextMaxLine variant="subtitle2" line={2}>
                {title}
              </TextMaxLine>
            </Link>

            <TextMaxLine variant="body2" sx={{ color: "text.secondary" }}>
              {description}
            </TextMaxLine>
          </Stack>

          <Stack direction="row" alignItems="center">
            <IconButton
              color={popover.open ? "inherit" : "default"}
              onClick={popover.onOpen}
            >
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>

            <Stack
              spacing={1.5}
              flexGrow={1}
              direction="row"
              flexWrap="wrap"
              justifyContent="flex-end"
              sx={{
                typography: "caption",
                color: "text.disabled",
              }}
            >
              <Stack direction="row" alignItems="center">
                <Iconify icon="solar:like-bold" width={16} sx={{ mr: 0.5 }} />
                {vote.up}
              </Stack>

              <Stack direction="row" alignItems="center">
                <Iconify
                  icon="solar:dislike-bold"
                  width={16}
                  sx={{ mr: 0.5 }}
                />
                {vote.down}
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {smUp && (
          <Box
            sx={{
              width: 180,
              height: 240,
              position: "relative",
              flexShrink: 0,
              p: 1,
            }}
          >
            <Avatar
              alt={owner.username}
              src={owner.profile.avatar_url || ""}
              sx={{ position: "absolute", top: 16, right: 16, zIndex: 9 }}
            />
            <Image
              alt={title}
              src={image_url}
              sx={{ height: 1, borderRadius: 1.5 }}
            />
          </Box>
        )}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="bottom-center"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard.blog.details(id + ""));
          }}
        >
          <Iconify icon="solar:eye-bold" />
          {t("blogPage.postItemHorizontal.view")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard.blog.edit(id + ""));
          }}
        >
          <Iconify icon="solar:pen-bold" />
          {t("blogPage.postItemHorizontal.edit")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            dialog.onTrue();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          {t("blogPage.postItemHorizontal.delete")}
        </MenuItem>
      </CustomPopover>
      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle color={"error"}>
          {t("blogPage.postItemHorizontal.deleteDialogTitle")}
        </DialogTitle>
        <DialogContent sx={{ color: "text.secondary" }}>
          {t("blogPage.postItemHorizontal.deleteDialogContent")}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={dialog.onFalse}>
            {t("blogPage.postItemHorizontal.cancel")}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            autoFocus
          >
            {t("blogPage.postItemHorizontal.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
