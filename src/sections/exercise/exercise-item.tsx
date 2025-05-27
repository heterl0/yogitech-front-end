import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { fSeconds } from "@/utils/format-number";

import Iconify from "@/components/iconify";
import { LEVELS } from "@/constants/level";
import { IExercise } from "@/types/exercise";

import { useTranslation } from "react-i18next";
import { useGetAccount } from "@/api/account";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";

// ----------------------------------------------------------------------

type Props = {
  exercise: IExercise;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

export default function ExerciseItem({ exercise, onEdit }: Props) {
  const { id, title, image_url, durations, level, is_admin, owner } = exercise;
  const { t } = useTranslation();

  const { account } = useGetAccount(owner.toString());
  const router = useRouter();

  const onClickUserRouter = useCallback(() => {
    router.push(paths.dashboard.account.edit(account.id));
  }, [router, account]);

  const renderPrice = (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          top: 8,
          right: 8,
          zIndex: 9,
          borderRadius: 1,
          bgcolor: "primary.main",
          position: "absolute",
          p: "2px 6px 2px 4px",
          color: "common.white",
          typography: "subtitle2",
        }}
      >
        {fSeconds(durations)}
      </Stack>

      <Stack
        onClick={onClickUserRouter}
        direction="row"
        alignItems="center"
        sx={{
          top: 40,
          right: 8,
          zIndex: 9,
          borderRadius: 1,
          bgcolor: "primary.main",
          position: "absolute",
          p: "2px 6px 2px 4px",
          color: "common.white",
          typography: "subtitle2",
          cursor: "pointer",
        }}
      >
        {is_admin ? t("system") : account?.username}
      </Stack>
    </>
  );

  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: "relative" }}>
        {renderPrice}
        <Image
          alt={title}
          src={image_url || "/assets/background/overlay_3.webp"}
          width={320}
          height={164}
          className="aspect-video w-full rounded-sm bg-cover"
        />
      </Stack>
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      secondary={
        <Link
          component={RouterLink}
          href={paths.dashboard.exercise.details(id + "")}
          color="inherit"
        >
          {title}
        </Link>
      }
      primaryTypographyProps={{
        typography: "caption",
        color: "text.disabled",
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: "span",
        color: "text.primary",
        typography: "subtitle1",
      }}
    />
  );

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{
        position: "relative",
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      <IconButton
        onClick={() => onEdit()}
        sx={{ position: "absolute", bottom: 20, right: 8 }}
      >
        <Tooltip title={t("exercisePage.exerciseItem.edit")}>
          <Iconify icon="solar:pen-bold" />
        </Tooltip>
      </IconButton>

      {[
        {
          label: t("exercisePage.exerciseItem.level", {
            level: LEVELS[level - 1].label,
          }),
          icon: (
            <Iconify
              icon="mingcute:filter-2-fill"
              sx={{ color: "info.main" }}
            />
          ),
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: "body2" }}
        >
          {item.icon}
          {item.label}
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Card>
      {renderImages}
      {renderTexts}
      {renderInfo}
    </Card>
  );
}
