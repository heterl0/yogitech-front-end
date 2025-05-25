"use client";

import Grid from "@mui/material/Unstable_Grid2";
import { IPost } from "@/types/blog";
import PostItem from "./post-item";
import { PostItemSkeleton } from "./post-skeleton";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// ----------------------------------------------------------------------

type Props = {
  posts: IPost[];
  loading?: boolean;
  disabledIndex?: boolean;
};

export default function PostList({ posts, loading, disabledIndex }: Props) {
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <Grid key={index} xs={12} sm={6} md={3}>
          <PostItemSkeleton />
        </Grid>
      ))}
    </>
  );

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (inView) {
      handleLoadMore();
    }
  }, [inView, handleLoadMore]);

  const renderList = (
    <>
      {posts.slice(0, 11 + (page - 1) * itemsPerPage).map((post, index) => (
        <Grid
          key={post.id}
          xs={12}
          sm={6}
          md={!disabledIndex && index === 0 ? 6 : 3}
        >
          <PostItem post={post} index={!disabledIndex ? index : undefined} />
        </Grid>
      ))}
    </>
  );

  return (
    <>
      <Grid container spacing={3}>
        {loading ? renderSkeleton : renderList}
      </Grid>

      {posts.length > 11 + (page - 1) * itemsPerPage && (
        // <Stack
        //   alignItems="center"
        //   sx={{
        //     mt: 8,
        //     mb: { xs: 10, md: 15 },
        //   }}
        // >
        //   <Button
        //     size="large"
        //     variant="outlined"
        //     startIcon={
        //       <Iconify icon="svg-spinners:12-dots-scale-rotate" width={24} />
        //     }
        //     onClick={() => setPage(page + 1)}
        //   >
        //     {t("blogPage.postListHorizontal.loadMore")}
        //   </Button>
        // </Stack>
        <div ref={ref} />
      )}
    </>
  );
}
