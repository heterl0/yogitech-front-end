import { IPose } from "./pose";
import { IAccount } from "./user";

export type IPoseWithTime = {
  pose: IPose;
  time: number;
  duration: number;
};

export type IExercise = {
  id: number;
  title: string;
  image_url: string;
  video_url: string;
  durations: number;
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
  comments: IComment[];
};

export type IVote = {
  id: number;
  user: string;
  user_id: string;
  vote_value: number;
  comment: number;
};

export type IComment = {
  id: number;
  votes: IVote[];
  text: string;
  created_at: string;
  updated_at: string;
  active_status: number;
  parent_comment: number;
  user: IAccount;
  exercise: number;
};

export type IExerciseLog = {
  id: number;
  exercise: number;
  user: number;
  process: string;
  complete_pose: number;
  result: string;
  point: number;
  exp?: number;
  calories: string;
  exercise_pose_results: IExercisePoseResult[];
  total_time_finish?: number;
  created_at: string;
  updated_at: string;
  event?: number;
  active_status: number;
};

export type IExercisePoseResult = {
  pose: number;
  score: string;
  time_finish: number;
};

export type IExerciseFilters = {
  benefits: string[];
  status: number;
  level: number;
  is_premium: number;
};

export type ICommentTableFilters = {
  name: string;
  status: string[];
};

export type ICommentTableFilterValue = string | string[];

export type IExerciseFilterValue = number | string[] | null;
