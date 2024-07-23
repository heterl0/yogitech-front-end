// ----------------------------------------------------------------------

import { IAccount } from "./user";

export type IPostFilterValue = string;

export type IPostFilters = {
  publish: string;
};

// ----------------------------------------------------------------------

export type IPostHero = {
  title: string;
  coverUrl: string;
  createdAt?: Date;
  author?: {
    name: string;
    avatarUrl: string;
  };
};

export type IBlogVote = {
  id: number;
  user: string;
  user_id: string;
  blog: string;
  vote_value: number;
};

export type IBlog = {
  id: number;
  owner: IAccount;
  title: string;
  description: string;
  image_url: string;
  content: string;
  benefit: string;
  votes: IBlogVote[];
  created_at: string;
  updated_at: string;
  active_status: number;
};

export enum ActiveStatus {
  Active = 1,
  Disable = 0,
  Trash = 2,
}
