import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, endpoints } from "@/utils/axios";
import { IExerciseLog } from "@/types/exercise";

// ----------------------------------------------------------------------

export function useGetActivities() {
  const URL = endpoints.exercise.log;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      activities: (data as IExerciseLog[]) || [],
      activitiesLoading: isLoading,
      activitiesError: error,
      activitiesValidating: isValidating,
      activitiesEmpty: !isLoading && !data?.length,
      activitiesMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
