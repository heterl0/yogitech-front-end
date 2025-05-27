"use client";

import orderBy from "lodash/orderBy";
import { useState, useCallback } from "react";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useDebounce } from "@/hooks/use-debounce";

import { POST_SORT_OPTIONS } from "@/_mock";
import { useSearchPosts } from "@/api/blog";

import { useSettingsContext } from "@/components/settings";

import { IPost } from "@/types/blog";

import PostList from "../post-list";
import PostSort from "../post-sort";
import PostSearch from "../post-search";
import { useTranslation } from "react-i18next";
import MainLayout from "@/layouts/main";
import { paths } from "@/routes/paths";

// ----------------------------------------------------------------------
interface PostListHomeViewProps {
  posts: IPost[];
}

export default function PostListHomeView({ posts }: PostListHomeViewProps) {
  const settings = useSettingsContext();
  const { t } = useTranslation();

  const [sortBy, setSortBy] = useState("latest");

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery);

  const { searchResults, searchLoading } = useSearchPosts(debouncedQuery);

  const dataFiltered = applyFilter({
    inputData: posts,
    sortBy,
  });

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue: string) => {
    setSearchQuery(inputValue);
  }, []);

  return (
    <MainLayout>
      <Container
        maxWidth={settings.themeStretch ? false : "lg"}
        sx={{ mb: 10 }}
      >
        <Typography
          variant="h4"
          sx={{
            my: { xs: 3, md: 5 },
          }}
        >
          {t("blogPage.listHomeView.heading")}
        </Typography>

        <Stack
          spacing={3}
          justifyContent="space-between"
          alignItems={{ xs: "flex-end", sm: "center" }}
          direction={{ xs: "column", sm: "row" }}
          sx={{ mb: { xs: 3, md: 5 } }}
        >
          <PostSearch
            query={debouncedQuery}
            results={searchResults}
            onSearch={handleSearch}
            loading={searchLoading}
            hrefItem={(title: string) => paths.blog.detail(title)}
            useSlug
          />

          <PostSort
            sort={sortBy}
            onSort={handleSortBy}
            sortOptions={POST_SORT_OPTIONS}
          />
        </Stack>

        <PostList posts={dataFiltered} />
      </Container>
    </MainLayout>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  sortBy,
}: {
  inputData: IPost[];
  sortBy: string;
}) => {
  if (sortBy === "latest") {
    inputData = orderBy(inputData, ["created_at"], ["desc"]);
  }

  if (sortBy === "oldest") {
    inputData = orderBy(inputData, ["created_at"], ["asc"]);
  }

  if (sortBy === "popular") {
    interface IBlogWithSumVote extends IPost {
      sumVote: number;
    }

    const calculateSumVotes = (votes: { vote_value: number }[]) => {
      return votes.reduce((sum, vote) => sum + vote.vote_value, 0);
    };

    const addSumVotesToBlogs = (blogs: IPost[]): IBlogWithSumVote[] => {
      return blogs.map((blog) => ({
        ...blog,
        sumVote: calculateSumVotes(blog.votes),
      }));
    };
    const blogsWithSumVotes = addSumVotesToBlogs(inputData);

    // Sort by sumVote in descending order
    const sortedBlogsWithSumVotes = orderBy(
      blogsWithSumVotes,
      ["sumVote"],
      ["desc"]
    );

    // Strip out the sumVote property to return the array as IBlog[]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    inputData = sortedBlogsWithSumVotes.map(({ sumVote, ...blog }) => blog);
  }

  return inputData;
};
