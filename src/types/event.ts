import { LabelColor } from "@/components/label";
import { IExercise } from "./exercise";
import { IAccount } from "./user";

export type IEvent = {
  id: number;
  title: string;
  image_url: string;
  status: number;
  start_date: string;
  expire_date: string;
  description: string;
  active_status: number;
  exercises: IExercise[];
  event_candidate: ICandidateEvent[];
  owner: IAccount;
};

export type ICandidateEvent = {
  id: number;
  user: IAccount;
  event_point: number;
  active_status: number;
  join_at: string;
  updated_at: string;
  event: number;
};

export type IEventFilters = {
  status: number;
  startDate: Date | null;
  endDate: Date | null;
};

export type IEventFilterValue = number | Date | null;

export const EVENT_SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
];

export const EVENT_STATUS = [
  { label: "Inactive", color: "default" as LabelColor, value: 0 },
  { label: "Not Start", color: "success" as LabelColor, value: 1 },
  { label: "In Progress", color: "warning" as LabelColor, value: 2 },
  { label: "Ended", color: "error" as LabelColor, value: 3 },
];

export function getStatusLabel(status: number, active_status?: number): string {
  if (active_status !== undefined) {
    if (active_status === 1) {
      if (status === 0) {
        return "Not start";
      } else if (status === 1) {
        return "In Progress";
      } else {
        return "Ended";
      }
    } else {
      return "Inactive";
    }
  } else {
    if (status === 0) {
      return "Not start";
    } else if (status === 1) {
      return "In Progress";
    } else {
      return "Ended";
    }
  }
}

export const EVENT_DETAILS_TABS = [
  { value: "detail", label: "Event Detail" },
  { value: "ranking", label: "Ranking" },
];
