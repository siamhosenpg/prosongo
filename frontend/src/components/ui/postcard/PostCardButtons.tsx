"use client";

import React from "react";
import { FaRegComments } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useReactions } from "@/hook/useReactions";
import { useAuth } from "@/hook/useAuth";

interface Props {
  postId: string;
}

const PostCardButtons: React.FC<Props> = ({ postId }) => {
  const { user } = useAuth();
  const { data, createMutation, deleteMutation } = useReactions(postId);

  const [bookmarked, setBookmarked] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const toggleBookmark = () => setBookmarked((prev) => !prev);

  if (!user) return <p className="text-sm text-gray-500">Login to react</p>;

  // ✅ Check if user has already liked
  const userReaction = data?.reactions?.find(
    (r) => r?.userId?._id === user.user._id || r?.userId?.id === user.user._id
  )?.reaction;

  const isMutating = createMutation.isLoading || deleteMutation.isLoading;

  const handleToggleLike = () => {
    setError(null);

    if (userReaction === "like") {
      // Remove like
      deleteMutation.mutate(postId, {
        onError: (err: any) => {
          console.error("Delete reaction error:", err);
          setError(err?.response?.data?.message || "Failed to remove like");
        },
      });
    } else {
      // Add like
      createMutation.mutate(
        { postId, reaction: "like" },
        {
          onError: (err: any) => {
            console.error("Create reaction error:", err);
            setError(err?.response?.data?.message || "Failed to add like");
          },
        }
      );
    }
  };

  return (
    <div className="px-4 sm:px-6 flex flex-col gap-1">
      <div className="flex items-center justify-between mt-4 pb-3">
        <div className="left flex items-center justify-start gap-10">
          {/* Like / Remove Like */}
          <button
            onClick={handleToggleLike}
            disabled={isMutating}
            className={`flex gap-1 items-center transition-opacity ${
              isMutating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {userReaction === "like" ? (
              <AiFillLike className="text-xl text-accent" />
            ) : (
              <AiOutlineLike className="text-xl text-primary" />
            )}
            <span
              className={`text-sm font-semibold ${
                userReaction === "like" ? "text-accent" : "text-primary"
              }`}
            >
              {userReaction === "like" ? "Liked" : "Like"}
            </span>
          </button>

          {/* Comments */}
          <div className="flex gap-1 items-center cursor-pointer">
            <FaRegComments className="text-xl text-primary" />
            <span className="text-sm text-primary font-semibold">Comments</span>
          </div>

          {/* Shares */}
          <div className="flex gap-1 items-center cursor-pointer">
            <RiShareForwardLine className="text-xl text-primary" />
            <span className="text-sm text-primary font-semibold">Share</span>
          </div>
        </div>

        {/* Bookmark */}
        <button onClick={toggleBookmark}>
          {bookmarked ? (
            <MdBookmark className="text-xl text-accent" />
          ) : (
            <MdBookmarkBorder className="text-xl text-secondary" />
          )}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 font-medium mt-1">{error}</p>
      )}
    </div>
  );
};

export default PostCardButtons;
