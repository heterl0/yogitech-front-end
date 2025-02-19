import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { fSeconds } from "@/utils/format-number";

import Iconify from "@/components/iconify";
import { IPose } from "@/types/pose";
import { LEVELS } from "@/constants/level";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import Image from "next/image";

// ----------------------------------------------------------------------

type Props = {
  pose: IPose;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

export default function PoseItem({ pose, onEdit }: Props) {
  const { id, name, image_url, duration, level } = pose;
  const { t } = useTranslation();

  const renderPrice = (
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
      {fSeconds(duration)}
    </Stack>
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
          alt={image_url}
          src={image_url}
          height={144}
          width={320}
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
          href={paths.dashboard.pose.details(id + "")}
          color="inherit"
        >
          {name}
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
        <Tooltip title={t("posePage.poseItem.edit")}>
          <Iconify icon="solar:pen-bold" />
        </Tooltip>
      </IconButton>

      {[
        {
          label: `${t("posePage.poseItem.level")}${LEVELS[level - 1].label}`,
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
