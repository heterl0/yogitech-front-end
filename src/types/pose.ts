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
  image_url: string;
  duration: number;
  calories: number;
  keypoint_url: string;
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
