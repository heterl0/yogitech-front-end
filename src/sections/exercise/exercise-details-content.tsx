import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Iconify from "@/components/iconify";
import Markdown from "@/components/markdown";
import { Link } from "@mui/material";
import { LEVELS } from "@/constants/level";
import { IExercise } from "@/types/exercise";
import Label from "@/components/label";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

type Props = {
  exercise: IExercise;
};

export default function ExerciseDetailsContent({ exercise }: Props) {
  const { t } = useTranslation();
  const {
    title,
    level,
    calories,
    durations,
    video_url,
    image_url,
    description,
    point,
    benefit,
    is_premium,
    poses,
  } = exercise;

  const renderGallery = (
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
  );

  const renderHead = (
    <Stack direction="row" sx={{ mb: 3 }}>
      <Typography variant="h4" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
    </Stack>
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
          label: t("exercisePage.exerciseDetailsContent.level"),
          value: `${LEVELS[level].label}`,
          icon: <Iconify icon="mingcute:filter-2-fill" />,
        },
        {
          label: t("exercisePage.exerciseDetailsContent.calories"),
          value: `${calories} kcal`,
          icon: <Iconify icon="solar:heart-bold" />,
        },
        {
          label: t("exercisePage.exerciseDetailsContent.duration"),
          value: `${durations}s`,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: t("exercisePage.exerciseDetailsContent.listOfPoses"),
          value: `${poses.map((pose) => pose.pose.name).join(", ")}`,
          icon: <Iconify icon="solar:bill-list-bold" />,
        },
        {
          label: t("exercisePage.exerciseDetailsContent.point"),
          value: `${point}`,
          icon: <Iconify icon="eva:info-fill" />,
        },
        {
          label: t("exercisePage.exerciseDetailsContent.videoUrl"),
          value: <Link href={video_url}>{video_url}</Link>,
          icon: <Iconify icon="solar:gallery-wide-bold" />,
        },
        {
          label: t("exercisePage.exerciseDetailsContent.premium"),
          value: `${is_premium ? t("exercisePage.exerciseDetailsContent.yes") : t("exercisePage.exerciseDetailsContent.no")}`,
          icon: <Iconify icon="solar:lock-bold" />,
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
              textOverflow: "ellipsis",
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

  const renderContent = <Markdown>{description}</Markdown>;

  const renderBenefit = (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t("exercisePage.exerciseDetailsContent.benefit")}
      </Typography>
      <Stack spacing={1} sx={{ mb: 2 }} flexDirection={"row"} flexWrap={"wrap"}>
        {JSON.parse(benefit).map((item: string, index: number) => (
          <Label key={index} variant="outlined" color="info">
            {item}
          </Label>
        ))}
      </Stack>
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

        {renderBenefit}

        <Typography variant="h6" sx={{ mb: 2 }}>
          {t("exercisePage.exerciseDetailsContent.description")}
        </Typography>

        {renderContent}
      </Stack>
    </>
  );
}
