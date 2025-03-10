"use client";

import orderBy from "lodash/orderBy";
import { useState, useCallback } from "react";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useDebounce } from "@/hooks/use-debounce";

import { POST_SORT_OPTIONS } from "@/_mock";
import { useGetPosts, useSearchPosts } from "@/api/blog";

import { useSettingsContext } from "@/components/settings";

import { IPost } from "@/types/blog";

import PostList from "../post-list";
import PostSort from "../post-sort";
import PostSearch from "../post-search";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function PostListHomeView() {
  const settings = useSettingsContext();
  const { t } = useTranslation();

  const [sortBy, setSortBy] = useState("latest");

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery);

  const { posts, postsLoading } = useGetPosts();

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
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
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
          hrefItem={() => "#"}
          // hrefItem={(title: string) => paths.post.details(title)}
        />

        <PostSort
          sort={sortBy}
          onSort={handleSortBy}
          sortOptions={POST_SORT_OPTIONS}
        />
      </Stack>

      <PostList posts={dataFiltered} loading={postsLoading} />
    </Container>
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
    return orderBy(inputData, ["createdAt"], ["desc"]);
  }

  if (sortBy === "oldest") {
    return orderBy(inputData, ["createdAt"], ["asc"]);
  }

  if (sortBy === "popular") {
    return orderBy(inputData, ["totalViews"], ["desc"]);
  }

  return inputData;
};
