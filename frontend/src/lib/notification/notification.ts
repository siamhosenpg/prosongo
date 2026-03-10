import axiosInstance from "@/lib/axios";
import { NotificationType } from "@/types/notification";

interface NotificationResponse {
  success: boolean;
  notifications: NotificationType[];
}

export const getMyNotifications = async (
  cursor?: string,
): Promise<NotificationResponse> => {
  const params = cursor ? { cursor, limit: 10 } : { limit: 10 };

  const res = await axiosInstance.get<NotificationResponse>("/notifications", {
    params,
  });

  return res.data;
};

// 🔔 Mark single notification as read
export const markNotificationAsRead = async (id: string) => {
  const res = await axiosInstance.patch(`/notifications/${id}/read`);
  return res.data;
};

// 🔔 Mark all as read
export const markAllNotificationsAsRead = async () => {
  const res = await axiosInstance.patch("/notifications/read-all");
  return res.data;
};

// 🔔 Get unread notification count
export const getUnreadNotificationCount = async () => {
  const res = await axiosInstance.get<{ success: boolean; count: number }>(
    "/notifications/unread-count",
  );
  return res.data.count;
};

// 🔔 Delete a notification
export const deleteNotification = async (id: string) => {
  const res = await axiosInstance.delete(`/notifications/${id}`);
  return res.data;
};
