import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getUserActivitiesApi,
  getLastFourUserActivitiesApi,
} from "@/lib/activity/activityApi";
import { ActivityResponse } from "@/types/activitysType";

interface UseActivitiesOptions {
  limit?: number;
  skip?: number;
}

export const useActivities = ({
  limit = 4,
  skip = 0,
}: UseActivitiesOptions) => {
  return useSuspenseQuery<ActivityResponse>({
    queryKey: ["activities", limit, skip],
    queryFn: () => getUserActivitiesApi({ limit, skip }),
    staleTime: 1000 * 60,
  });
};

export const useLastActivities = () => {
  return useSuspenseQuery<ActivityResponse>({
    queryKey: ["activities", "last"],
    queryFn: getLastFourUserActivitiesApi,
    staleTime: 1000 * 60,
  });
};
