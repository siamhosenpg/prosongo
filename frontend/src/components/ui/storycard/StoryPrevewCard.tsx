import React, { useEffect, useState } from "react";

import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa6";
import { StoryType } from "@/types/storyType";
import StoryTime from "../datetime/StoryTime";
import Image from "next/image";

interface StoryPageContentProps {
  story: StoryType;
}

const StoryPrevewCard: React.FC<StoryPageContentProps> = ({ story }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / 150;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [story]);

  if (!story) return null;
  return (
    <div className="h-full  aspect-9/16 bg-background-tertiary rounded-lg overflow-hidden relative">
      {/* Top progress Bar */}
      <div className="absolute z-40 py-4 bg-linear-to-b from-[#000000a2] to-[#00000000] w-full">
        <div className="bg-white/50 h-1 rounded-full mx-4 overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-white transition-all"
          />
        </div>

        {/* Profile Section */}
        <div className="  mt-3 flex items-center justify-between w-full px-4">
          <div className="LeftPf flex items-center   text-white gap-2">
            <Image
              width={60}
              height={60}
              className="w-9 h-9 rounded-full border border-border overflow-hidden object-cover"
              src={
                story.userId?.profileImage
                  ? story.userId.profileImage
                  : story.userId?.gender === "female"
                    ? "/images/femaleprofile.jpg"
                    : "/images/profile.jpg" // male or default
              }
              alt={story.userId?.name || "Prosongo User"}
            />
            <div className=" font-semibold text-shadow-xs block">
              <span className="block">
                {story.userId?.name || "Prosongo User"}
              </span>
              <span className="smalltext block">
                <StoryTime date={story.createdAt} />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 text-white">
            <button className=" p-1">
              <HiDotsHorizontal className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full relative h-full flex items-center justify-center">
        <Image
          width={500}
          height={800}
          className="w-full relative z-30 "
          src={story.media.url}
          alt={story.userId?.name || "Prosongo User"}
        />
        <Image
          width={500}
          height={800}
          className="w-full h-full absolute z-10 top-3 blur-2xl object-cover "
          src={story.media.url}
          alt={story.userId?.name || "Prosongo User"}
        />
      </div>

      {/* Sent message Box */}
      <div className=" absolute z-30 bottom-0 bg-linear-to-b from-[#00000000] to-[#000000a2]  py-6 text-white text-shadow-xs flex items-center justify-between w-full px-4 gap-3">
        <form className=" w-full flex items-center justify-between rounded-full border-white border p-1">
          <input
            type="text"
            className="font-semibold py-1.5 px-2.5 text-white"
            placeholder="Sent message"
          />{" "}
          <div className="font-semibold mr-3">Sent</div>
        </form>
        <button className="w-fit shrink-0">
          <FaRegHeart className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default StoryPrevewCard;
