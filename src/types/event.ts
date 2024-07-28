import { LabelColor } from "@/components/label";
import { IExercise } from "./exercise";
import { IAccount, ISocialProfile } from "./user";

export type IEvent = {
  id: number;
  title: string;
  image_url: string;
  start_date: string;
  expire_date: string;
  description: string;
  active_status: number;
  exercises: IExercise[];
  event_candidate: ICandidateEvent[];
  owner: IAccount;
  created_at: string;
};

export type ICandidateEvent = {
  id: number;
  user: number;
  profile: ISocialProfile;
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

export const EVENT_STATUS = [
  { label: "Inactive", color: "default" as LabelColor, value: 0 },
  { label: "Not Start", color: "success" as LabelColor, value: 1 },
  { label: "In Progress", color: "warning" as LabelColor, value: 2 },
  { label: "Ended", color: "error" as LabelColor, value: 3 },
];

export function getStatusLabel(
  active_status: number,
  startDate: string,
  endDate: string
): string {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  const status = now < start ? 0 : now > end ? 3 : 1;
  if (active_status === 1) {
    if (status === 0) {
      return "notStart";
    } else if (status === 1) {
      return "inProgress";
    } else {
      return "completed";
    }
  } else {
    return "inactive";
  }
}
