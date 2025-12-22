"use client";

import React from "react";
import { useFollowUser, useFollowing } from "@/hook/useFollow";
import { RiUserFollowLine } from "react-icons/ri";
import { useAuth } from "@/hook/useAuth";

const ActionFollow = ({ userId, Name }: { userId: string; Name: string }) => {
  const { user } = useAuth();
  const currentUserId = user?.user?._id;

  // 🔥 যদি currentUserId না থাকে, button hide
  if (!currentUserId || currentUserId === userId) return null;

  const followMutation = useFollowUser(currentUserId);

  // 🔥 optional: optimistic check for already following
  const { data: followingData } = useFollowing(currentUserId);
  const isFollowing = followingData?.some((f) => f.followingId?._id === userId);
  const isMutating = followMutation.isPending;

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFollowing || isMutating) return;

    followMutation.mutate(userId, {
      onSuccess: () => {
        console.log(`You followed ${Name}`);
      },
      onError: (error) => {
        console.error("Follow failed:", error);
      },
    });
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isMutating || isFollowing}
      className="user-card w-full font-semibold flex items-center gap-2 px-6 py-3 hover:bg-background-secondary cursor-pointer rounded-md"
    >
      <RiUserFollowLine className="text-xl" />
      <div>
        {isMutating ? "Following..." : "Follow"} {Name}
      </div>
    </button>
  );
};

export default ActionFollow;
