/* eslint-disable react/no-children-prop */
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { useGetPost } from "@/api/blog";
import { POST_PUBLISH_OPTIONS } from "@/_mock";

import Iconify from "@/components/iconify";
import Markdown from "@/components/markdown";
import EmptyContent from "@/components/empty-content";

import PostDetailsHero from "../post-details-hero";
// import PostCommentList from "../post-comment-list";
import { PostDetailsSkeleton } from "../post-skeleton";
import PostDetailsToolbar from "../post-details-toolbar";
import axiosInstance, { endpoints } from "@/utils/axios";
import { Avatar, AvatarGroup, avatarGroupClasses } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PostDetailsView({ id }: Props) {
  const [publish, setPublish] = useState(0);

  const { post, postLoading, postError } = useGetPost(id);

  const handleChangePublish = useCallback(
    async (newValue: number) => {
      setPublish(newValue);
      const formData = new FormData();
      formData.append("active_status", newValue + "");
      await axiosInstance.patch(`${endpoints.post.update}${id}/`, formData);
    },
    [id]
  );

  useEffect(() => {
    if (post) {
      setPublish(post?.active_status);
    }
  }, [post]);

  const vote: { down: number; up: number } = useMemo(() => {
    const vote: { down: number; up: number } = { down: 0, up: 0 };
    if (post)
      post.votes.forEach((item) => {
        item.vote_value === 1
          ? (vote.up = vote.up + 1)
          : (vote.down = vote.down + 1);
      });
    return vote;
  }, [post]);

  const renderSkeleton = <PostDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${postError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.blog.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{
        py: 20,
      }}
    />
  );

  const renderPost = post && (
    <>
      <PostDetailsToolbar
        backLink={paths.dashboard.blog.root}
        editLink={paths.dashboard.blog.edit(`${post?.id + ""}`)}
        publish={publish}
        onChangePublish={handleChangePublish}
        publishOptions={POST_PUBLISH_OPTIONS}
      />

      <PostDetailsHero
        title={post.title}
        coverUrl={post.image_url}
        createdAt={new Date(post.created_at)}
        // author={{
        //   avatarUrl: post.owner.profile.avatar_url || "",
        //   name: post.owner.username,
        // }}
        author={post.owner}
      />

      <Stack
        sx={{
          maxWidth: 720,
          mx: "auto",
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 5 }}>
          {post.description}
        </Typography>

        <Markdown children={post.content} sx={{ mb: 5 }} />

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
              <Chip key={tag} label={tag} variant="soft" color="primary" />
            ))}
          </Stack>
          <Stack
            spacing={1.5}
            flexGrow={1}
            direction="row"
            flexWrap="wrap"
            gap={1}
            justifyContent="flex-start"
            sx={{
              typography: "caption",
              color: "text.disabled",
            }}
          >
            <Stack direction="row" alignItems="center" className="">
              <Iconify icon="solar:like-bold" width={24} sx={{ mr: 0.5 }} />
              <Typography variant="body2" sx={{ mr: 0.5 }}>
                {vote.up}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center">
              <Iconify icon="solar:dislike-bold" width={25} sx={{ mr: 0.5 }} />
              <Typography variant="body2" sx={{ mr: 0.5 }}>
                {vote.down}
              </Typography>
            </Stack>
            <AvatarGroup
              sx={{
                [`& .${avatarGroupClasses.avatar}`]: {
                  width: 32,
                  height: 32,
                },
              }}
            >
              {post.votes.map((vote) => (
                <Avatar
                  key={vote.id}
                  alt={vote.user_id}
                  src={vote.user || ""}
                />
              ))}
            </AvatarGroup>
          </Stack>
        </Stack>
      </Stack>
    </>
  );

  return (
    <Container maxWidth={false}>
      {postLoading && renderSkeleton}

      {postError && renderError}

      {post && renderPost}
    </Container>
  );
}
