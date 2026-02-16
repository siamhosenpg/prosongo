import LikeBoxIcon from "../../postcard/LikeBox";
import HoverReactions from "../../postcard/HoverReactions";
interface PostCardStatusProps {
  postId: string; // <- TypeScript fix
}
import React, { useEffect, useRef, useState } from "react";
import { useReactions } from "@/hook/useReactions";
import { useAuth } from "@/hook/useAuth";
import { ReactionItem } from "@/types/reactionTypes";

interface Props {
  postId: string;
  postNumber: string;
  shareId: string;
  com: boolean;
}

const VideoLikeButton = ({ postId }: PostCardStatusProps) => {
  const { user, isLoading: authLoading } = useAuth();
  const { data, createMutation, deleteMutation, reactionCountQuery } =
    useReactions(postId);
  const { data: reactionCountData, isLoading } = reactionCountQuery;
  const [error, setError] = React.useState<string | null>(null);

  const isMutating = createMutation.isPending || deleteMutation.isPending;

  const userReaction = data?.reactions?.find(
    (r: ReactionItem) =>
      r?.userId?._id === user?.user?._id || r?.userId?.id === user?.user?._id,
  )?.reaction;

  const handleToggleLike = () => {
    setError(null);
    const ReactionsTypes = [
      "like",
      "love",
      "haha",
      "wow",
      "sad",
      "angry",
      "care",
    ];
    if (ReactionsTypes.includes(userReaction)) {
      deleteMutation.mutate(postId, {
        onError: (err: any) => {
          console.error("Delete reaction error:", err);
          setError(err?.response?.data?.message || "Failed to remove like");
        },
      });
    } else {
      createMutation.mutate(
        { postId, reaction: "like" },
        {
          onError: (err: any) => {
            console.error("Create reaction error:", err);
            setError(err?.response?.data?.message || "Failed to add like");
          },
        },
      );
    }
  };
  const [allReactions, setallReactions] = useState(false);

  // Timeout refs
  const parentEnterTimeout = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const isHoldTriggered = useRef(false);
  // Parent hover enter (1 second delay)
  const handleParentMouseEnter = () => {
    // Cancel leave timeout if hovering again
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }

    // Start enter timeout (1 second delay)
    parentEnterTimeout.current = setTimeout(() => {
      setallReactions(true);
    }, 1000); // 1 second delay
  };

  const handleParentMouseLeave = () => {
    // Cancel enter timeout if leaving before 1s
    if (parentEnterTimeout.current) {
      clearTimeout(parentEnterTimeout.current);
      parentEnterTimeout.current = null;
    }

    // Start 1 second delay to hide
    leaveTimeout.current = setTimeout(() => {
      setallReactions(false);
    }, 1000);
  };

  // Child hover enter → prevent hide
  const handleChildMouseEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
  };

  // Child hover leave → start hide
  const handleChildMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setallReactions(false);
    }, 1000);
  };

  const handleHoldStart = () => {
    isHoldTriggered.current = false;

    holdTimeout.current = setTimeout(() => {
      isHoldTriggered.current = true;
      setallReactions(true); // 🔥 HOLD করলে reactions show
    }, 500); // 0.5 second
  };

  const handleHoldEnd = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }

    // যদি hold না হয় → normal click
    if (!isHoldTriggered.current) {
      handleToggleLike();
    }
  };

  const hoverRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (hoverRef.current && !hoverRef.current.contains(e.target as Node)) {
        setallReactions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const reactionColors: Record<string, string> = {
    like: "text-accent",
    love: "text-red-500",
    care: "text-orange-400",
    angry: "text-orange-600",
    wow: "text-orange-400",
    sad: "text-orange-400",
  };

  if (authLoading) {
    return (
      <div className="px-4 sm:px-6 py-2">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user?.user?._id) {
    return (
      <div className="px-4 sm:px-6 py-2">
        <p className="text-sm text-gray-500">Login to react</p>
      </div>
    );
  }
  return (
    <div className=" w-full h-full" onMouseLeave={handleParentMouseLeave}>
      {/* Like Button */}
      <button
        onMouseDown={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onTouchStart={handleHoldStart}
        onTouchEnd={handleHoldEnd}
        disabled={isMutating}
        className={`  w-full h-full flex items-center justify-center transition-opacity cursor-pointer  py-1 select-none `}
      >
        <LikeBoxIcon design="video" liked={userReaction} />
      </button>
      {/* hover 1 second ধরে থাকলে showDemo true হবে */}
      {allReactions && (
        <div
          ref={hoverRef}
          onMouseEnter={handleChildMouseEnter}
          onMouseLeave={handleChildMouseLeave}
          className="absolute  w-fit -ml-12 -mt-10 bg-background/50 border border-border  rounded-full z-40"
        >
          <HoverReactions
            design="video"
            postId={postId}
            currentUserId={user.user._id}
          />
        </div>
      )}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      <div className="smalltext text-center ">
        {reactionCountData} {isLoading && "..."}
      </div>
    </div>
  );
};

export default VideoLikeButton;
