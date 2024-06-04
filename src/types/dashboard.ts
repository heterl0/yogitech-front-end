import { IBlog } from "./blog";
import { IPose } from "@/types/pose";
import { IEvent } from "@/types/event";
import { IExercise } from "@/types/exercise";
import { IAccount } from "./user";
export type IRecentActivity = {
  type: string;
  data: IAccount | IBlog | IPose | IExercise | IEvent;
};

export type IDashboardOverview = {
  total_users: number;
  active_users: number;
  total_events: number;
  upcoming_events: number;
  total_poses: number;
  total_exercises: number;
  notifications_sent: number;
  user_growth: number;
  event_participation: number;
  recent_notifications: number;
};

export type IEventGrowth = {
  labels: number[];
  values: number[];
};

export type IUserGrowth = {
  labels: number[];
  values: number[];
};

export function getMonthLabel(month: number) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month - 1];
}
