import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadNotificationCount,
  deleteNotification,
} from "@/lib/notification/notification";
import { NotificationType } from "@/types/notification";

export const useNotifications = () => {
  return useInfiniteQuery<
    {
      notifications: NotificationType[];
      nextCursor: string | null;
      hasMore: boolean;
    },
    Error
  >({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) =>
      getMyNotifications(pageParam as string | undefined),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
    staleTime: 1000 * 30,
  });
};

// 🔔 Mark single as read
export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

// 🔔 Mark all as read
export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

// 🔔 Unread notification count
export const useUnreadNotificationCount = () => {
  return useQuery<number>({
    queryKey: ["notifications", "unread-count"],
    queryFn: getUnreadNotificationCount,
    staleTime: 1000 * 30, // 30 seconds
  });
};

// 🔔 Delete a notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
