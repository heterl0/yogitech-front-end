import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Iconify from "@/components/iconify";
import Markdown from "@/components/markdown";
import { Avatar, AvatarGroup, Link, Tooltip } from "@mui/material";
import { IPose } from "@/types/pose";
import { LEVELS } from "@/constants/level";
import { useTranslation } from "react-i18next";
import { formatMuscles } from "./pose-new-edit-form";

// ----------------------------------------------------------------------

type Props = {
  pose: IPose;
};

export default function PoseDetailsContent({ pose }: Props) {
  const {
    name,
    level,
    calories,
    duration,
    keypoint_url,
    image_url,
    instruction,
  } = pose;

  let muscles = pose.muscles;
  muscles = formatMuscles(muscles);

  const { t } = useTranslation();

  const renderGallery = (
    <>
      <Box
        sx={{
          borderRadius: "12px",
          mb: 5,
          height: 480,
          overflow: "hidden",
          backgroundImage: `url(${image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>
    </>
  );

  const renderHead = (
    <>
      <Stack direction="row" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {name}
        </Typography>
      </Stack>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t("posePage.poseDetailsContent.muscles")}
      </Typography>
      <div className="border-primary-main flex w-fit flex-row rounded-md border p-2">
        <AvatarGroup max={5}>
          {muscles.map((muscle) => (
            <Tooltip title={muscle.name} key={muscle.id}>
              <Avatar
                alt={muscle.name}
                src={muscle.image}
                key={muscle.id}
                sx={{
                  backgroundColor: "white",
                }}
              />
            </Tooltip>
          ))}
        </AvatarGroup>
      </div>
    </>
  );

  const renderOverview = (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
      }}
    >
      {[
        {
          label: t("posePage.poseDetailsContent.level"),
          value: `${LEVELS[level - 1].label}`,
          icon: <Iconify icon="mingcute:filter-2-fill" />,
        },
        {
          label: t("posePage.poseDetailsContent.calories"),
          value: `${calories} kcal`,
          icon: <Iconify icon="solar:heart-bold" />,
        },
        {
          label: t("posePage.poseDetailsContent.duration"),
          value: `${duration}s`,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: t("posePage.poseDetailsContent.keypointJsonFile"),
          value: <Link href={keypoint_url}>{keypoint_url}</Link>,
          icon: <Iconify icon="solar:file-text-bold" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{
              typography: "body2",
              color: "text.secondary",
              mb: 0.5,
            }}
            secondaryTypographyProps={{
              typography: "subtitle2",
              color: "text.primary",
              component: "span",
              textOverflow: "ellipsis",
              maxWidth: "312px",
            }}
          />
        </Stack>
      ))}
    </Box>
  );

  const renderContent = (
    <>
      <Markdown>{instruction}</Markdown>
    </>
  );

  return (
    <>
      {renderGallery}

      <Stack sx={{ maxWidth: 720, mx: "auto" }}>
        {renderHead}

        <Divider sx={{ borderStyle: "dashed", my: 5 }} />

        {renderOverview}

        <Divider sx={{ borderStyle: "dashed", my: 5 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t("posePage.poseDetailsContent.instruction")}
        </Typography>

        {renderContent}
      </Stack>
    </>
  );
}
