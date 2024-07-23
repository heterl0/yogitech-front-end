export type IUserTableFilterValue = string | string[];

export type IUserTableFilters = {
  name: string;
  role: string[];
  status: string;
};

export type IProfile = {
  id: number;
  user: string;
  first_name: string;
  last_name: string;
  point: number;
  exp: number;
  streak: number;
  avatar_url: null | string;
  gender: number;
  birthdate: null | string;
  height: null | number;
  weight: null | number;
  bmi: null | number;
  created_at: string;
  updated_at: string;
  active_status: number;
  level: null | number;
};

export type IFollowing = {
  id: number;
  follower: number;
  followed: number;
};

export type IAccount = {
  id: number;
  username: string;
  email: string;
  phone: string;
  is_active: boolean;
  is_staff: boolean;
  is_premium: boolean;
  active_status: number;
  auth_provider: string;
  profile: IProfile;
  following: IFollowing[];
  followers: IFollowing[];
  last_login: null | string;
  created_at: string;
};

export type ISocialProfile = {
  user_id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  streak: number;
  avatar?: string;
  exp: number;
  level: number;
};
