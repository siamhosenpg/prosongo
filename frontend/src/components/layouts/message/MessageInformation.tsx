"use client";

import React, { useEffect, useState } from "react";
import { FaUser, FaBell } from "react-icons/fa6";
import { RiSearch2Fill } from "react-icons/ri";
import { useConversation } from "@/hook/message/useConversations";
import { useAuth } from "@/hook/useAuth";

type Props = {
  conversationId: string | null;
};

const MessageInformation = ({ conversationId }: Props) => {
  const { user } = useAuth();
  const currentUserId = user?.user._id;

  const {
    data: conversation,
    isLoading,
    isError,
  } = useConversation(conversationId || "");

  const [otherUser, setOtherUser] = useState<any>(null);

  useEffect(() => {
    if (conversation) {
      // current user বাদে অন্য participant
      const participant = conversation.participants.find(
        (p: any) => p._id !== currentUserId
      );
      setOtherUser(participant);
    }
  }, [conversation, currentUserId]);

  if (!conversation || !otherUser) return null;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading user info</p>;

  return (
    <div className=" w-full h-full rounded-lg bg-background flex flex-col items-center pt-6 ">
      {/* Profile Image */}
      <div className="w-20 h-20 aspect-square rounded-full overflow-hidden ">
        <img
          className="object-cover w-full h-full "
          src={otherUser.profileImage || "/images/profile.jpg"}
          alt={otherUser.name}
        />
      </div>

      {/* User Info */}
      <div className="text-center mt-1.5 border-b border-border w-full pb-4 px-3">
        <h4 className="text-[16px] font-bold">{otherUser.name}</h4>
        <p className=" font-semibold text-text-tertiary line-clamp-1 w-4/6 m-auto -mt-0.5 ">
          {otherUser.bio || "No bio available"}
        </p>

        {/* Buttons */}
        <div className="buttons flex items-center justify-center gap-3 mt-4 text-text-secondary">
          <button className=" w-8 h-8 flex items-center justify-center bg-background-secondary rounded-full ">
            <FaUser className="text-lg" />
          </button>
          <button className=" w-8 h-8 flex items-center justify-center bg-background-secondary rounded-full ">
            <FaBell className="text-lg" />
          </button>
          <button className=" w-8 h-8 flex items-center justify-center bg-background-secondary rounded-full ">
            <RiSearch2Fill className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInformation;
