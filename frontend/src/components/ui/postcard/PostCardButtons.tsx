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
  const { data, reactMutation, deleteMutation } = useReactions(postId);

  const [bookmarked, setBookmarked] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const toggleBookmark = () => setBookmarked((prev) => !prev);

  if (!user) return <p className="text-sm text-gray-500">Login to react</p>;

  // check user previous reaction
  const userReaction = data?.reactions.find(
    (r) => r.userId.id === user._id
  )?.reaction;

  const handleLike = () => {
    setError(null); // reset error before action
    if (userReaction === "like") {
      deleteMutation.mutate(postId, {
        onError: (err: any) => {
          console.error("Delete reaction error:", err);
          setError(err.response?.data?.message || "Failed to remove reaction");
        },
      });
    } else {
      reactMutation.mutate(
        { postId, reaction: "like" },
        {
          onError: (err: any) => {
            console.error("React error:", err);
            setError(err.response?.data?.message || "Failed to add reaction");
          },
        }
      );
    }
  };

  return (
    <div className="px-4 sm:px-6 flex flex-col gap-1">
      <div className="flex items-center justify-between mt-4 pb-3">
        <div className="left flex items-center justify-start gap-10">
          {/* Like */}
          <div
            onClick={handleLike}
            className={`flex gap-1 items-center cursor-pointer ${
              userReaction === "Love" ? "text-accent" : "text-primary"
            }`}
          >
            <span className="block font-semibold text-primary">
              {userReaction === "like" ? (
                <AiFillLike className="text-xl text-accent" />
              ) : (
                <AiOutlineLike className="text-xl text-primary" />
              )}
            </span>
            <div
              className={`text-sm  font-semibold ${
                userReaction === "like" ? "text-accent" : "text-primary"
              }`}
            >
              {userReaction === "like" ? "Liked" : "Like"}
            </div>
          </div>

          {/* Comments */}
          <div className="flex gap-1 items-center cursor-pointer">
            <span className="font-semibold text-primary">
              <FaRegComments className="text-xl" />
            </span>
            <div className="text-sm text-primary font-semibold">Comments</div>
          </div>

          {/* Shares */}
          <div className="flex gap-1 items-center cursor-pointer">
            <span className="font-semibold text-primary">
              <RiShareForwardLine className="text-xl" />
            </span>
            <div className="text-sm text-primary font-semibold">Share</div>
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
