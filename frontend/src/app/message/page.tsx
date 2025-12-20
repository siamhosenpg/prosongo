import LeftMessageList from "@/components/layouts/message/LeftMessageList";
import MessageContent from "@/components/layouts/message/MessageContent";
import MessageInformation from "@/components/layouts/message/MessageInformation";
import React from "react";

const Message = () => {
  return (
    <div className="mt-4">
      <div className="Pagearea flex gap-6 h-[calc(100vh_-_104px)] ">
        <div className="w-3/12 h-full">
          <LeftMessageList />
        </div>
        <div className="w-6/12 h-full">
          <MessageContent />
        </div>
        <div className="w-3/12 h-full">
          <MessageInformation />
        </div>
      </div>
    </div>
  );
};

export default Message;
