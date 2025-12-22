"use client";

import React from "react";
import { useUnfollowUser } from "@/hook/useFollow";
import { useAuth } from "@/hook/useAuth";
import { RiUserFollowLine } from "react-icons/ri";

interface ActionUnfollowProps {
  userId: string;
  Name: string;
}

const ActionUnfollow: React.FC<ActionUnfollowProps> = ({ userId, Name }) => {
  const { user } = useAuth();
  const currentUserId = user?.user?._id;

  // 🔥 Hook always runs
  const {
    mutate: unfollow,
    isPending,
    isError,
  } = useUnfollowUser(currentUserId || "");

  // 🔥 own id safety
  if (!currentUserId || currentUserId === userId) return null;

  const handleUnfollow = () => {
    if (isPending) return;

    unfollow(userId, {
      onSuccess: () => {
        console.log(`You have unfollowed ${Name}`);
      },
      onError: (error) => {
        console.error("Unfollow failed:", error);
      },
    });
  };

  return (
    <button
      onClick={handleUnfollow}
      disabled={isPending}
      className="user-card w-full font-semibold flex items-center gap-2 px-6 py-3 hover:bg-background-secondary cursor-pointer rounded-md disabled:opacity-60"
    >
      <RiUserFollowLine className="text-xl" />

      <span>
        {isPending ? "Unfollowing..." : "Unfollow"} {Name}
      </span>

      {isError && (
        <span className="text-sm text-red-500 ml-auto">
          Something went wrong
        </span>
      )}
    </button>
  );
};

export default ActionUnfollow;
