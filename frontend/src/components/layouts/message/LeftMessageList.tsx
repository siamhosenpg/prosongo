import React from "react";

import { IoSearch } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";

const LeftMessageList = () => {
  return (
    <div className="h-full w-full bg-background rounded-lg overflow-hidden py-3 flex flex-col">
      <div className="px-3 h-auto border-b border-border pb-3">
        <form
          className="bg-background-secondary rounded-full w-full flex items-center justify-between p-1"
          action=""
        >
          <input
            className="font-semibold py-2 px-4 w-full block"
            type="text"
            placeholder="Search User"
          />
          <button className=" w-10 h-10 overflow-hidden flex items-center justify-center shrink-0 bg-white rounded-full">
            <IoSearch className="text-xl" />
          </button>
        </form>
      </div>
      <div className=" px-3 h-full overflow-y-auto py-4">
        <ul className="flex flex-col gap-1 ">
          {[...Array(10)].map((_, i) => (
            <li className="p-2 flex items-center gap-2 hover:bg-background-secondary rounded-lg cursor-pointer">
              <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="/images/profile.jpg"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="font-bold flex items-center justify-between relative">
                  <h3>Siam Hosen</h3>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background absolute right-0 z-30 cursor-pointer">
                    <HiDotsHorizontal className=" text-lg" />
                  </button>
                </div>
                <p className="line-clamp-1 text-sm  ">
                  Kire kemon asis tui amake khojkhobor nei?
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftMessageList;
