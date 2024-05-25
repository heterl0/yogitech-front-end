import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, endpoints } from "@/utils/axios";

import { IProfile } from "@/types/user";

// ----------------------------------------------------------------------

export function useGetUserProfiles() {
  const URL = endpoints.profile.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      profiles: (data as IProfile[]) || [],
      profilesLoading: isLoading,
      profilesError: error,
      profilesValidating: isValidating,
      profilesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------

export function useGetProfile(id: string) {
  const URL = id ? [endpoints.profile.details(id)] : "";

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      profile: data as IProfile,
      profileLoading: isLoading,
      profileError: error,
      profileValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
