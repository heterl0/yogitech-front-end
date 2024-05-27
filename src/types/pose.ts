export type IMuscle = {
  id: number;
  name: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
  active_status: number;
};

export type IPose = {
  id: number;
  muscles: IMuscle[];
  name: string;
  image: string;
  duration: number;
  calories: string;
  keypoint: string;
  instruction: string;
  created_at: string;
  updated_at: string;
  active_status: number;
  level: number;
};

export type IPoseFilters = {
  muscles: IMuscle[];
  status: number;
  level: number;
};

export type IPoseFilterValue = number | IMuscle[] | null;

export const POSE_SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
];
