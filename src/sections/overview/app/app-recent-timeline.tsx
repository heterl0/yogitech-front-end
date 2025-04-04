import Timeline from "@mui/lab/Timeline";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Card, { CardProps } from "@mui/material/Card";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";

import { fDateTime } from "@/utils/format-time";
import { IRecentActivity } from "@/types/dashboard";
import { paths } from "@/routes/paths";
import { Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocales } from "@/locales";

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: IRecentActivity[];
}

export default function AppRecentTimeline({
  title,
  subheader,
  list,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list.map((item, index) => (
          <RecentItem
            key={index}
            item={item}
            lastTimeline={index === list.length - 1}
          />
        ))}
      </Timeline>
    </Card>
  );
}

// ----------------------------------------------------------------------

type RecentItemProps = {
  item: IRecentActivity;
  lastTimeline: boolean;
};

function RecentItem({ item, lastTimeline }: RecentItemProps) {
  const { type, data } = item;
  const { t } = useTranslation();
  const { currentLang } = useLocales();

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === "account" && "primary") ||
            (type === "event" && "success") ||
            (type === "pose" && "info") ||
            (type === "exercise" && "warning") ||
            "error"
          }
        />
        {lastTimeline ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        {/* {"username" in data  ? (<Typography variant="subtitle2">{type}</Typography>)} */}
        {"title" in data && (
          <Typography variant="subtitle2">
            {t("dashboard.timeline.new")} {t(`dashboard.timeline.${type}`)}{" "}
            {t("dashboard.timeline.added")}
            {` `}
            <Link href={`${paths.dashboard.item(type)}/${data.id}`}>
              {data.title}
            </Link>
          </Typography>
        )}
        {"username" in data && (
          <Typography variant="subtitle2">
            {t("dashboard.timeline.welcome")}{" "}
            <Link href={`${paths.dashboard.item(type)}/${data.id}/edit`}>
              {data.username}
            </Link>{" "}
            {t("dashboard.timeline.toThePlatform")}
          </Typography>
        )}
        {"name" in data && type === "pose" && (
          <Typography variant="subtitle2">
            {t("dashboard.timeline.newPoseAdded")}
            {` `}
            <Link href={`${paths.dashboard.item(type)}/${data.id}`}>
              {data.name}
            </Link>
          </Typography>
        )}
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {fDateTime(data.created_at, currentLang.adapterLocale)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
