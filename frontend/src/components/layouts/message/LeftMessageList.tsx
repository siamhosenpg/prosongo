import React from "react";

import { IoSearch } from "react-icons/io5";

const LeftMessageList = () => {
  return (
    <div className="h-full w-full bg-background rounded-lg overflow-hidden py-3 flex flex-col gap-6">
      <div className="px-3 border-b border-border pb-3">
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
      <div className=" px-3">
        <ul className="flex flex-col gap-1 ">
          <li className="p-2 flex items-center gap-2 hover:bg-background-secondary rounded-lg">
            <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="/images/profile.jpg"
                alt=""
              />
            </div>
            <div>
              <h3 className="font-bold">Siam Hossen</h3>
              <p className="line-clamp-1 text-sm ">
                Kire kemon asis tui amake khojkhobor nei?
              </p>
            </div>
          </li>
          <li className="p-2 flex items-center gap-2 hover:bg-background-secondary rounded-lg">
            <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="/images/profile.jpg"
                alt=""
              />
            </div>
            <div>
              <h3 className="font-bold">Siam Hossen</h3>
              <p className="line-clamp-1 ">
                Kire kemon asis tui amake khojkhobor nei?
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftMessageList;
