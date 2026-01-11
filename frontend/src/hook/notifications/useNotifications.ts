import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadNotificationCount,
} from "@/lib/notification/notification";
import { NotificationType } from "@/types/notification";

export const useNotifications = () => {
  return useQuery<NotificationType[]>({
    queryKey: ["notifications"],
    queryFn: getMyNotifications,
    staleTime: 1000 * 30, // 30 seconds
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
