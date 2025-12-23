"use client";
import React, { useEffect, useRef } from "react";
import { MessageType } from "@/types/message/Message";
import { useAuth } from "@/hook/useAuth";

type Props = {
  messages: MessageType[];
};

const MessageText = ({ messages }: Props) => {
  const { user } = useAuth();
  const currentUserId = user?.user._id;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full px-3  py-4 flex flex-col gap-2 overflow-y-auto h-full">
      {messages.map((msg, index) => {
        const isCurrentUser = msg.sender?._id === currentUserId;

        return (
          <div
            key={msg._id || index}
            className={`w-full flex ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-2 w-full  ${
                isCurrentUser ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Sender Avatar */}
              <img
                src={msg.sender?.profileImage}
                alt={msg.sender?.username}
                className="w-8 h-8 rounded-full object-cover"
              />

              <div
                className={`flex w-6/8  flex-col items-end ${
                  isCurrentUser ? "items-end" : "items-start"
                }`}
              >
                {/* Message bubble */}
                <p
                  className={`max-w-[96%] px-4 py-3  font-medium w-fit rounded-xl  ${
                    isCurrentUser
                      ? "bg-accent text-white"
                      : "bg-background-secondary text-gray-900"
                  }`}
                >
                  {msg.text}
                </p>

                {/* Timestamp */}
                <div
                  className={`smalltext mt-1  text-gray-400 flex w-full justify-end gap-1 ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <span>{isCurrentUser ? "Sent" : ""}</span>
                  <span>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Dummy div to scroll to bottom */}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessageText;
