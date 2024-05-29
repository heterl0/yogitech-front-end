import { IPose } from "./pose";

export type IPoseWithTime = {
  pose: IPose;
  time: number;
  duration: number;
};

export type IExercise = {
  id: number;
  title: string;
  image: string;
  duration: number;
  level: number;
  benefit: string;
  description: string;
  calories: string;
  number_poses: number;
  point: number;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
  owner: null;
  active_status: number;
  poses: IPoseWithTime[];
};

export type IExerciseFilters = {
  benefits: string[];
  status: number;
  level: number;
  is_premium: number;
};

export type IExerciseFilterValue = number | string[] | null;

export const EXERCISE_SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
];
