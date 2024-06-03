import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

import Iconify from "@/components/iconify";

import { IBlog } from "@/types/blog";

import PostItem from "./post-item";
import { PostItemSkeleton } from "./post-skeleton";
import { useState } from "react";

// ----------------------------------------------------------------------

type Props = {
  posts: IBlog[];
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

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const renderList = (
    <>
      {posts.slice(0, page * itemsPerPage).map((post, index) => (
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

      {posts.length > 8 && (
        <Stack
          alignItems="center"
          sx={{
            mt: 8,
            mb: { xs: 10, md: 15 },
          }}
        >
          <Button
            size="large"
            variant="outlined"
            startIcon={
              <Iconify icon="svg-spinners:12-dots-scale-rotate" width={24} />
            }
            onClick={() => setPage(page + 1)}
          >
            Load More
          </Button>
        </Stack>
      )}
    </>
  );
}
