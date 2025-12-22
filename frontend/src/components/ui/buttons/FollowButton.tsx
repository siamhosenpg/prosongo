"use client";

import React from "react";
import { useFollowUser, useFollowing, useUnfollowUser } from "@/hook/useFollow";
import { useAuth } from "@/hook/useAuth";

interface FollowButtonProps {
  targetUserId: string;
  variant?: "lg" | "sm" | "";
}

const FollowButton: React.FC<FollowButtonProps> = ({
  targetUserId,
  variant,
}) => {
  const { user, isLoading: authLoading } = useAuth();
  const currentUserId = user?.user?._id;

  // 🔥 Always run hooks
  const {
    data: followingData,
    isLoading: followingLoading,
    isFetched,
  } = useFollowing(currentUserId || "");

  const followMutation = useFollowUser(currentUserId || "");
  const unfollowMutation = useUnfollowUser(currentUserId || "");

  // 🔥 Own profile → hide
  if (!currentUserId || currentUserId === targetUserId) {
    return null;
  }

  // 🔥 ONLY first API load shows loading
  if ((authLoading || followingLoading) && !isFetched) {
    return (
      <button
        disabled
        className={`block text-sm font-semibold border rounded-md transition-all 
          ${variant === "lg" ? "py-1.5 px-8" : "py-0.75 px-3"}
          opacity-50 cursor-not-allowed
        `}
      >
        Loading...
      </button>
    );
  }

  // 🔥 Optimistic state
  const isFollowing = followingData?.some(
    (f) => f.followingId?._id === targetUserId
  );

  const isMutating = followMutation.isPending || unfollowMutation.isPending;

  const handleToggleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMutating) return;

    if (isFollowing) {
      // 🔥 Unfollow (optimistic)
      unfollowMutation.mutate(targetUserId);
    } else {
      // 🔥 Follow (optimistic)
      followMutation.mutate(targetUserId);
    }
  };

  return (
    <button
      onClick={handleToggleFollow}
      disabled={isMutating}
      className={`block text-sm font-semibold border rounded-md transition-all cursor-pointer 
        ${
          variant === "lg" ? "py-1.5 px-8 bg-accent text-white" : "py-0.75 px-3"
        }
        ${
          isFollowing
            ? "opacity-50 border-text-tertiary text-text-tertiary cursor-default"
            : "border-accent text-accent hover:opacity-80"
        }
      `}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
