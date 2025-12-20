import axiosInstance from "@/lib/axios";
import { NotificationType } from "@/types/notification";

interface NotificationResponse {
  success: boolean;
  notifications: NotificationType[];
}

export const getMyNotifications = async (): Promise<NotificationType[]> => {
  const res = await axiosInstance.get<NotificationResponse>("/notifications");

  return res.data.notifications;
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
