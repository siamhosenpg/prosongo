import React from "react";

import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
const MessageTopBar = () => {
  return (
    <div className="w-full h-[72px] border-b border-border flex items-center justify-between px-5 shrink-0">
      <div className="flex items-center gap-3">
        <img
          className="block w-10 h-10 rounded-full overflow-hidden object-cover"
          src="/images/profile.jpg"
          alt=""
        />
        <div>
          <h4 className="  font-semibold">Siam Hossen</h4>
          <span className="text-[11px] block font-medium ">Online</span>
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
