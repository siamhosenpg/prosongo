import React from "react";
import { StoryType } from "@/types/storyType";
import Link from "next/link";

interface StoryCardProps {
  stories: StoryType;
}

const StoryCard: React.FC<StoryCardProps> = ({ stories }) => {
  if (!stories) return null;
  return (
    <div>
      <div className="flex flex-col mx-w-[80px] w-[70px] sm:w-[80px] items-center shrink-0">
        <Link
          href={`/stories/${stories?._id}`}
          className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-[#06af3e] via-[#01b88a] to-[#8bd401] rounded-full overflow-hidden p-[3px]"
        >
          <div className="p-[3px] bg-background rounded-full">
            <img
              loading="lazy"
              className="aspect-square w-full h-full block rounded-full bg-background-secondary object-cover"
              src={stories.userId?.profileImage || "/defaultProfile.png"}
              alt={stories.userId?.name || "User Story"}
            />
          </div>
        </Link>

        <span className="text-loose block text-[11px] sm:text-[12px] w-full text-center mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {stories.userId?.name}
        </span>
      </div>
    </div>
  );
};

export default StoryCard;
