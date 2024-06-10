"use client";

import orderBy from "lodash/orderBy";
import { useState, useCallback } from "react";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { useDebounce } from "@/hooks/use-debounce";

import { useGetPosts, useSearchPosts } from "@/api/blog";

import Label from "@/components/label";
import Iconify from "@/components/iconify";
import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";

import { IBlog, ActiveStatus } from "@/types/blog";

import PostSort from "../post-sort";
import PostSearch from "../post-search";
import PostListHorizontal from "../post-list-horizontal";
import { useTranslation } from "react-i18next";
// import { flatMap } from "lodash";

// ----------------------------------------------------------------------

export default function PostListView() {
  const settings = useSettingsContext();

  const [sortBy, setSortBy] = useState("latest");

  const [filter, setFilter] = useState(-1);

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery);

  const { posts } = useGetPosts();

  const { searchResults, searchLoading } = useSearchPosts(debouncedQuery);

  const dataFiltered = applyFilter({
    inputData: posts,
    filter,
    sortBy,
  });
  const { t } = useTranslation();

  const POST_SORT_OPTIONS = [
    { value: "latest", label: t("sort.latest") },
    { value: "oldest", label: t("sort.oldest") },
    { value: "popular", label: t("sort.popular") },
  ];

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue: string) => {
    setSearchQuery(inputValue);
  }, []);

  const handleFilterPublish = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setFilter(newValue);
    },
    []
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("blogPage.listView.heading")}
        links={[
          {
            name: t("blogPage.listView.breadcrumb.dashboard"),
            href: paths.dashboard.root,
          },
          {
            name: t("blogPage.listView.breadcrumb.blog"),
            href: paths.dashboard.blog.root,
          },
          { name: t("blogPage.listView.breadcrumb.list") },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.blog.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            {t("blogPage.listView.button.newPost")}
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: "flex-end", sm: "center" }}
        direction={{ xs: "column", sm: "row" }}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <PostSearch
          query={debouncedQuery}
          results={searchResults}
          onSearch={handleSearch}
          loading={searchLoading}
          hrefItem={(id: string) => paths.dashboard.blog.details(id)}
        />

        <PostSort
          sort={sortBy}
          onSort={handleSortBy}
          sortOptions={POST_SORT_OPTIONS}
        />
      </Stack>

      <Tabs
        value={filter}
        onChange={handleFilterPublish}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {[-1, 0, 1].map((tab) => (
          <Tab
            key={tab}
            iconPosition="end"
            value={tab}
            label={tab === -1 ? "All" : tab === 0 ? "Draft" : "Published"}
            icon={
              <Label
                variant={((tab === -1 || filter === tab) && "filled") || "soft"}
                color={(tab === 1 && "info") || "default"}
              >
                {tab === -1 && posts.length}

                {tab === 1 &&
                  posts.filter(
                    (post) => post.active_status === ActiveStatus.Active
                  ).length}

                {tab === 0 &&
                  posts.filter(
                    (post) => post.active_status === ActiveStatus.Disable
                  ).length}
              </Label>
            }
            sx={{ textTransform: "capitalize" }}
          />
        ))}
      </Tabs>

      <PostListHorizontal posts={dataFiltered} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filter,
  sortBy,
}: {
  inputData: IBlog[];
  filter: number;
  sortBy: string;
}) => {
  if (sortBy === "latest") {
    inputData = orderBy(inputData, ["created_at"], ["desc"]);
  }

  if (sortBy === "oldest") {
    inputData = orderBy(inputData, ["created_at"], ["asc"]);
  }

  if (sortBy === "popular") {
    interface IBlogWithSumVote extends IBlog {
      sumVote: number;
    }

    const calculateSumVotes = (votes: { vote_value: number }[]) => {
      return votes.reduce((sum, vote) => sum + vote.vote_value, 0);
    };

    const addSumVotesToBlogs = (blogs: IBlog[]): IBlogWithSumVote[] => {
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

  if (filter !== -1) {
    inputData = inputData.filter((post) => post.active_status === filter);
  }

  return inputData;
};
