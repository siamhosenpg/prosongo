import React from "react";
import { StoryType } from "@/types/storyType";
import Link from "next/link";
import Image from "next/image";

interface StoryCardProps {
  stories: StoryType;
}

const StoryCard: React.FC<StoryCardProps> = ({ stories }) => {
  if (!stories) return null;
  return (
    <div>
      <div className="flex flex-col mx-w-[80px] w-17.5 sm:w-20 items-center shrink-0">
        <Link
          href={`/stories/${stories?._id}`}
          className="w-14  h-14 bg-linear-to-r from-[#06af3e] via-[#01b88a] to-[#8bd401] rounded-full overflow-hidden p-0.75"
        >
          <div className="p-0.75 bg-background rounded-full">
            <Image
              width={100}
              height={100}
              loading="lazy"
              className="aspect-square w-full h-full block rounded-full bg-background-secondary object-cover"
              src={
                stories.userId?.profileImage
                  ? stories.userId.profileImage
                  : stories.userId?.gender === "female"
                    ? "/images/femaleprofile.jpg"
                    : "/images/profile.jpg" // male or default
              }
              alt={stories.userId?.name || "User Story"}
            />
          </div>
        </Link>

        <span className="text-loose block text-[11px] font-medium md:text-[12px] w-full text-center mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {stories.userId?.name || "Prosongo User"}
        </span>
      </div>
    </div>
  );
};

export default StoryCard;
