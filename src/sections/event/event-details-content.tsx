import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { fDate } from "@/utils/format-time";
import Iconify from "@/components/iconify";
import Markdown from "@/components/markdown";
import { IEvent } from "@/types/event";
import { alpha, useTheme } from "@mui/material";
import { bgGradient } from "@/theme/css";
// ----------------------------------------------------------------------

type Props = {
  event: IEvent;
};

export default function EventDetailsContent({ event }: Props) {
  const { title, image_url, start_date, expire_date, description } = event;

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

      <Stack spacing={3} direction="row" flexWrap="wrap" alignItems="center">
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ typography: "subtitle2" }}
        >
          <Iconify icon="solar:flag-bold" sx={{ color: "info.main" }} />
          <Box
            component="span"
            sx={{ typography: "body2", color: "text.secondary" }}
          >
            Created by
          </Box>
        </Stack>
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
          label: "Available",
          value: `${fDate(start_date)} - ${fDate(expire_date)}`,
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        // {
        //   label: "Number of people",
        //   value: tourGuides
        //     .map((tourGuide) => tourGuide.phoneNumber)
        //     .join(", "),
        //   icon: <Iconify icon="solar:user-rounded-bold" />,
        // },
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
      <Markdown>{description}</Markdown>
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

        {renderContent}
      </Stack>
    </>
  );
}
