"use client";

import DateTime from "@/components/ui/datetime/DateTime";
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useDeleteNotification,
} from "@/hook/notifications/useNotifications";
import { NotificationType } from "@/types/notification"; // ✅ যোগ করো
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

type NotificationBoxProps = {
  onClose: () => void;
};

// ✅ Page type আলাদা করে define করো
type NotificationPage = {
  notifications: NotificationType[];
  nextCursor: string | null;
  hasMore: boolean;
};

const NotificationBox = ({ onClose }: NotificationBoxProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotifications();

  const { mutate: markAsRead } = useMarkNotificationRead();
  const { mutate: markAllAsRead, isPending: isMarkingAllAsRead } =
    useMarkAllNotificationsRead();
  const { mutate: deleteNotification } = useDeleteNotification();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  // ✅ page কে NotificationPage হিসেবে cast করা
  const notifications =
    data?.pages.flatMap((page) => (page as NotificationPage).notifications) ??
    [];

  if (isError) return <p>Failed to load notifications</p>;

  return (
    <div className="fixed top-19 right-5 h-[calc(100vh-90px)] p-4  w-full md:w-100 bg-background border-border border rounded-lg">
      <div className="max-w-xl h-full mx-auto  space-y-2 overflow-y-auto ScrollSystem ">
        <div className="flex items-center justify-between border-b-border border-b pb-3 pr-2">
          <h3 className=" font-semibold">Notifications</h3>
          <button
            disabled={isMarkingAllAsRead}
            onClick={() => markAllAsRead()}
            className="text-sm px-4 py-1.5 bg-background-secondary rounded-full border-border border text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isMarkingAllAsRead ? "Marking..." : "Mark all as read"}
          </button>
        </div>
        {notifications.length === 0 && !isLoading && (
          <p className="text-center text-gray-500">No notifications yet</p>
        )}
        {isLoading && (
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg bg-background"
              >
                <div className="rounded-full bg-background-secondary w-10 h-10" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-background-secondary rounded w-3/4"></div>
                  <div className="h-3 bg-background-secondary rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {notifications.map((noti) => (
          <div
            key={noti._id}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              noti.read ? "bg-background" : "bg-accent/6"
            }`}
          >
            <Link
              href={`/profile/${noti.actorId?.username}`}
              className="flex items-center gap-3 w-full"
              onClick={() => {
                if (!noti.read) {
                  markAsRead(noti._id);
                }
                onClose();
              }}
            >
              <Image
                width={50}
                height={50}
                loading="lazy"
                src={
                  noti.actorId?.profileImage
                    ? noti.actorId?.profileImage
                    : noti.actorId?.gender === "female"
                      ? "/images/femaleprofile.jpg"
                      : "/images/profile.jpg"
                }
                alt={noti.actorId?.name + " profile image"}
                className="rounded-full w-12 h-12 object-cover"
              />
              <div className="flex-1 text-sm">
                <p>
                  <span className="font-semibold">
                    {noti.actorId?.name || "Prosongo User"}{" "}
                  </span>{" "}
                  {getNotificationText(noti?.type)}
                </p>
                <p className="text-[11px] font-medium text-gray-500">
                  <DateTime date={noti?.createdAt} />
                </p>
              </div>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteNotification(noti._id);
              }}
              className="text-gray-400 text-xl bg-background-secondary w-7 h-7 shrink-0 rounded-full border-border border hover:text-gray-600 transition-colors"
            >
              &times;
            </button>
          </div>
        ))}

        <div ref={bottomRef} />

        {isFetchingNextPage && (
          <div className="animate-pulse space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg bg-background"
              >
                <div className="rounded-full bg-background-secondary w-10 h-10" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-background-secondary rounded w-3/4"></div>
                  <div className="h-3 bg-background-secondary rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!hasNextPage && notifications.length > 0 && (
          <p className="text-center text-xs text-gray-500 py-2">
            No more notifications
          </p>
        )}
      </div>
    </div>
  );
};

/** Helper */
function getNotificationText(type: string) {
  switch (type) {
    case "follow":
      return "started following you";
    case "react":
      return "Reacted your post";
    case "comment":
      return "commented on your post";
    case "share":
      return "shared your post";
    default:
      return "sent you a notification";
  }
}

export default NotificationBox;
