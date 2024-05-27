import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, endpoints } from "@/utils/axios";
import { IMuscle } from "@/types/pose";
// ----------------------------------------------------------------------

export function useGetMuscles() {
  const URL = endpoints.muscle.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      muscles: (data as IMuscle[]) || [],
      musclesLoading: isLoading,
      musclesError: error,
      musclesValidating: isValidating,
      musclesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
