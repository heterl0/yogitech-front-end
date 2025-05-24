import useSWR from "swr";
import { useMemo } from "react";
import { fetcher, endpoints } from "@/utils/axios";
import { IPost } from "@/types/blog";

// ----------------------------------------------------------------------

export function useGetPosts() {
  const URL = endpoints.post.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      posts: (data as IPost[]) || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.length,
      postsMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetPost(id: string) {
  const URL = id ? [`${endpoints.post.details(id)}`] : "";

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    revalidateOnFocus: false,
  });

  const memoizedValue = useMemo(
    () => ({
      post: data as IPost,
      postLoading: isLoading,
      postError: error,
      postValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLatestPosts(title: string) {
  const URL = title ? [endpoints.post.latest, { params: { title } }] : "";

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      latestPosts: (data as IPost[]) || [],
      latestPostsLoading: isLoading,
      latestPostsError: error,
      latestPostsValidating: isValidating,
      latestPostsEmpty: !isLoading && !data?.latestPosts.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchPosts(query: string) {
  const URL = query ? [endpoints.post.search, { params: { query } }] : "";

  const { data, isLoading, error, isValidating, mutate } = useSWR(
    URL,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      searchResults: (data as IPost[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.length,
      mutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
