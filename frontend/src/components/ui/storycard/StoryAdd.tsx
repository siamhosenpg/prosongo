import React from "react";

import { MdOutlineAddAPhoto } from "react-icons/md";

const StoryAdd = () => {
  return (
    <div>
      <div className="flex flex-col mx-w-[80px] w-[70px] sm:w-20  items-center  shrink-0 ">
        <div className="w-12 sm:w-14 h-12 sm:h-14 bg-linear-to-r from-[#06af3e] via-[#01b88a] to-[#8bd401] rounded-full overflow-hidden p-[3px]">
          <div className=" relative flex items-center justify-center p-[3px] bg-background rounded-full  ">
            <img
              loading="lazy"
              className=" aspect-square w-full h-full block rounded-full bg-background-secondary  object-cover"
              src="/images/profile.jpg"
              alt=""
            />
            <div className=" absolute flex items-center justify-center z-30 w-[88%] aspect-square  bg-accent-transprant text-white rounded-full">
              <MdOutlineAddAPhoto className="text-xl" />
            </div>
          </div>
        </div>
        <span className=" text-loose block text-[11px] sm:text-[12px]  w-full text-center mt-1 whitespace-nowrap overflow-hidden text-ellipsis ">
          Create Story
        </span>
      </div>
    </div>
  );
};

export default StoryAdd;
