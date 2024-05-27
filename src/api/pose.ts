import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, endpoints } from "@/utils/axios";
import { IPose } from "@/types/pose";

// ----------------------------------------------------------------------

export function useGetPoses() {
  const URL = endpoints.pose.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      poses: (data as IPose[]) || [],
      posesLoading: isLoading,
      posesError: error,
      posesValidating: isValidating,
      posesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
