// ----------------------------------------------------------------------

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

export type IPostComment = {
  id: string;
  name: string;
  avatarUrl: string;
  message: string;
  postedAt: Date;
  users: {
    id: string;
    name: string;
    avatarUrl: string;
  }[];
  replyComment: {
    id: string;
    userId: string;
    message: string;
    postedAt: Date;
    tagUser?: string;
  }[];
};

export type IPostItem = {
  id: string;
  title: string;
  tags: string[];
  publish: string;
  content: string;
  image_url: string;
  metaTitle: string;
  totalViews: number;
  totalShares: number;
  description: string;
  totalComments: number;
  totalFavorites: number;
  metaKeywords: string[];
  metaDescription: string;
  comments: IPostComment[];
  createdAt: Date;
  favoritePerson: {
    name: string;
    avatarUrl: string;
  }[];
  author: {
    name: string;
    avatarUrl: string;
  };
};

export type IBlogVote = {
  id: number;
  user: string;
  blog: string;
  vote_value: number;
};

export type IBlog = {
  id: number;
  owner: string;
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
