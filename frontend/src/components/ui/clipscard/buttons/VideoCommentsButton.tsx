import React, { useState } from "react";
import { useCommentCount } from "@/hook/useComments";

import { FaRegComments } from "react-icons/fa";
import Link from "next/link";
import { useIsMobile } from "@/hook/apphook/useIsMobile";
import { useRouter } from "next/dist/client/components/navigation";
import CommentsMobileSection from "../../postcard/CommentsMobileSection";

interface CommentButtonProps {
  postId: string;
  postNumber: string;
}

const VideoCommentsButton = ({ postId, postNumber }: CommentButtonProps) => {
  const { data: countComments } = useCommentCount(postId);

  const router = useRouter();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (isMobile) {
      setOpen(true); // component open
    } else {
      router.push(`/post/${postNumber}?index=0#comments`); // page navigation
    }
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="flex flex-col items-center justify-center cursor-pointer w-16 h-14 rounded-xl hover:bg-background-secondary"
      >
        <span className="text-2xl font-black text-shadow-xs">
          <FaRegComments />
        </span>

        {countComments !== undefined && (
          <small className="block smalltext opacity-80 mt-1 text-shadow-xs">
            {countComments}
          </small>
        )}
      </button>

      {open && (
        <CommentsMobileSection post={postId} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default VideoCommentsButton;
