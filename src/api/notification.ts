import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, endpoints } from "@/utils/axios";
import { INotification } from "@/types/notification";

// ----------------------------------------------------------------------

export function useGetNotifications() {
  const URL = endpoints.notification.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      notifications: (data as INotification[]) || [],
      notificationsLoading: isLoading,
      notificationsError: error,
      notificationsValidating: isValidating,
      notificationsEmpty: !isLoading && !data?.length,
      notificationsMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
