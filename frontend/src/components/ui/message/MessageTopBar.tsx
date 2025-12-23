import React from "react";

import { ConversationType } from "@/types/message/Conversation";

import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
type Props = {
  conversation: ConversationType;
  currentUserId: string;
};

const MessageTopBar = ({ conversation, currentUserId }: Props) => {
  // যদি 2 জনের conversation হয়, অন্য user দেখাবে
  const otherParticipants = conversation.participants.filter(
    (p) => p._id !== currentUserId
  );

  return (
    <div className="w-full h-[72px] border-b border-border flex items-center justify-between px-5 shrink-0">
      <div className="flex items-center gap-3">
        {otherParticipants.map((user) => (
          <img
            key={user._id}
            src={user.profileImage}
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
        ))}
        <div>
          <h4 className="  font-semibold">
            {" "}
            {otherParticipants.map((u) => u.name).join(", ")}
          </h4>
          <span className="text-[11px] block font-medium ">
            {otherParticipants.length === 1
              ? "Online"
              : `${otherParticipants.length} participants`}
          </span>
        </div>
      </div>
      <div className="buttons flex items-center gap-3">
        <button className=" w-9 h-9 flex items-center justify-center hover:bg-background-secondary rounded-full ">
          <IoCall className="text-lg" />
        </button>
        <button className=" w-9 h-9 flex items-center justify-center hover:bg-background-secondary rounded-full ">
          <FaVideo className="text-lg" />
        </button>
        <button className=" w-9 h-9 flex items-center justify-center hover:bg-background-secondary rounded-full ">
          <FaInfoCircle className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default MessageTopBar;
