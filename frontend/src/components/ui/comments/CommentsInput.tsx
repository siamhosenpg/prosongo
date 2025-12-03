"use client";
import React, { useState } from "react";
import { AiOutlineFire } from "react-icons/ai";

import { useCreateComment } from "@/hook/useComments";

const CommentsInput = ({ postId }) => {
  const [text, setText] = useState("");
  const createComment = useCreateComment();

  const handleSubmit = () => {
    if (!text.trim()) return;

    createComment.mutate(
      { postId, text },
      {
        onSuccess: () => {
          setText("");
        },
      }
    );
  };

  return (
    <div className="  shrink-0 bg-background pt-2  ">
      {/* Comment input section */}

      <div className=" flex items-center gap-2  py-2 px-3 rounded-lg bg-background-secondary">
        <div className=" w-10 h-10 rounded-full shrink-0 border-border border flex items-center justify-center">
          {" "}
          <img
            src="/images/profile.jpg"
            loading="lazy"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full px-4 py-2  rounded-full bg-background-secondary focus:outline-none "
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSubmit}>
          <AiOutlineFire className="text-lg text-secondary" />{" "}
          {/* Send button */}
        </button>
      </div>
    </div>
  );
};

export default CommentsInput;
