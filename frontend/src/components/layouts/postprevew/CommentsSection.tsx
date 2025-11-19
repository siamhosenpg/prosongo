"use server";

import CommentsCard from "@/components/ui/comments/CommentsCard";
import CommentsLoading from "@/components/ui/comments/CommentsLoading";
import { getComments } from "@/lib/post/comments";
import { CommentType } from "@/types/commentType";
import React, { ReactElement } from "react";

// Props Type
interface CommentsSectionProps {
  postdataid: string;
}

const CommentsSection = async ({
  postdataid,
}: CommentsSectionProps): Promise<ReactElement> => {
  // Fetch Comments
  const comments: CommentType[] = await getComments(postdataid);

  return (
    <div className="Comments h-full overflow-y-auto ScrollSystem">
      {/* No Comments */}
      {comments.length === 0 && (
        <p className="p-3 mt-8 text-center text-gray-400 text-sm">
          No comments yet.
        </p>
      )}

      {/* Render */}
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentsCard key={comment._id} comment={comment} />
        ))}

      {/* Loading Skeleton (Static for now) */}
      <CommentsLoading />
      <CommentsLoading />
      <CommentsLoading />
    </div>
  );
};

export default CommentsSection;
