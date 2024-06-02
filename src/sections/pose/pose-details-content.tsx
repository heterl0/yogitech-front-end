import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Iconify from "@/components/iconify";
import Markdown from "@/components/markdown";
import { Avatar, AvatarGroup, alpha, useTheme } from "@mui/material";
import { bgGradient } from "@/theme/css";
import { IPose } from "@/types/pose";
import { LEVELS } from "@/constants/level";
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
    muscles,
  } = pose;

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
          {name}
        </Typography>
      </Stack>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Muscles
      </Typography>
      <div className="flex flex-row">
        <AvatarGroup>
          {muscles.map((muscle) => (
            <Avatar
              alt={muscle.name}
              src={muscle.image}
              key={muscle.id}
              sx={{
                width: 24,
                height: 24,
              }}
            />
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
          value: `${duration}s`,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: "Keypoint .json file",
          value: `${keypoint_url}`,
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
          Instruction
        </Typography>

        {renderContent}
      </Stack>
    </>
  );
}
