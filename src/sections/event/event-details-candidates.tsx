import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

import Iconify from "@/components/iconify";

import { ICandidateEvent } from "@/types/event";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
  candidates: ICandidateEvent[];
};

export default function EventDetailsCandidates({ candidates }: Props) {
  // const [approved, setApproved] = useState<string[]>([]);

  // const handleClick = useCallback(
  //   (item: string) => {
  //     const selected = approved.includes(item)
  //       ? approved.filter((value) => value !== item)
  //       : [...approved, item];

  //     setApproved(selected);
  //   },
  //   [approved]
  // );

  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      }}
    >
      {candidates
        .sort((a, b) => b.event_point - a.event_point)
        .map((candidate, index) => (
          <CandidateItem
            key={candidate.id}
            candidate={candidate}
            ranking={index}
          />
        ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

type BookerItemProps = {
  candidate: ICandidateEvent;
  ranking: number;
};

function CandidateItem({ candidate, ranking }: BookerItemProps) {
  const { t } = useTranslation();
  const getRankingLabelByIndex = (index: number): JSX.Element => {
    switch (index) {
      case 0:
        return (
          <span className="text-2xl font-bold text-primary-main">
            {t("eventPage.eventDetails.candidates.firstPlace")}
          </span>
        );
      case 1:
        return (
          <span className="text-2xl font-bold text-secondary-main">
            {t("eventPage.eventDetails.candidates.secondPlace")}
          </span>
        );
      case 2:
        return (
          <span className="text-disabled text-2xl font-bold">
            {t("eventPage.eventDetails.candidates.thirdPlace")}
          </span>
        );
      default:
        return (
          <span className="text-disabled text-2xl font-bold">
            {t("eventPage.eventDetails.candidates.otherPlace", {
              place: index + 1,
            })}
          </span>
        );
    }
  };

  return (
    <Stack
      component={Card}
      direction="row"
      spacing={2}
      key={candidate.id}
      sx={{ p: 3 }}
    >
      <Avatar
        alt={candidate.user.username}
        src={candidate.user.profile.avatar_url || candidate.user.username}
        sx={{ width: 48, height: 48 }}
      />
      <Stack spacing={2} flexGrow={1}>
        <ListItemText
          primary={`${candidate.user.username}`}
          secondary={
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Iconify icon="mingcute:flash-fill" width={16} />
              {candidate.event_point}{" "}
              {t("eventPage.eventDetails.candidates.points")}
            </Stack>
          }
          secondaryTypographyProps={{
            mt: 0.5,
            component: "span",
            typography: "caption",
            color: "text.disabled",
          }}
        />

        {/* <Stack spacing={1} direction="row">
          <IconButton
            size="small"
            color="error"
            sx={{
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
              },
            }}
          >
            <Iconify width={18} icon="solar:phone-bold" />
          </IconButton>

          <IconButton
            size="small"
            color="info"
            sx={{
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.info.main, 0.16),
              },
            }}
          >
            <Iconify width={18} icon="solar:chat-round-dots-bold" />
          </IconButton>

          <IconButton
            size="small"
            color="primary"
            sx={{
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
              },
            }}
          >
            <Iconify width={18} icon="fluent:mail-24-filled" />
          </IconButton>
        </Stack> */}
      </Stack>
      {/* <Button
        size="small"
        variant={selected ? "text" : "outlined"}
        color={selected ? "success" : "inherit"}
        startIcon={
          selected ? (
            <Iconify width={18} icon="eva:checkmark-fill" sx={{ mr: -0.75 }} />
          ) : null
        }
        onClick={onSelected}
      >
        {selected ? "Approved" : "Approve"}
      </Button> */}
      {getRankingLabelByIndex(ranking)}
    </Stack>
  );
}
