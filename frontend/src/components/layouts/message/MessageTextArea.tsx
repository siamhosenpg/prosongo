import MessageText from "@/components/ui/message/MessageText";
import React from "react";

const MessageTextArea = ({ messages }) => {
  return (
    <div className="w-full h-full px-8   overflow-y-auto ScrollSystem">
      <MessageText messages={messages} />
    </div>
  );
};

export default MessageTextArea;
