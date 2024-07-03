import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, endpoints } from "@/utils/axios";

import { IBlog } from "@/types/blog";
import { IAccount } from "@/types/user";

// ----------------------------------------------------------------------

export function useGetAccounts() {
  const URL = endpoints.account.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      accounts: (data as IAccount[]) || [],
      accountsLoading: isLoading,
      accountsError: error,
      accountsValidating: isValidating,
      accountsEmpty: !isLoading && !data?.length,
      accountsMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetAccount(id: string) {
  const URL = id ? [`${endpoints.account.details}${id}/`] : "";

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      account: data as IAccount,
      accountLoading: isLoading,
      accountError: error,
      accountValidating: isValidating,
      accountMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLatestPosts(title: string) {
  const URL = title ? [endpoints.post.latest, { params: { title } }] : "";

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      latestPosts: (data as IBlog[]) || [],
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

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: (data as IBlog[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
