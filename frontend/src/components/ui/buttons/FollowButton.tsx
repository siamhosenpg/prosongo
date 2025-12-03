"use client";
import React from "react";
import { useFollowUser, useFollowing } from "@/hook/useFollow";
import { useAuth } from "@/hook/useAuth";

interface FollowButtonProps {
  targetUserId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ targetUserId }) => {
  const { user } = useAuth();
  const currentUser = user?.user._id;

  // 🔥 নিজেকে follow করা যাবে না → button hide হবে
  if (!currentUser || currentUser === targetUserId) return null;

  const { data: followingData, isLoading: followingLoading } =
    useFollowing(currentUser);

  const followMutation = useFollowUser();

  // check following
  const isFollowing = followingData?.some(
    (f) => f.followingId._id === targetUserId
  );

  const handleFollow = () => {
    if (isFollowing) {
      alert("You already follow this person!");
      return;
    }
    followMutation.mutate(targetUserId);
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isFollowing || followMutation.isLoading || followingLoading}
      className={`text-sm font-semibold border py-[3px] px-3 rounded-md transition-all 
        ${
          isFollowing
            ? "opacity-60 border-text-tertiary text-text-tertiary cursor-default"
            : "border-accent text-accent hover:opacity-80"
        }
      `}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
