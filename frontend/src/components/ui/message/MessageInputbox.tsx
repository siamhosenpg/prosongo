import React from "react";

import { FaRegFileLines } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const MessageInputbox = () => {
  return (
    <div className="h-[70px] border-t border-border px-5 flex items-center w-full shrink-0 ">
      <form className="flex w-full items-center justify-center gap-2" action="">
        <input
          className="px-4 py-3 pl-8 bg-background-secondary rounded-full w-full"
          type="text"
          placeholder="Write messages"
        />
        <button className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full hover:bg-background-secondary cursor-pointer">
          <FaRegFileLines className="text-xl" />
        </button>
        <button className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full hover:bg-background-secondary cursor-pointer">
          <IoSend className="text-xl" />
        </button>
      </form>
    </div>
  );
};

export default MessageInputbox;
