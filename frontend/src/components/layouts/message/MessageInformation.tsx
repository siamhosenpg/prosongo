import React from "react";

import { FaUser } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { RiSearch2Fill } from "react-icons/ri";
const MessageInformation = () => {
  return (
    <div className=" w-full h-full rounded-lg bg-background flex flex-col items-center pt-6 ">
      <div className="w-20 h-20 aspect-square rounded-full overflow-hidden ">
        <img
          className="object-cover w-full h-full "
          src="/images/profile.jpg"
          alt=""
        />
      </div>
      <div className="text-center mt-1.5 border-b border-border w-full pb-4 px-3">
        <h4 className="text-[16px] font-bold">Siam Hossen</h4>
        <p className=" font-semibold text-text-tertiary line-clamp-1 w-4/6 m-auto -mt-0.5 ">
          MERN Stack Developer & React Developer MERN Stack Developer & React
          Developer
        </p>

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
