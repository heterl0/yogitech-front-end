import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Iconify from "@/components/iconify";
import Markdown from "@/components/markdown";
import { Link, alpha, useTheme } from "@mui/material";
import { bgGradient } from "@/theme/css";
import { LEVELS } from "@/constants/level";
import { IExercise } from "@/types/exercise";
import Label from "@/components/label";
// ----------------------------------------------------------------------

type Props = {
  exercise: IExercise;
};

export default function ExerciseDetailsContent({ exercise }: Props) {
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

  const theme = useTheme();

  const renderGallery = (
    <>
      <Box
        sx={{
          borderRadius: "12px",
          mb: 5,
          height: 480,
          overflow: "hidden",
          ...bgGradient({
            imgUrl: image_url,
            startColor: `${alpha(theme.palette.grey[900], 0.64)} 0%`,
            endColor: `${alpha(theme.palette.grey[900], 0.64)} 100%`,
          }),
        }}
      ></Box>
    </>
  );

  const renderHead = (
    <>
      <Stack direction="row" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Stack>
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
          label: "Level",
          value: `${LEVELS[level].label}`,
          icon: <Iconify icon="mingcute:filter-2-fill" />,
        },
        {
          label: "Calories",
          value: `${calories} kcal`,
          icon: <Iconify icon="solar:heart-bold" />,
        },
        {
          label: "Duration",
          value: `${durations}s`,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: "List of poses",
          value: `${poses.map((pose) => pose.pose.name).join(", ")}`,
          icon: <Iconify icon="solar:bill-list-bold" />,
        },
        {
          label: "Point",
          value: `${point}`,
          icon: <Iconify icon="eva:info-fill" />,
        },
        {
          label: "Video URL",
          value: <Link href={video_url}>{video_url}</Link>,
          icon: <Iconify icon="solar:gallery-wide-bold" />,
        },
        {
          label: "Premium?",
          value: `${is_premium ? "Yes" : "No"}`,
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

  const renderContent = (
    <>
      <Markdown>{description}</Markdown>
    </>
  );

  const renderBenefit = (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Benefit
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
          Description
        </Typography>

        {renderContent}
      </Stack>
    </>
  );
}
