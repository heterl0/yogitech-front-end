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
  author?: IAccount;
};

export type IPostVote = {
  id: number;
  user: string;
  user_id: string;
  blog: string;
  vote_value: number;
};

export type IPost = {
  id: number;
  owner: IAccount;
  title: string;
  description: string;
  image_url: string;
  content: string;
  benefit: string;
  votes: IPostVote[];
  created_at: string;
  updated_at: string;
  active_status: number;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  slug: string;
  url: string;
  excerpt: string;
};

export enum ActiveStatus {
  Active = 1,
  Disable = 0,
  Trash = 2,
}
