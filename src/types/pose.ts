export type Muscle = {
  id: number;
  name: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
  active_status: number;
};

export type Pose = {
  id: number;
  muscles: Muscle[];
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
