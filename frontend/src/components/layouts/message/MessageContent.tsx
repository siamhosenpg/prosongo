import MessageInputbox from "@/components/ui/message/MessageInputbox";
import MessageTopBar from "@/components/ui/message/MessageTopBar";
import React from "react";
import MessageTextArea from "./MessageTextArea";

const MessageContent = () => {
  return (
    <div className="w-full h-full bg-background rounded-lg flex flex-col justify-between">
      <MessageTopBar />
      <MessageTextArea />
      <MessageInputbox />
    </div>
  );
};

export default MessageContent;
