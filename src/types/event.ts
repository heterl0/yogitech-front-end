import { IExercise } from "./exercise";

export type IEvent = {
  id: number;
  title: string;
  image_url: string;
  status: number;
  start_date: string;
  expire_date: string;
  description: string;
  active_status: number;
  exercise: IExercise[];
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
