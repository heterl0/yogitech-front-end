/* eslint-disable react/no-children-prop */
"use client";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Markdown from "@/components/markdown";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import PostList from "../post-list";
// import PostCommentList from "../post-comment-list";
import PostDetailsHero from "../post-details-hero";
import { IPost } from "@/types/blog";
import MainLayout from "@/layouts/main";
import { paths } from "@/routes/paths";

// ----------------------------------------------------------------------

type Props = {
  post: IPost;
  latestPosts: IPost[];
};

export default function PostDetailsHomeView({ post, latestPosts }: Props) {
  // const { latestPosts, latestPostsLoading } = useGetLatestPosts(title);

  // const renderSkeleton = <PostDetailsSkeleton />;

  // const renderError = (
  //   <Container sx={{ my: 10 }}>
  //     <EmptyContent
  //       filled
  //       title={`Blog is not found`}
  //       action={
  //         <Button
  //           component={RouterLink}
  //           href={paths.blog.root}
  //           startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
  //           sx={{ mt: 3 }}
  //         >
  //           Back to List
  //         </Button>
  //       }
  //       sx={{ py: 10 }}
  //     />
  //   </Container>
  // );
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

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 1152, mx: "auto" }}>
          <Typography variant="subtitle1" sx={{ mb: 5 }}>
            {post.description}
          </Typography>

          <Markdown children={post.content} />

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

            {/* <Stack direction="row" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    size="small"
                    color="error"
                    icon={<Iconify icon="solar:heart-bold" />}
                    checkedIcon={<Iconify icon="solar:heart-bold" />}
                  />
                }
                label={fShortenNumber(post.totalFavorites)}
                sx={{ mr: 1 }}
              />

              <AvatarGroup>
                {post.favoritePerson.map((person) => (
                  <Avatar
                    key={person.name}
                    alt={person.name}
                    src={person.avatarUrl}
                  />
                ))}
              </AvatarGroup>
            </Stack> */}
          </Stack>

          {/* <Stack direction="row" sx={{ mb: 3, mt: 5 }}>
            <Typography variant="h4">Comments</Typography>

            <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
              ({post.comments.length})
            </Typography>
          </Stack>

          <PostCommentForm />

          <Divider sx={{ mt: 5, mb: 2 }} />

          <PostCommentList comments={post.comments} /> */}
        </Stack>
      </Container>
    </>
  );

  const renderLatestPosts = (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Recent Posts
      </Typography>

      <PostList
        posts={latestPosts.slice(latestPosts.length - 4)}
        loading={false}
        disabledIndex
      />
    </>
  );

  return (
    <MainLayout>
      {/* {postLoading && renderSkeleton}

      {postError && renderError} */}

      {post && renderPost}

      <Container sx={{ pb: 15 }}>
        {!!latestPosts.length && renderLatestPosts}
      </Container>
    </MainLayout>
  );
}
