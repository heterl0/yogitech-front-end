import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, endpoints } from "@/utils/axios";
import { IExercise } from "@/types/exercise";

// ----------------------------------------------------------------------

export function useGetExercises() {
  const URL = endpoints.exercise.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      exercises: (data as IExercise[]) || [],
      exercisesLoading: isLoading,
      exercisesError: error,
      exercisesValidating: isValidating,
      exercisesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetExercise(id: string) {
  const URL = id ? [`${endpoints.exercise.details(id)}`] : "";

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      exercise: data as IExercise,
      exerciseLoading: isLoading,
      exerciseError: error,
      exerciseValidating: isValidating,
      exerciseMutation: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
