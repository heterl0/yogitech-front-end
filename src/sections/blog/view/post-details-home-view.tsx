"use client";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Markdown from "@/components/markdown";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import PostList from "../post-list";
import PostDetailsHero from "../post-details-hero";
import AdsSidebar from "@/components/sidebar/ads-sidebar";
import CtaSidebar from "@/components/sidebar/cta-sidebar";
import MobileBanner from "@/components/sidebar/mobile-banner";
import type { IPost } from "@/types/blog";
import MainLayout from "@/layouts/main";
import { paths } from "@/routes/paths";

// ----------------------------------------------------------------------

type Props = {
  post: IPost;
  latestPosts: IPost[];
};

export default function PostDetailsHomeView({ post, latestPosts }: Props) {
  const renderPost = post && (
    <>
      <PostDetailsHero
        title={post.title}
        author={post.owner}
        coverUrl={post.image_url}
        createdAt={new Date(post.created_at)}
      />

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[
            {
              name: "Home",
              href: "/",
            },
            {
              name: "Blog",
              href: paths.blog.root,
            },
            {
              name: post?.title,
            },
          ]}
          sx={{ maxWidth: 1152, mx: "auto" }}
        />
      </Container>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {/* Left Sidebar - Google Ads */}
        <AdsSidebar />

        {/* Main Content */}
        <Container
          maxWidth={false}
          sx={{
            maxWidth: {
              xs: "100%",
              md: "calc(100% - 300px)",
              lg: "calc(100% - 600px)",
            },
            px: { xs: 2, sm: 3 },
          }}
        >
          <Stack sx={{ maxWidth: 1200, mx: "auto" }}>
            <p className="mb-5 text-base font-medium text-gray-500">
              {post.description}
            </p>

            <Markdown>{post.content}</Markdown>

            <Stack
              spacing={3}
              sx={{
                py: 3,
                borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
                borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
              }}
            >
              <Stack direction="row" flexWrap="wrap" spacing={1}>
                {JSON.parse(post.benefit).map((tag: string) => (
                  <Chip
                    key={tag}
                    label={tag}
                    variant="soft"
                    className="!cursor-pointer"
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Container>

        {/* Right Sidebar - CTA */}
        <CtaSidebar />
      </Box>
    </>
  );

  const renderLatestPosts = (
    <>
      <p className="mb-5 text-2xl font-semibold">Recent Posts</p>

      <PostList
        posts={latestPosts.slice(latestPosts.length - 4)}
        loading={false}
        disabledIndex
      />
    </>
  );

  return (
    <MainLayout>
      {post && renderPost}

      <Container sx={{ pb: { xs: 10, md: 15 } }}>
        {!!latestPosts.length && renderLatestPosts}
      </Container>

      {/* Mobile App Banner */}
      <MobileBanner />
    </MainLayout>
  );
}
