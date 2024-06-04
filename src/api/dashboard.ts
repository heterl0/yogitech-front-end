import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, endpoints } from "@/utils/axios";

import { IBlog } from "@/types/blog";
import {
  IDashboardOverview,
  IEventGrowth,
  IRecentActivity,
  IUserGrowth,
} from "@/types/dashboard";

// ----------------------------------------------------------------------

export function useGetPosts() {
  const URL = endpoints.post.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      posts: (data as IBlog[]) || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetRecentActivity() {
  const URL = endpoints.dashboard.recentActivities;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      recentItems: (data as IRecentActivity[]) || [],
      recentItemsLoading: isLoading,
      recentItemsError: error,
      recentItemsValidating: isValidating,
      recentItemsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetOverview() {
  const URL = endpoints.dashboard.overview;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      overview: data as IDashboardOverview,
      overviewLoading: isLoading,
      overviewError: error,
      overviewValidating: isValidating,
      overviewEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useUserGrowth() {
  const URL = endpoints.dashboard.userGrowthChart;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      userGrowth: data as IUserGrowth,
      userGrowthLoading: isLoading,
      userGrowthError: error,
      userGrowthValidating: isValidating,
      userGrowthEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useEventGrowth() {
  const URL = endpoints.dashboard.eventParticipationChart;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      eventGrowth: data as IEventGrowth,
      eventGrowthLoading: isLoading,
      eventGrowthError: error,
      eventGrowthValidating: isValidating,
      eventGrowthEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
